# R4a 冻结验收表 · CHAIN=EARTH-GLOBE-LLM-20260425 · ROUND=1

> **由 R4a Sub-agent 输出，主帅汇流冻结**。R4b 关门核验须以本文件为单一事实源；与本表冲突的口头叙述一律以本文件为准。
> **生效日期**：2026-04-25
> **依据**：`META.md` §已冻结契约 + 用户 GOAL_SENTENCE + Plan §R1/R2 转化条
> **不依赖** R3 实现细节：本表仅基于 UI 现象 / HTTP / SSE / CLI / 环境变量 / 生成物形态。

## TC-B 业务验收表

| 编号 | 标题 | P | 可执行步骤 | 期望结果 |
|---|---|---|---|---|
| TC-B-001 | 3D 地球初始渲染 | P0 | 启动 `npm run dev` 后浏览器打开 `http://localhost:5173/`，等待首屏 | 页面显示一颗 3D 地球（earth-dark / 夜景贴图）；无白屏；DevTools Console 无 `Uncaught` 异常；地球占据主舞台居中 |
| TC-B-002 | 鼠标旋转 / 缩放 / 拖动 | P0 | 在地球上：①按住左键拖动 ②滚轮上下 ③按住后平移 | ①地球绕轴旋转 ②可见缩放至少 0.5x–2x 范围 ③视角连续过渡，无瞬移、无卡死 |
| TC-B-003 | 默认 5 条预置事件可见 | P0 | 首屏加载完成（无搜索动作） | 地球上至少出现 5 个标记点（红点 + 脉冲圈或等价视觉），分布在不同经纬度；侧边栏（若存在）同步显示 5 条 |
| TC-B-004 | 点击标记弹窗内容 | P0 | 单击任一标记点 | 弹窗（或浮层）显示该事件的：标题、时间、地点、描述、分类、来源链接（链接可点开新标签）；按 ESC 或弹窗外点击可关闭 |
| TC-B-005 | 搜索栏触发 LLM 流程（mock 路径） | P0 | 在搜索栏输入「2024 巴黎奥运精彩瞬间」，回车或点搜索按钮（前置：后端 `.env` 配 `SILICONFLOW_API_KEY`，`SEARCH_PROVIDER=mock`） | 状态栏依次（或并发）出现 `搜索中` → `分析中` → `落点中` 三段文案；最终至少新增 1 条事件落到地球，至多 8 条；过程中无 502/500 |
| TC-B-006 | SSE 事件逐个流式落点 | P0 | 搜索过程中观察地球（建议浏览器 Network 看到 `/api/chat` Type=eventsource） | 事件**逐条**飞入（间隔可见，非一次性出现）；网络面板看到 `data: ...` 多帧推送；envelope `type` 字段在 `phase\|status\|event\|summary\|done` 范围内 |
| TC-B-007 | 同坐标聚合 | P1 | 在搜索结果中触发同城多事件（或在预置数据中已有同城多条） | 同坐标多个事件渲染为单个标记（带计数徽标或同等视觉提示）；点击该标记可展开/分页查看每一条 |
| TC-B-008 | 时间轴 slider 过滤 | P1 | 拖动时间轴端点缩小区间至只覆盖部分事件时段 | 区间外的事件标记从地球与侧边栏同步消失；区间内事件保持；松开后无残留过滤态错位 |
| TC-B-009 | 侧边栏列表与镜头联动 | P1 | 在侧边栏点击任意一条事件 | 镜头（地球视角）平滑飞向该事件经纬度；事件弹窗弹出；侧边栏当前项高亮 |
| TC-B-010 | 侧边栏排序：按时间 | P1 | 加载完成后查看侧边栏顺序；触发新事件后再次查看 | 列表按事件时间字段排序（升序或降序之一，全表一致）；新事件按其时间字段插入到正确位置 |
| TC-B-011 | LLM 模型切换 | P0 | 在模型下拉切换至 `deepseek-ai/DeepSeek-V3` / `Qwen/Qwen2.5-7B-Instruct` / `THUDM/glm-4-9b-chat` 任一项，再发起一次搜索 | 4 项均可在 UI 选择；切换后下一次 `/api/chat` 的请求 body（Network 面板可看）含对应 `model` 字段；后端响应 200 且 SSE 流正常；默认值为 `Qwen/Qwen3-32B` |
| TC-B-012 | 缺失 API key 友好降级 | P0 | 后端 `.env` 不配置 `SILICONFLOW_API_KEY`，重启 `dev:server`，前端发起搜索 | SSE 推送 envelope `{type:"error", message:"未配置 SILICONFLOW_API_KEY..."}`（message 文本含关键字 `SILICONFLOW_API_KEY`）；前端展示友好错误条；地球与已有事件**不崩溃**、不白屏 |
| TC-B-013 | 坐标越界拒绝落点 | P0 | mock 提供商或人为构造让 LLM 返回 `lat=95` 或 `lng=-200` 的工具调用（可由 mock 注入一条越界数据） | 对应事件**不**出现在地球与侧边栏；状态栏出现拒绝/校验失败提示文案；SSE 流不因此中断（其它合法事件仍正常落点） |
| TC-B-014 | 网络断开 / SSE 超时 | P0 | 搜索过程中（落点中段）通过 DevTools Network 切到 Offline，或 kill 掉 `dev:server` 进程 | 前端显示「连接中断，请重试」（或含「中断 / 重试」关键字的错误条）；地球已落点的事件保留可见；用户再次点搜索可恢复 |
| TC-B-015 | 用户中途停止 | P0 | 在搜索/落点中点击「停止」按钮（若 UI 提供） | 后端取消未完成的工具循环（再无新事件流入）；已落点事件保留；状态栏回到空闲态；同会话再次发起新搜索可正常工作 |
| TC-B-016 | API key 无前端泄漏（安全） | P0 | `npm run build` 后用 `rg "VITE_.*SILICONFLOW"` 与 `rg "<真实 key 字串>"` 在 `dist/` 全量 grep；并在浏览器加载页面后 `window` / Source 面板搜索 | `dist/` 任何静态产物**不**包含 `VITE_*SILICONFLOW*` 变量名；不包含真实 key 子串；浏览器侧无法从 `import.meta.env` 取到 key |
| TC-B-017 | 弹窗来源链接可达 | P1 | 点开任意事件弹窗中的 `来源` 链接 | 浏览器新标签打开有效 URL（非 `about:blank` / `javascript:void(0)`）；mock 数据下允许是占位 URL，但须为合法 http(s) 协议 |
| TC-B-018 | 至多 8 条上限约束 | P0 | 搜索一个会触发大量事件的主题（如「2024 全年国际新闻」），等待 SSE done | 单次搜索新增的事件总数 ≤ 8；SSE `summary` 或 `done` envelope 出现 1 次后流自然结束；不无限刷新 |
| TC-B-019 | 二次搜索不污染历史 | P1 | 完成一次搜索（已落点）后再发起另一主题搜索 | 新事件按设计行为合并或替换（按已冻结策略）；UI 状态机不卡在「分析中」；侧边栏不出现重复 ID；旧预置 5 条不被误删 |
| TC-B-020 | UI 不崩于 LLM 工具调用畸形 | P0 | mock 模式下注入一次工具调用 JSON 解析失败（缺字段或类型错） | SSE envelope 推 `error` 类型（或 `event` 被静默丢弃 + 状态栏提示），前端不出现白屏 / `Uncaught` ；本次搜索流可正常 `done` 收束 |

