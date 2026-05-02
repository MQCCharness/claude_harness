# META · EARTH-GLOBE-LLM-20260425

## 本链绑定

- **CHAIN_ID**: `EARTH-GLOBE-LLM-20260425`
- **CREATED_AT**: 2026-04-25
- **DOMAIN**: 桌面 Web 应用（Tauri 2 + React + react-globe.gl）
- **OWNER**: 用户（个人开发者 / 产品 owner · 标 B 推断）
- **GOAL_SENTENCE**:
  「**3D 旋转/缩放/拖动地球仪 + 硅基流动 LLM Function Calling + 实时联网检索 → 把全球事件以可点击标记+弹窗形式落到地球；以入仓代码长期迭代为正式产品**」（A 级，用户原文已确认）
- **NON_GOALS**:
  - 不做地理级精度（不上 Cesium）
  - MVP 阶段不做多用户协作 / 后端持久化 / 鉴权
  - MVP 不接入移动端

## 已冻结契约（A 级 · 见 plan）

- 代码位置：`g:\G_cursor\projects\earth-globe-llm\`
- 运行形态：Web 开发态 → Tauri 2 桌面打包
- 3D 引擎：`react-globe.gl`
- LLM 平台：硅基流动 SiliconFlow（OpenAI 兼容协议）
- 调用模式：Function Calling
- 数据源（D 选项 · 用户决策）：默认 `SEARCH_PROVIDER=mock`（让 LLM 用自身知识落点）；保留博查 / Tavily 可插拔 + `siliconflow_native` 占位，等用户最后给 SiliconFlow API key 后由主帅实测真实联网形态再切到对应实现
- MVP 档位：野心档（含 Tauri 桌面打包）
- 三字段：执行者=个人开发者(B) / 扮演=技术顾问+实现+实测裁决(A) / 用途=入仓长期迭代(A)

## 执行配置（已冻结）

| 角色 | MODEL_OR_TIER | NOTES |
|---|---|---|
| 主帅 +1 | 父代理（用户当前会话档位） | 主对话直接落地业务源码（隐性授权 · 见首段 RISK_OWNER 声明） |
| R4a Sub-agent | 继承父代理 | 冻结 TC-B / TC-E 验收表 |
| R4b Sub-agent | 继承父代理 | 关门核对，对账 R4a 表 + 实测证据 |

豁免说明：本轮 R3 代号未派 Task，由主帅在主对话直接落地业务源码（隐性「主帅直接改仓」+「模型主帅定」，RISK_OWNER = 主帅本人；用户随时可打断）。

## 关键路径指针

- Plan 文件：`c:\Users\10575\.cursor\plans\earth-globe-llm-demo_3a977ead.plan.md`
- 子项目根：`g:\G_cursor\projects\earth-globe-llm\`
- 子项目 AGENTS：`g:\G_cursor\projects\earth-globe-llm\AGENTS.md`
- 决策落盘：`g:\G_cursor\.cursor\swarm\RECENT-DECISIONS.md`
- R4a 角色稿：`g:\G_cursor\.cursor\agents\runs\EARTH-GLOBE-LLM-20260425\swarm-r4a.md`
- R4b 角色稿：`g:\G_cursor\.cursor\agents\runs\EARTH-GLOBE-LLM-20260425\swarm-r4b.md`
- Tauri 骨架：`g:\G_cursor\projects\earth-globe-llm\src-tauri\`（Cargo.toml + tauri.conf.json + main.rs + lib.rs + capabilities + icons/README）

## 阶段进度（截至 2026-04-25 19:14）

| 阶段 | 状态 | 备注 |
|---|---|---|
| 0 脚手架与治理 | ✅ COMPLETED | CHAIN/META/swarm-r4a/r4b/AGENTS/README/.env.example/tsconfig/vite/tailwind/postcss |
| 1 地球骨架 | ✅ COMPLETED | Globe.tsx + react-globe.gl + 5 个示例事件 + HTML Elements Layer 弹窗 |
| 2 本地代理 | ✅ COMPLETED | Express + /api/health + /api/chat (SSE) 实测通过 |
| 3 LLM 集成 | ✅ COMPLETED | OpenAI SDK + tools 循环 + 4 个推荐模型 |
| 4 搜索接入 | ✅ COMPLETED (D 选项) | provider 可插拔；默认 mock；siliconflow_native 占位（已 R2 实测确认无原生联网） |
| 5 流式与交互 | ✅ COMPLETED | SSE 逐个落点 + 同坐标聚合 + TimelineSlider + StatusBar |
| 6 Tauri 打包 | ⚠️ COND_PASS | 骨架已就绪（src-tauri 完整目录 + tauri.conf.json + Rust 入口 + capabilities + 图标说明）；用户需自行装 Rust 工具链 + 跑 `npm run tauri icon` 后才能 `npm run tauri:build`；MVP 暂保留两进程模式（前端 + 独立 Express 后端），sidecar 化留给后续阶段 |

## R2 已核验事实摘要（A 级）

详见 plan 「R2 已核验事实摘要」节。

## 风险登记（R1 转化 + 实操新增）

| 风险 | 等级 | 应对 |
|---|---|---|
| 系统未装独立 Node / Rust / pnpm | 中 | 阶段 0 用 aily-blockly 内置 node + npm；阶段 6 提示用户装 Rust |
| LLM 返回坐标越界 | 低 | 加合法性校验 |
| 博查 / Tavily 无 key | 中 | 阶段 4 写出占位实现，提供 mock 兜底数据 |
| Tauri 在 Win 7 无 WebView2 | 低 | 阶段 6 加 bootstrap 安装器配置 |
| API key 泄露 | 高 | 严禁 `VITE_*` 前缀 + Vite 不暴露后端 .env |

## 验收门禁

- TC-B-001..008 见 plan
- TC-E-001..006 见 plan
- 主帅实测证据落 `RECENT-DECISIONS.md`
