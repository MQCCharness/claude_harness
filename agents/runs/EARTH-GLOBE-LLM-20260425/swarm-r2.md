---
name: swarm-r2-earth-globe-llm
description: R2 技术调研员 · CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=2。核验 react-globe.gl 内部 globe mesh 注入、@react-three/fiber 在 Vite 下兼容、NASA Blue/Black Marble + SRTM/GMTED 公开素材的具体 URL/license/分辨率/体积、displacementScale 工业基准、8K 纹理低端 GPU 边界。只读，事实标 A/B。
---

# 蜂群 R2 · 技术调研员（CHAIN=EARTH-GLOBE-LLM-20260425）

## 本链绑定

- **CHAIN**: EARTH-GLOBE-LLM-20260425
- **ROUND**: 2
- **GOAL_SENTENCE**: 见 [META.md](./META.md)
- **v2 增量目标句**：见 [swarm-r1.md](./swarm-r1.md) §本链绑定

## 角色硬约束（本链差异化）

- **只读 + 求证**：只读官方文档 / GitHub README/issue / npm 包 / NASA 公开页面；不写源码。
- **每条结论标 A/B**：
  - **A 级**：含可复核来源（官方 URL、specific commit/tag、官方 license 文本、可执行 curl 与回显示例）。
  - **B 级**：内部一致或社区共识，但无单一权威来源——须标注"待主帅当面验证"或"打开 url 后跑 N 行命令确认"的具体路径。
- **禁止**：无来源的技术断言；"应该可以"、"通常"、"一般来说"等无落点措辞。
- **优先权重**：F1 / F3 是最关键事实（决定能否跑通），F2 / F4 / F5 / F6 次之，F7 看运气。

## 上游输入摘要（条目化）

详见 [swarm-r1.md](./swarm-r1.md) §上游输入摘要。本 Task **不**重复粘贴。

## 待核验事实清单（F1–F7）

### F1 · react-globe.gl 内部 globe mesh 注入路径（**最关键**）

请核验：

- F1.1 `react-globe.gl` 当前最新版本号 + 其底层 `three-globe` 的版本号（`package.json` peerDependencies + npm latest）。
- F1.2 通过 `globeRef.current.scene()` 拿到 `THREE.Scene` 后，遍历能否找到地球本体 mesh？该 mesh 的 `name` 是什么（如 `globeObject`）？其 `geometry` 是 `SphereGeometry` 还是 `BufferGeometry`？
- F1.3 该 mesh 的 `material` 是什么类型（`MeshPhongMaterial` / `MeshBasicMaterial` / `ShaderMaterial`）？是否原生支持 `displacementMap` 属性？
- F1.4 是否有更直接的暴露 API（如 `globeRef.current.globeMaterial()` 已存在；是否有 `globeMesh()` 等价接口）？
- F1.5 替换其 `geometry` 后，react-globe.gl 内部是否会**重置**几何（如每次 `htmlElementsData` 变化都会重建）？
- F1.6 GitHub `react-globe.gl` / `three-globe` 现有 issue 中是否有提到 displacement / 替换 geometry 的成功案例？给出 issue 链接。

**期望产出**：一段可在 `useEffect` 中执行的**可行注入伪代码**（5–15 行）+ 已知风险（替换 geometry 后是否每帧被覆盖）。

### F2 · @react-three/fiber + drei 在 Vite + React 18 + TS 下兼容

请核验：

- F2.1 `@react-three/fiber` 与 `@react-three/drei` 当前 latest 版本号。
- F2.2 与 `three.js` 的版本约束矩阵（`react-globe.gl` 当前依赖的 three 版本是否与 R3F 要求兼容；存在 deduping 风险时如何解决）。
- F2.3 在 Vite 5 + React 18 + TypeScript 下是否需要特殊 `vite.config.ts` 配置（如 `optimizeDeps.include`）？
- F2.4 一个最简太阳系示例（太阳球+1 个行星+轨道+自转）的代码体量参考（drei 的 `<OrbitControls>` `<Stars>` `<MeshStandardMaterial>` 是否够用）。
- F2.5 生产构建后体积增量估计（gzip 后 KB 数）。

### F3 · NASA 公开纹理素材具体 URL + License + 分辨率 + 体积（**最关键**）

请核验下列**可直接 wget/curl 下载**的链接（或社区已转好的镜像），覆盖三种用途：

- **白天纹理**（Blue Marble Next Generation）：8K 推荐 / 4K fallback。
- **夜晚纹理**（Black Marble / Earth City Lights）：8K / 4K。
- **位移高度图（grayscale displacement PNG）**：8K / 4K（基于 SRTM30、GMTED2010、ETOPO1 任一）。

每条素材给出：