## TC-E 工程验收表

| 编号 | 标题 | P | 命令 | 期望退出码 | 关键输出摘要 / 锚点 | 约定生成物 |
|---|---|---|---|---|---|---|
| TC-E-001 | 依赖安装 | P0 | 在 `g:\G_cursor\projects\earth-globe-llm\` 执行 `npm install` | `0` | 控制台出现 `added <N> packages` 或 `up to date`；无 `npm ERR! ENOENT` / `EACCES` | `node_modules/`、`package-lock.json` 存在 |
| TC-E-002 | TypeScript 类型检查 | P0 | `npm run typecheck` | `0` | 输出可为空（tsc 成功默认无输出）；**禁止**出现 `error TS` 前缀；命令完整执行 `tsc -b --noEmit && tsc -p tsconfig.server.json --noEmit` | 无新增产物（仅校验） |
| TC-E-003 | 生产构建 | P0 | `npm run build` | `0` | 输出含 `built in <N>ms`（vite 标志）；最后阶段 `tsc -p tsconfig.server.json` 无 `error TS` | `dist/index.html`、`dist/assets/index-*.js`、`dist/assets/index-*.css` 存在；后端编译产物 `dist-server/index.js`（或同等入口）存在 |
| TC-E-004 | 后端 dev 启动 | P0 | `npm run dev:server` | 进程持续运行（无早退） | 控制台输出 `[earth-globe-llm] server listening on http://localhost:8787` | 端口 `8787` 监听（`netstat -ano \| findstr :8787` 可见 LISTENING） |
| TC-E-005 | `/api/health` 契约 | P0 | 在 `dev:server` 运行时执行 `curl -sS http://localhost:8787/api/health` | `0`；HTTP `200` | 返回体为 JSON，含字段 `ok=true`、`service="earth-globe-llm-server"`、`time`（ISO8601）、`siliconflow ∈ {"configured","missing"}`、`search_provider`（字符串）、`default_model`（字符串） | 无 |
| TC-E-006 | `/api/chat` SSE 头与 envelope | P0 | `curl -N -sS -X POST http://localhost:8787/api/chat -H "Content-Type: application/json" --data "{\"theme\":\"test\"}"` | `0`；HTTP `200` | 响应头 `Content-Type: text/event-stream`；响应体出现至少一行 `data: {...}\n\n`；JSON envelope 含字段 `type` 且取值 ∈ `{phase,status,event,summary,error,done}`；流以 `done` 或自然 EOF 收尾 | 无 |
| TC-E-007 | 前端 dev 启动与代理 | P0 | `npm run dev:web` 启动后访问 `http://localhost:5173/api/health` | 进程持续运行 | Vite 控制台出现 `Local:   http://localhost:5173/`；`/api/health` 在 5173 端口仍返回 8787 同样的 JSON（代理生效） | 端口 `5173` 监听 |
| TC-E-008 | 双进程联调 | P0 | `npm run dev` | 进程持续运行（不立即退出），前端可访问 | 控制台**同时**出现 server `listening on http://localhost:8787` 与 vite `Local:   http://localhost:5173/`；浏览器开 5173 看到 TC-B-001 描述的地球 | 5173/8787 同时 LISTENING |
| TC-E-009 | 构建产物可静态预览 | P1 | `npm run build` 后 `npx vite preview` 或同等静态服务器加载 `dist/` | 进程启动 | 浏览器加载 `dist/index.html`，能看到地球与预置 5 条事件（与 TC-B-001 / TC-B-003 对齐）；Console 无致命错误 | `dist/` 完整静态可分发 |
| TC-E-010 | API key 在产物中的不可见（安全） | P0 | `npm run build` 后在 `dist/` 与 `dist-server/` 全量 `rg -i "siliconflow_api_key\|sk-[A-Za-z0-9]{20,}"` 与 `rg "VITE_.*SILICONFLOW"` | `rg` 返回**无匹配**（grep 退出码 1） | 无任何匹配；如有匹配 = 即时 FAIL | 无 |
| TC-E-011 | Tauri 桌面打包 | P1 | `npm run tauri build`（前置：本机已装 Rust 工具链 + 用于 Windows 的 WebView2） | `0` | 输出含 `Built application bundles`；包大小 < 200 MB（建议） | `src-tauri/target/release/bundle/` 下出现 `.exe` / `.msi`（Windows）安装包；冷启动 < 5s（参考 TC-B 性能建议） |
| TC-E-012 | 仓内 AGENTS.md 与本链 META 一致 | P1 | 打开 `g:\G_cursor\projects\earth-globe-llm\AGENTS.md` 与 `g:\G_cursor\.cursor\agents\runs\EARTH-GLOBE-LLM-20260425\META.md` 对照 | 无命令 | AGENTS 中 GOAL_SENTENCE / 数据源默认 mock / 模型默认 Qwen3-32B 与 META 一致；不出现密钥写死 | 无 |

