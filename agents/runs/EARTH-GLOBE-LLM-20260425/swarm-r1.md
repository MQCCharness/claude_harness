---
name: swarm-r1-earth-globe-llm
description: R1 需求撕裂者 · CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=2。撕裂 v2 三大模块（太阳系主页/路由、高分纹理、displacementMap 真实地形）的边界、风险面、矛盾需求与极限输入；产出可转化为 →R3 硬约束 / →R4a 负例。只读分析，不写业务源码。
---

# 蜂群 R1 · 需求撕裂者（CHAIN=EARTH-GLOBE-LLM-20260425）

## 本链绑定

- **CHAIN**: EARTH-GLOBE-LLM-20260425
- **ROUND**: 2（v2 增量：主页 + 路由 + 高分纹理 + 真实地形 displacement + 滑块）
- **GOAL_SENTENCE**: 见 [META.md](./META.md) §本链绑定（v1 GOAL 不变；v2 是 UX/视觉增量，未推翻）
- **v2 增量目标句**（待 R1 撕裂后由主帅汇流冻结）：
  > 在 v1 demo 基础上，新增「太阳系动画主页 → 工作台」双视图启动流（含返回按钮）；将地球纹理从 ~2K 升级到 8K NASA Blue/Black Marble；通过 react-globe.gl 内部 mesh 注入 displacementMap + 高 segments 实现真实地形（山川凸、海沟凹），并提供 displacementScale 可调滑块。

## 角色硬约束（本链差异化）

- **只读**：不得写业务源码、不得改 `CLAUDE.md` / 技能文件；产出仅落到本文件「最近派发 Task 摘要」节或 Task 返回正文。
- **撕裂粒度**：每条威胁/边界须能转化为以下三类**至少一类**（明确转化路径）：
  - **→R3 硬约束**：实现层必须遵守的 must/must-not（如"Tauri 包体上限"、"低端 GPU fallback 路径"、"切视图必须断流"）。
  - **→R4a 负例**：可写进 TC-B/TC-E 验收表的失败用例（如"Tauri 包 > 80MB FAIL"、"切回主页时 5 秒后 SSE 还在收 → FAIL"）。
  - **→风险登记**：本轮不采纳但需主帅留痕的剩余风险（如"低端 GPU 用户体验问题超 MVP 范围"）。
- **禁止**：泛泛的"建议测试一下"、"可能需要考虑"无落点叙述；禁止生成实现代码。
- **聚焦面**：v2 三大模块的**新增**风险，与 v1 已识别风险（API key 泄漏、坐标越界、断网降级等）**不重复**——若 v2 改动会冲击 v1 风险（如新依赖增大 API key 误暴露面），单列。

## 上游输入摘要（条目化 · v2 ROUND=2 主帅冻结条草案）

> 派发 Task 时主帅会把以下条目复制进 Task 正文。Sub-agent 不得反向阅读会话历史；以本节为唯一上游输入。

### v2 已批准技术决策（用户当轮明示 + 主帅推荐方案）

1. **Q1=A**：主页太阳系用 `@react-three/fiber` + `@react-three/drei` 真 3D 实现（新增依赖）。
2. **Q2=B**：高分辨率纹理资源**入仓** `public/textures/`（不走 CDN，Tauri 离线友好）。
3. **Q3=C**：点击「返回主页」时**中断**当前 `/api/chat` SSE 流，但**保留**已落点事件（再回工作台仍可见）。
4. **Q4=B**：`displacementScale` 在 SettingsPanel 加一个滑块（区间 0.005–0.030）。
5. **Q5=A**：主页风格 = 黑色深空 + 真实 NASA 纹理太阳系。

### v2 实现路径（主帅初稿，待 R1 撕裂）

- **路由**：用 Zustand 加 `appView: 'home' | 'workspace'`，**不引 React Router**。
- **主页**：新组件 `SolarSystem.tsx`（`@react-three/fiber` 写真 3D，太阳/水金地火 + 简化轨道线 + 自转）。
- **地形**：在 `Globe.tsx` 用 `globeRef.current.scene().traverse()` 找内部 globe mesh，替换其 `geometry` 为 256×256 sphere；挂 `displacementMap`、调 `displacementScale=0.012` 默认。
- **纹理**：`public/textures/` 放三张 8K：白天/夜晚（根据现有夜景模式保留）/displacement，本地引用。