- 直链 URL（HTTPS 优先；如果 NASA 原页是 GeoTIFF，给社区已转好的 8-bit PNG 镜像，例如 `solarsystemscope.com/textures/`、`shadedrelief.com/natural3/`、`earthobservatory.nasa.gov`）
- 分辨率
- 文件体积（MB）
- License（公共领域 / CC0 / Attribution）
- **入仓建议**：放 `public/textures/earth-day-8k.jpg` 等具体路径
- **License 文本如何在 README/AGENTS 中标注**

**期望产出**：表格形式，可被主帅直接复制进 `public/textures/README.md`。

### F4 · displacementScale 工业基准

请核验：

- F4.1 Cesium / NASA WorldWind / Solar System Scope 等开源项目对地球 displacement 的"视觉夸张系数"惯例（具体数值或公式）。
- F4.2 真实比例下（珠峰 / 半径 = 0.139%）的视觉效果是否完全不可见，给出可信的来源。
- F4.3 推荐区间（默认 / 滑块上下限），覆盖"科学严谨"到"卡通夸张"。
- F4.4 是否有 Three.js 官方教程或社区博客明确写过"地球级 sphere displacement 的最佳实践"。

### F5 · 8K 纹理低端 GPU 显存边界

请核验：

- F5.1 8K (8192×4096) JPEG decode 后的 RGBA 显存占用（理论值 + WebGL 实测参考）。
- F5.2 集显（Intel UHD 620 / Iris Xe / Apple M1 base）能否同时承载 3 张 8K 纹理 + 256² sphere 几何？
- F5.3 浏览器 GPU 显存爆炸时的失败模式（黑屏 / 纹理回退 / 崩页）。
- F5.4 是否有 fallback 到 4K 的标准模式（如 `IntersectionObserver` 检测 / 用户 agent / GPU info）。

### F6 · three.js MeshPhongMaterial + displacementMap + 高 segments 兼容

请核验：

- F6.1 three.js 当前 latest 中 `MeshPhongMaterial.displacementMap` 是否仍然支持？是否有 deprecation 警告？
- F6.2 256×256 SphereGeometry 的顶点数（公式：(w+1)(h+1) ≈ 65,792）+ 渲染开销。
- F6.3 与 `MeshStandardMaterial`（PBR 材质）的对比：是否值得换 PBR 来同时支持 normalMap + displacement + roughness？
- F6.4 是否需要在 GPU shader 中处理 displacement 的法线（`computeVertexNormals`）以避免错误光照？

### F7 · MCP / 实时网页提取（前一轮用户问题的延续，**低优先级**）

主帅在前一轮提出"LLM 直接调网页工具提取大量信息再整理"的诉求，此为 v2 后置功能不在本 Task 主目标内。**仅给出**：

- F7.1 Cursor / Claude / OpenAI 中 MCP server 接入流程的入门级链接（1–2 条）。
- F7.2 是否有现成的"web fetch + extract"MCP server（开源）。

不展开实现，纯 URL 列表即可。

## 输出格式约束

请用以下结构回复：

```
## F1 · react-globe.gl mesh 注入

- F1.1 [A] 版本号: react-globe.gl X.Y.Z（来源：npm view ...）
- F1.2 [B] mesh 路径: scene.traverse 找 SphereGeometry mesh；name='Globe'（来源：three-globe src/index.js#L42）
- ... 
**注入伪代码**:
```ts
// 5-15 行
```
**已知风险**: ...

## F2 · @react-three/fiber 兼容

...

## F3 · NASA 素材表

| 用途 | URL | 分辨率 | 体积 | License | 入仓路径 |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## F4 · displacementScale 基准
- [A/B] ...

## F5 · 8K + 低端 GPU
- [A/B] ...

## F6 · three.js material/geometry
- [A/B] ...

## F7 · MCP（低优先级）
- 链接 1: ...
- 链接 2: ...

## R2→R3 转化建议（≤5 条）

- 主帅在 R3 spike 时优先验证 F1.5（geometry 替换是否被覆盖）
- ...

## R2→R4a 转化建议（≤3 条 · 契约级）

- TC-E-... 新依赖 @react-three/fiber 安装后 npm run typecheck 仍 PASS
- TC-B-... 8K 纹理首屏加载 < N 秒
- ...
```

**字数上限**：2000 字。引用须给可点 URL；推断须显式标 [B]。

## 最近派发 Task 摘要（与 Task 正文对账）

| ROUND | ROLE | 派发时间 | Task 锚点 | 备注 |
|---|---|---|---|---|
| 2 | R2 | 2026-04-25 | `CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=2 ROLE=R2` | v2 7 大事实核验；与 R1 并行；F1+F3 关键；关门后→ R3 spike + R4a |
