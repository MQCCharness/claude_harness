/* global document, WebSocket, window, fetch */

function $(id) {
  return document.getElementById(id);
}

const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${proto}//${window.location.host}`;
let ws;
let currentChain = null;

function setWsStatus(text, ok) {
  const el = $('ws-status');
  el.textContent = text;
  el.className =
    'text-xs px-2 py-1 rounded ' +
    (ok === true ? 'bg-emerald-950 text-emerald-300' : ok === false ? 'bg-red-950 text-red-300' : 'bg-slate-800 text-slate-400');
}

function formatTime(ts) {
  if (ts == null || Number.isNaN(ts)) return '—';
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return '—';
  }
}

async function loadChains() {
  const r = await fetch('/api/chains');
  const j = await r.json();
  const sel = $('chain-select');
  sel.innerHTML = '';
  const opt0 = document.createElement('option');
  opt0.value = '';
  opt0.textContent = '选择 CHAIN…';
  sel.appendChild(opt0);
  for (const id of j.chains || []) {
    const o = document.createElement('option');
    o.value = id;
    o.textContent = id;
    sel.appendChild(o);
  }
  if (currentChain && j.chains.includes(currentChain)) sel.value = currentChain;
  else if (j.chains.length === 1) {
    sel.value = j.chains[0];
    currentChain = j.chains[0];
    await loadChain(currentChain);
  }
}

async function loadChain(chainId) {
  if (!chainId) {
    $('chain-panel').classList.add('hidden');
    $('empty-state').classList.remove('hidden');
    return;
  }
  currentChain = chainId;
  const r = await fetch('/api/chain/' + encodeURIComponent(chainId));
  const d = await r.json();
  $('empty-state').classList.add('hidden');
  $('chain-panel').classList.remove('hidden');
  $('chain-id').textContent = d.chainId;
  $('chain-theme').textContent = d.theme || '（无主题行）';
  const warn = $('chain-warn');
  if (d.readmeError) {
    warn.textContent = 'README 读取失败: ' + d.readmeError;
    warn.classList.remove('hidden');
  } else if (d.epWarn) {
    warn.textContent = d.epWarn;
    warn.classList.remove('hidden');
  } else {
    warn.classList.add('hidden');
  }

  const tbody = $('ep-body');
  tbody.innerHTML = '';
  for (const row of d.epRows || []) {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-700/50 hover:bg-slate-800/30';
    tr.innerHTML =
      '<td class="px-3 py-2 font-mono text-sky-300">' +
      escapeHtml(row.ep) +
      '</td>' +
      '<td class="px-3 py-2">' +
      escapeHtml(row.status) +
      '</td>' +
      '<td class="px-3 py-2 text-slate-400 text-xs break-all">' +
      escapeHtml(row.output) +
      '</td>';
    tbody.appendChild(tr);
  }

  const gl = $('gate-list');
  gl.innerHTML = '';
  for (const g of d.gates || []) {
    const li = document.createElement('li');
    li.className = 'flex flex-wrap items-center gap-2';
    const v = g.verdict ? '<span class="text-emerald-400">' + escapeHtml(g.verdict) + '</span>' : '<span class="text-slate-500">—</span>';
    li.innerHTML =
      '<code class="text-sky-400">' +
      escapeHtml(g.file) +
      '</code> ' +
      v +
      ' <span class="text-slate-600">· mtime ' +
      formatTime(g.mtime) +
      '</span>';
    gl.appendChild(li);
  }

  $('fetch-time').textContent = new Date(d.updatedAt).toLocaleString();
  $('readme-mtime').textContent = formatTime(d.readmeMtime);
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function connectWs() {
  ws = new WebSocket(wsUrl);
  ws.onopen = () => setWsStatus('WS 已连接', true);
  ws.onclose = () => {
    setWsStatus('WS 断开', false);
    setTimeout(connectWs, 2000);
  };
  ws.onerror = () => setWsStatus('WS 错误', false);
  let debounceTimer;
  ws.onmessage = (ev) => {
    try {
      const msg = JSON.parse(ev.data);
      if (msg.type !== 'fs') return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        loadChains();
        if (currentChain) loadChain(currentChain);
      }, 320);
    } catch {
      /* ignore */
    }
  };
}

$('chain-select').addEventListener('change', (e) => {
  loadChain(e.target.value);
});

$('btn-refresh').addEventListener('click', () => {
  loadChains();
  if (currentChain) loadChain(currentChain);
});

loadChains();
connectWs();