## DoD 与回归关注点

### DoD（PASS 条件 · 全部 P0 实测通过）

- **TC-B P0 (14)**：`B-001/002/003/004/005/006/011/012/013/014/015/016/018/020`
- **TC-E P0 (9)**：`E-001/002/003/004/005/006/007/008/010`
- **总 P0 数：23 条**
- **+1 主帅亲自实测**：每条 P0 须留下命令 + 退出码 + 关键输出摘要（或截图/Console 摘录）；摘要落 `g:\G_cursor\.cursor\swarm\RECENT-DECISIONS.md`。
- **R4b 关门**：在 R3（主帅写码轨）关门摘要 + 上述实测证据齐备后，R4b Sub-agent 对照本表逐条核对 → 给出 PASS / COND_PASS / FAIL。

### COND_PASS 允许范围（不阻塞 MVP 收口，但须登记）

- `TC-E-011`（Tauri 打包）：用户机器尚未装 Rust 工具链时，可记 COND_PASS + 风险登记；阶段 6 上机再补。
- `TC-B-007`（同坐标聚合）/ `TC-B-008`（时间轴）/ `TC-B-009`（侧栏联动）/ `TC-B-010`（排序）/ `TC-B-017`（链接）/ `TC-B-019`（二次搜索不污染）：MVP 视觉/交互优化，可分批 COND_PASS。
- `TC-E-009`（vite preview）：仅静态预览验证，可在 build PASS 后跳过。