### 不确定项（B 级，期待 R1 提出测试边界、R2 给事实）

- **U1**：`react-globe.gl` 当前版本（仓内是 react-globe.gl 最新版本）是否真的能通过 `scene().traverse()` 拿到 globe mesh？mesh 的 geometry 是 `SphereGeometry` 还是 `BufferGeometry`？material 是 `MeshPhongMaterial`？
- **U2**：`@react-three/fiber` + Vite + React 18 + TS 是否需要特殊配置（如 `vite.config.ts` 加 transform）？依赖体积？
- **U3**：8K JPG/PNG 在低端集显（如 Intel UHD 620）的显存上限？
- **U4**：Tauri 打包时 `public/textures/` 进 `.msi` 后包总大小变化？
- **U5**：切视图时 SSE 流断开的"标准"做法（AbortController）是否在当前后端实现下能正确清理？
- **U6**：海陆掩膜缺失——displacement 让海洋部分也"凸凹"是否符合视觉预期？（用户原文："山川凸起、河流谷地凹下"，没明说海洋）

## 撕裂关注面（建议覆盖 · 非穷尽）

请按以下 **9 类**至少各产出 **1 条**带转化路径的撕裂结论。每条须含「现象/边界 → 转化（→R3/→R4a/→风险）」二元结构。

1. **路由/视图切换边界**：home↔workspace 来回切换的状态保留与释放（搜索流、事件、滑块值、SettingsPanel 配置等）。
2. **太阳系主页性能**：自转 + R3F 在低端 GPU 的 FPS 下界；主页是否消耗 CPU 阻塞主线程影响后续工作台体验。
3. **新依赖体积/兼容**：@react-three/fiber + drei 在生产构建产物中的体积占比；与 react-globe.gl 共用 three.js 是否存在版本冲突。
4. **纹理分辨率/视觉**：8K 在不同屏幕（4K 显示器近距 vs 1080p 远距）的实际清晰度；首屏加载等待文案。
5. **几何注入失败的回退**：spike 失败（拿不到 mesh / 替换 geometry 后渲染异常）的最小恢复路径；不能让用户看到白屏。
6. **displacement 与现有视觉的冲突**：山尖刺破大气层；marker 锚点 `htmlAltitude=0.012` 与位移后的地表高度叠加；HoverPreview 位置偏移。
7. **海陆掩膜**：海洋是否也按 displacement 凸凹（这是默认行为）；是否需要 Q4 滑块为 0 时彻底关闭凸凹回到 v1 平滑球。
8. **Tauri 打包/分发**：高分纹理打入安装包的体积上限（v1 R4a TC-E-011 建议 < 200MB）；是否触发 antivirus / Windows SmartScreen。
9. **安全/隐私边界**：新增的 SettingsPanel 滑块是否被 persist 到 localStorage（v1 已 persist API keys，v2 不要把 displacement 数值与敏感信息混进同一 store key）。

## 输出格式约束

请用以下结构回复（精简、可被主帅 grep）：

```
## 撕裂结论（按 9 类）

### 1. 路由/视图切换边界
- [边界] 现象描述 → [→R3] 硬约束 / [→R4a] 负例 TC-... / [→风险] 登记原因
- ...

### 2. 太阳系主页性能
- ...

(以此类推 9 类，每类至少 1 条；可多条；穷举式负例标 [→R4a]，会变成 R4a Task 入参)

## 关键威胁排序（Top 5）

1. ...（最易让 v2 翻车的边界）
2. ...

## 给主帅的下一步行动建议（最多 3 条）

- ...
```

**字数上限**：1500 字。**禁止**长篇引用 plan 或 META 原文。

## 最近派发 Task 摘要（与 Task 正文对账）

| ROUND | ROLE | 派发时间 | Task 锚点 | 备注 |
|---|---|---|---|---|
| 2 | R1 | 2026-04-25 | `CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=2 ROLE=R1` | v2 三大模块撕裂；与 R2 并行；关门后→ R3 spike + R4a |
