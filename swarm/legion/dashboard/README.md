# Legion 运行时看板（本地）

浏览器 + 本地 Node 服务：监听 `../chains/**` 文件变更，经 WebSocket 推送到前端；REST 拉取各 CHAIN 的 `README.md` 执行进度表与 `PHASE-GATE-EP*.md` 摘要。

## 启动

```bash
cd .claude/swarm/legion/dashboard
npm install
npm start
```

浏览器打开：<http://127.0.0.1:8787/>

## 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `LEGION_DASHBOARD_HOST` | `127.0.0.1` | 绑定地址（建议勿对公网） |
| `LEGION_DASHBOARD_PORT` | `8787` | 端口 |
| `LEGION_DASHBOARD_OPEN` | `1`（打开） | 启动服务后是否**自动用系统默认浏览器**打开看板；设为 `0` 或 `false` 则不调起浏览器 |

PowerShell 示例（只起服务、不弹窗）：

```powershell
$env:LEGION_DASHBOARD_OPEN='0'; npm start
```

## 说明

- **弹窗**：执行 `npm start` 并监听成功后，会**自动打开系统默认浏览器**指向本看板（可用 `LEGION_DASHBOARD_OPEN=0` 关闭）。
- **聊天里宣布军团**仍无法由 Cursor 直接调起本机进程；若希望「一开仓库就弹」，可在 Cursor 里配置 **Tasks：打开终端运行 `npm start`**（需你自行添加 `.vscode/tasks.json` 或等价自动化）。
- 细粒度任务进度依赖统帅/脚本向约定文件写入；本页以 README / Gate 落盘为准。