### FAIL 触发（任一即整链 FAIL，不得收口）

- 任一 P0 未通过；
- `TC-B-016` / `TC-E-010` 任何一处发现真实 key 或 `VITE_*SILICONFLOW*` 出现在前端产物（**安全级 P0，零容忍**）；
- `TC-E-002 / 003` 出现 `error TS`；
- `TC-B-005` 在配齐 key 与 mock provider 时仍无法走通 `搜索中→分析中→落点中` 三段。

### 误操作 / 回归关注点（≥5 条 · 实测覆盖建议）

1. **误填 key**：用户把 key 写到 `VITE_SILICONFLOW_API_KEY=...` → 前端能拿到（ENV 暴露）= **回归 FAIL**；后端拿不到 = `/api/health` `siliconflow="missing"`。修复路径：教育文档 + `.env.example` 只写 `SILICONFLOW_API_KEY=` 无 `VITE_` 前缀。
2. **清缓存 / 清 IndexedDB / 隐私窗**：地球贴图与预置 5 条仍可加载；不依赖任何前端 localStorage 中的 key。
3. **双开 / 多标签**：两个标签同时搜索 → 后端 `/api/chat` 互不串流（按连接级隔离）；不出现两标签事件相互混入对方地球。
4. **大主题 (>50 个候选事件)**：单次搜索仍受 `≤8` 上限约束（TC-B-018）；后端不阻塞 / 不 OOM；状态栏提示「已截断到 8 条」或同等文案。
5. **移动端窗口尺寸（responsive）**：缩窗到 ≤768px 宽时，地球不溢出 / 控件不重叠（即使 MVP 不主打移动端，也不允许直接白屏）；P1 级。
6. **断网 → 恢复 → 重搜**：TC-B-014 后再恢复网络，不重启进程，再次搜索能跑通完整 SSE 流；前端错误条自动清除。
7. **断网中切搜索**：搜索 1 进行中切到搜索 2；旧 SSE 连接被中断或 done，新搜索不被旧流污染；侧边栏不出现搜索 1 半截事件错乱排序。
8. **`SEARCH_PROVIDER` 切到 `bocha` / `tavily` 但无 key**：后端 `/api/health` `search_provider` 字符串如实回显；`/api/chat` 走 mock 兜底或返回 `error` envelope，但**不崩**。
9. **API key 旋转**：用户更换 key 后重启 `dev:server` 即生效；前端无需重启 vite（接口走代理）。
10. **`npm run build` 后 `node_modules` 损坏 / 重装**：`npm install` 仍能从锁文件复现等价依赖（`package-lock.json` 已入仓）；TC-E-001 可重复跑通。

## 给 R4b 的核对要点（建议优先关注）

1. **安全 P0 双闸**（TC-B-016 + TC-E-010）：grep 实测必须留可复核命令与输出摘要；这是不可让步的零容忍项。
2. **SSE envelope 类型枚举完整性**（TC-B-006 + TC-E-006）：核对实测捕获到的 envelope `type` 是否完全落在 `{phase,status,event,summary,error,done}` 内；多余类型 = 契约漂移。
3. **错误语义三连**（TC-B-012/013/014）：缺 key / 越界 / 断网三种降级路径**全部要有**用户可感知文案 + 不崩 + 已落点保留；任一项静默失败 = FAIL。
4. **状态机三段**（TC-B-005）：`搜索中→分析中→落点中` 三段在主帅实测中是否真实可见；若被 R3 简化为单段「处理中」= 契约偏离，须重开 R3 修正或显式契约变更。
5. **构建 → 预览 → 联调** 三连（TC-E-001~008）：每条都要有命令 + 退出码 + 关键日志锚点；缺日志锚点的「目测通过」不接受。
6. **Tauri**（TC-E-011）：若本轮主帅未实测，须在 R4b 中明确登记 COND_PASS 并约定补测时机，不可假装已通过。

---

**冻结状态**：✅ 本表已冻结。后续如契约变更（用户改 GOAL_SENTENCE / 新增 P0 / 调整数据源策略），须由主帅 +1 重发 R4a Task 形成 ROUND=2，并在本文件追加新版块或显式废止旧条目。
