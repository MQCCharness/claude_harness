/**
 * Legion 运行时看板 — 本地 HTTP + WebSocket
 * 监听 .claude/swarm/legion/chains/** 变更，浏览器订阅实时刷新。
 * 默认仅绑定 127.0.0.1。
 */
import http from 'http';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHAINS_ROOT = path.join(__dirname, '..', 'chains');
const PUBLIC_DIR = path.join(__dirname, 'public');
const HOST = process.env.LEGION_DASHBOARD_HOST || '127.0.0.1';
const PORT = Number(process.env.LEGION_DASHBOARD_PORT || 8787);
/** 启动后是否用系统默认浏览器打开看板：1/true/未设置=打开；0/false=不打开 */
const OPEN_BROWSER =
  process.env.LEGION_DASHBOARD_OPEN === undefined ||
  process.env.LEGION_DASHBOARD_OPEN === '' ||
  process.env.LEGION_DASHBOARD_OPEN === '1' ||
  /^true$/i.test(String(process.env.LEGION_DASHBOARD_OPEN || ''));

/**
 * 跨平台用默认浏览器打开 URL（Windows / macOS / Linux）
 * @param {string} url
 */
function openDefaultBrowser(url) {
  const u = url.replace(/"/g, '');
  const cmd =
    process.platform === 'win32'
      ? `cmd /c start "" "${u}"`
      : process.platform === 'darwin'
        ? `open "${u}"`
        : `xdg-open "${u}"`;
  exec(cmd, { windowsHide: true }, (err) => {
    if (err) console.warn('[legion-dashboard] 无法打开浏览器:', err.message);
  });
}

/** @type {Set<import('ws').WebSocket>} */
const clients = new Set();

function broadcast(obj) {
  const s = JSON.stringify(obj);
  for (const c of clients) {
    if (c.readyState === 1) c.send(s);
  }
}

function stripMdBold(s) {
  return s.replace(/\*\*/g, '').trim();
}

/**
 * 解析 README.md「执行进度」表格（与军团链约定对齐）
 * @param {string} md
 */
function parseEpTable(md) {
  const idx = md.indexOf('## 执行进度');
  if (idx === -1) return { rows: [], warn: '缺少 ## 执行进度 节' };
  const rest = md.slice(idx);
  const lines = rest.split(/\r?\n/);
  const rows = [];
  let inTable = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('| EP |')) {
      inTable = true;
      continue;
    }
    if (inTable && /^\|[\s\-:|]+\|\s*$/.test(t)) continue;
    if (inTable && t.startsWith('|')) {
      const cells = t
        .split('|')
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (cells.length >= 3 && /^EP-\d+/i.test(cells[0])) {
        rows.push({
          ep: cells[0],
          status: stripMdBold(cells[1]),
          output: cells[2],
        });
      }
    } else if (inTable && t.startsWith('##')) {
      break;
    }
  }
  return { rows };
}

/**
 * 取 README 首段主题行（# 标题下一行 **主题**：…）
 */
function parseTheme(md) {
  const m = md.match(/\*\*主题\*\*[：:]\s*(.+)/);
  return m ? m[1].trim() : null;
}

async function chainIds() {
  try {
    const names = await fs.readdir(CHAINS_ROOT, { withFileTypes: true });
    return names.filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
}

async function chainSnapshot(chainId) {
  const root = path.join(CHAINS_ROOT, chainId);
  const readmePath = path.join(root, 'README.md');
  let readme = '';
  let readmeError = null;
  try {
    readme = await fs.readFile(readmePath, 'utf8');
  } catch (e) {
    readmeError = String(e);
  }
  const ep = parseEpTable(readme);
  const gates = ['PHASE-GATE-EP0.md', 'PHASE-GATE-EP1.md', 'PHASE-GATE-EP2.md'].map(
    async (name) => {
      const p = path.join(root, name);
      try {
        const st = await fs.stat(p);
        const head = (await fs.readFile(p, 'utf8')).slice(0, 2500);
        let verdict = null;
        const pass = /PASS|放行/i.exec(head);
        const block = /BLOCK|阻塞/i.exec(head);
        if (pass) verdict = 'PASS';
        else if (block) verdict = 'BLOCK';
        return { file: name, mtime: st.mtimeMs, verdict };
      } catch {
        return { file: name, mtime: null, verdict: null };
      }
    }
  );
  const gateList = await Promise.all(gates);
  let readmeMtime = null;
  try {
    readmeMtime = (await fs.stat(readmePath)).mtimeMs;
  } catch {
    /* empty */
  }
  return {
    chainId,
    theme: parseTheme(readme),
    readmeError,
    epRows: ep.rows,
    epWarn: ep.warn,
    gates: gateList,
    readmeMtime,
    updatedAt: Date.now(),
  };
}

async function handleApi(url) {
  const u = new URL(url, 'http://localhost');
  if (u.pathname === '/api/health') {
    return { ok: true, chainsRoot: CHAINS_ROOT };
  }
  if (u.pathname === '/api/chains') {
    const ids = await chainIds();
    return { chains: ids };
  }
  const m = u.pathname.match(/^\/api\/chain\/([^/]+)\/?$/);
  if (m) {
    const id = decodeURIComponent(m[1]);
    if (id.includes('..') || path.normalize(id) !== id) {
      return { error: 'invalid chain id' };
    }
    return chainSnapshot(id);
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const url = req.url || '/';
  if (url.startsWith('/api/')) {
    const body = await handleApi(url);
    if (body === null) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'not found' }));
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    res.end(JSON.stringify(body));
    return;
  }
  let filePath = path.join(PUBLIC_DIR, url === '/' ? 'index.html' : url.split('?')[0]);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end();
    return;
  }
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');
  } catch {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify({ type: 'hello', chainsRoot: CHAINS_ROOT }));
  ws.on('close', () => clients.delete(ws));
});

if (fsSync.existsSync(CHAINS_ROOT)) {
  chokidar
    .watch(CHAINS_ROOT, {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 100 },
    })
    .on('all', (event, p) => {
      const rel = path.relative(CHAINS_ROOT, p).replace(/\\/g, '/');
      const parts = rel.split('/').filter(Boolean);
      const chainId = parts[0] || null;
      broadcast({ type: 'fs', event, path: rel, chainId });
    });
} else {
  console.warn('[legion-dashboard] chains 目录不存在，将不监听:', CHAINS_ROOT);
}

server.listen(PORT, HOST, () => {
  const base = `http://${HOST}:${PORT}/`;
  console.log(`[legion-dashboard] ${base}`);
  console.log(`[legion-dashboard] 监听: ${CHAINS_ROOT}`);
  if (OPEN_BROWSER) {
    setTimeout(() => {
      openDefaultBrowser(base);
      console.log('[legion-dashboard] 已请求打开系统默认浏览器（设 LEGION_DASHBOARD_OPEN=0 可关闭）');
    }, 400);
  }
});
