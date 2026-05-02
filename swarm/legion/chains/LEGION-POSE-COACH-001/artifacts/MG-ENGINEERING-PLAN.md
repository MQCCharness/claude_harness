# LEGION-POSE-COACH-001 · 端侧工程计划与 OP 发包

**锚点**：`CHAIN=LEGION-POSE-COACH-001` `ROUND=2` `TIER=MG` `ROLE=MG-端侧工程主管` `PARENT_REF=统帅继续EP0`  
**产出角色**：MG-端侧工程主管  
**下游消费者**：OP-小程序开发员（EP-3）；军团统帅（对账）  
**军令状**：仅穿透阅读，本文档**不修改** `.claude/swarm/legion/chains/LEGION-POSE-COACH-001/MISSION-BRIEF.md` 正文。

---

## 1. 《逐级主题汇流块》

| 层级 | 主题摘要 | 与本链关系 |
|------|----------|------------|
| **统帅 / 军令状** | 微信小程序：摄像头预览 + 示例姿势 + 可理解引导；MVP 可上架；人体能力以官方文档为准；`scope.camera` 须场景化说明；画面默认本地处理；VK 失败须可理解降级（含「纯示意模式」）。 | **冻结目标与硬约束**；工程计划不得弱化隐私与降级要求。 |
| **DAG / SCHEDULE** | `MG-端侧 → OP-小程序`；OP-小程序在 **EP-3** 依赖 **MG 工程计划 + OP-UX + OP-内容**。 | 本文件为 **MG 侧 EP-0 产出**；OP 完整输入在 EP-2/内容就绪后由统帅 **I/O 路由** 闭合。 |
| **ARCHITECTURE** | 小程序与视觉工程部：Camera、VisionKit、性能、骨架匹配 MVP；信息回流 UX（帧率/耗电风险）。 | 本计划固定 **技术闸门、性能预算、分包与权限**；**不**代 OP-UX 写具体文案。 |
| **MG 本层（端侧）** | 基础库/客户端假设（B 直至官方+实测）、VK Body 与 `camera` 边界（文档可核处标 A）、性能与低端降级、分包与权限、`scope.camera` 与相关 API、**P0 机型宣称闸门**、`decisions_log`。 | 交付 **《端侧工程计划》** + **《下级 Task 发包》** 骨架。 |

---

## 2. 《端侧工程计划》

### 2.1 技术栈与仓库形态（工程假设）

- **平台**：微信小程序（原生或统一跨端框架若未来引入，须**新开**闸门与军令状补丁；**本期默认原生小程序栈**）。  
- **渲染**：拍摄页涉及 **原生组件 `camera`** 与可能的 **Canvas / WebGL**（VisionKit 典型路径见官方指南）。  
- **状态管理 / 构建**：由 OP-小程序在实现包中固化；MG 要求：**`project.config.json` / `app.json` 与分包策略可审查、可复现构建**。

### 2.2 推荐 / 最低基础库与微信客户端版本（**B**，直至「官方文档 + 实机矩阵实测」写入发布说明）

下列 **最低版本数字** 取自微信开放文档当前页面表述，标 **A（可核验）**；**「推荐目标组合」** 为工程折中建议，标 **B（待项目实测与兼容性表冻结）**。

| 能力 | 文档载明最低基础库 | 证据等级 | 备注（A 级引用） |
|------|-------------------|----------|------------------|
| `camera` 组件 | **1.6.0** 起支持 | **A** | [camera 组件](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) |
| `wx.createVKSession`（VisionKit 会话） | **2.20.0** 起支持 | **A** | [wx.createVKSession](https://developers.weixin.qq.com/miniprogram/dev/api/ai/visionkit/wx.createVKSession.html) |
| `track.body`（人体检测） | **2.28.0** 起支持 | **A** | 同上 API 表；指南 [Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html) |
| 人体 **3D** 关键点（扩展） | 指南称 **微信客户端 ≥ 8.1.0** 起提供 | **A** | [Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html) 文首说明 |

**推荐（B）**：首期若要以 **实时人体关键点** 为主路径：建议 **`miniprogram` 基础库下限 ≥ 2.28.0**（与 body 对齐），并在发布说明中并列 **微信客户端** 与 **iOS/Android** 实测子集。  
**绝对最低（B）**：若产品接受「无 VK、仅 camera + 示意」：**camera 仍建议 ≥ 2.10.0** 以便 `resolution` / `initdone` 等能力（文档载明多项能力带版本门槛，详见 camera 页属性表 **A**）；具体下限以 OP 实现与统帅验收表冻结为准。  

**Breaking Change（纪律）**：未通读对应基础库 **发行说明** 前，**不得**将任何行为变化标为 **A**；仅可标 **B** 并列入 `decisions_log` 待 R2/实测闭合。

### 2.3 VisionKit Body 与 `camera` 组件：使用边界（文档可核部分标 **A**）

**A — 来源：微信开放文档**

1. **`camera` 组件**  
   - 系统相机预览；需用户授权 **`scope.camera`**（见下节 authorize 表）。  
   - **基础库 1.6.0** 起支持；扫码需客户端 **6.7.3+**（组件页说明）。  
   - **限制**：同一页面**仅一个** `camera`；注意**原生组件使用限制**（层级、同层渲染等）。  
   - `binderror`：用户拒绝摄像头等场景。  
   - 引用：[camera 组件](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)、[原生组件使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)。

2. **VisionKit / `wx.createVKSession`**  
   - **基础库 2.20.0** 起支持；指南说明会话在页面内**单例**、与页面生命周期强相关，且多页面实例**互斥**（全局至多一个 VKSession 实例语境——以指南原文为准）。  
   - **`track` 能力互斥**：API 文档明确 **不同跟踪能力之间互斥**，需按需配置；body 与 plane/face 等不可随意并行混用。  
   - **`track.body`**：**2.28.0** 起；用法见 [Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html)。  
   - **模式**：`mode: 1` 摄像头实时；`mode: 2` 静态图 + `detectBody`。事件：`updateAnchors` / `removeAnchors` 等（见 body 指南）。  
   - **3D 关键点**：指南称需 **微信 ≥ 8.1.0**；`open3d` / `update3DMode` 等接口以文档为准。  
   - 引用：[VisionKit 指南](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/base.html)、[wx.createVKSession](https://developers.weixin.qq.com/miniprogram/dev/api/ai/visionkit/wx.createVKSession.html)、[Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html)。

**B — 需实机与产品联合冻结**

- **同屏策略**：业务上若需「用户熟悉的 `camera` 组件 UI」与「VK 算法输入」并存，须 OP 按官方 Demo 路径验证（官方示例仓库路径见 body 页 **程序示例**，属 **B** 直至 OP 提交实测记录）。  
- **关键点与姿势教学映射**：23 点 2D / SMPL-24 3D 定义以 body 页为准（**A**）；**与示例姿势素材的匹配算法**为产品+工程共定，**B**。  
- **检出率/帧率与机型覆盖**：**B**，由性能预算与 P0 矩阵闭合。

### 2.4 性能预算（**B**，目标值；以 OP 埋点 + 真机为准升 A）

| 维度 | 目标 / 闸门 | 说明 |
|------|-------------|------|
| **预览与交互** | 拍摄页 UI 保持流畅；避免与 VK 同帧重逻辑争抢主线程 | 具体 FPS **B**；要求 OP 在低端样机上记录：进入页、授权后、VK 开启前后的卡顿与掉帧主观+（可选）性能面板。 |
| **VK / 人体** | 默认 **2D** 人体；**3D** 默认关或「高阶开关」 | 3D 耗电与发热更高；与军令状「非 100% 实时高精度」一致。 |
| **算法频率** | 可对 `updateAnchors` **降采样**（例如每 N 帧做一次匹配/ UI 更新） | 须保证引导仍「可理解」，不误判为卡死。 |
| **内存 / 包体** | 素材与分包见 2.5；避免单包过大导致低端机安装失败 | **B**。 |

**低端机降级策略（工程要求）**

1. **Level 0**：无 VK 或 `start` 失败 → **纯示意模式**（示例图 + 文案引导由 OP-UX 提供；工程提供布局与状态机钩子）。  
2. **Level 1**：VK 可用但置信度低/频繁 `removeAnchors` → 降频匹配 + 弱化叠加动效（与 UX 计划对齐，**工程不擅自定文案**）。  
3. **Level 2**：关闭 3D、降低 `camera` `resolution` / `frame-size`（在文档允许范围内 **A** 校验属性表后再改）。  

### 2.5 分包与权限清单

**分包（B）**

- 建议：**拍摄页 + VK 相关工具**可放入 **分包**，主包保留启动、隐私摘要、场景入口；具体 `root`/`name` 由 OP 按代码树输出，需满足首屏可打开「隐私与授权说明」路径（与军令状一致）。  
- 官方分包配置入口：**B**（实现时对照 [小程序配置 reference](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html) 当前章节）。

**权限 / 声明项（工程侧清单，文案由 OP-隐私与 OP-UX 提供）**

| 类型 | 项 | 说明 |
|------|-----|------|
| scope | **`scope.camera`** | 摄像头（见 2.6） |
| 用户隐私协议 / 隐私保护指引 | 后台配置 + 弹窗流程 | 横切 OP-隐私；工程侧保证 **调用相机/VK 前** 已完成产品定义的同意流（实现由 OP 执行）。 |
| 录音等 | 本期默认 **不需要** `scope.record` | 若引入直播类等组件再评审 |

### 2.6 `scope.camera` 与相关 API（**A**）

**授权语义（摘录）**

- `scope.camera` 对应接口包括：**`camera` 组件**、**`live-pusher` 组件**、**`wx.createVKSession`**。  
- 用户拒绝授权时：**不弹窗**，进入接口 **fail** / 组件 `binderror` 等路径；需兼容。  
- 引用：[授权 - scope 列表](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)。

**相关 API / 组件（工程须覆盖错误路径）**

| 符号 | 用途 |
|------|------|
| `wx.getSetting` / `wx.authorize` / `wx.openSetting` | 授权状态与引导去设置 |
| `camera` + `wx.createCameraContext` | 预览 / 拍照（若产品需要） |
| `wx.createVKSession` + `track.body` | 人体检测（与 `scope.camera` 同属授权表 **A**） |

**纪律**：权限说明文案、场景化话术 **不由本文档编写**；工程须留钩子展示 OP-隐私/OP-UX 交付内容。

### 2.7 工程闸门：何时可对用户 / 物料宣称 **P0（全功能人体引导）**

在同时满足前，**不得**对外宣称「全员实时人体指导」为 P0：

1. **文档门槛**：运行环境满足 **`track.body` 所需基础库（2.28.0+，**A**）** 且微信客户端满足所选 2D/3D 能力文档要求（3D 须 **8.1.0+** 指南陈述，**A**）。  
2. **实机矩阵**：OP 提供 **iOS + Android** 各至少 **N 台**（N 由统帅在验收表冻结，建议 ≥2 档低端）实测通过表：**授权成功 → 预览正常 → VK start 成功 → 稳定收到 `updateAnchors` 或符合产品定义的降级**。  
3. **降级可验收**：无 VK / 拒绝相机 / `start` 非 0 时，**非白屏、非静默失败**（对齐军令状成功标准）。  
4. **隐私一致**：实现与 **隐私文案包**、数据流说明一致（对照军令状 ③）。  

**P0 与「纯示意模式」关系**：允许 P0 **用户故事**在低端机走「示意模式」**仍算达标**，但须在对外说明中区分「实时人体」与「示意」——措辞由产品与 UX 定，工程提供技术标签供文案映射。

### 2.8 `decisions_log`

| ID | 决策 | 等级 | 依据 / 下一步 |
|----|------|------|----------------|
| D-MG-001 | 人体能力以 **`track.body` + Body 指南** 为主路径；3D 默认非必须 | **A/B** | API/指南 URL 已列 **A**；是否启用 3D **B** 待产品+实测 |
| D-MG-002 | **`camera` 与 VK 并存策略** 由 OP 按官方 Demo 验证后写实现说明 | **B** | 避免 MG 未实测即定栈 |
| D-MG-003 | **推荐基础库下限** 倾向 **≥2.28.0**（若启用 body） | **B** | 与 **A** 文档最低一致；是否提高待兼容性策略 |
| D-MG-004 | **性能数值** 不在 EP-0 冻结具体 FPS；改为 EP-3 由 OP 填实测表 | **B** | 统帅 R4 验收闭合 |
| D-MG-005 | **分包结构** 待代码树确定；原则主包瘦、拍摄能力可延迟加载 | **B** | |
| D-MG-006 | 未读发行说明前 **不** 将行为变更标为 **A** | **A** | 军令状 + 本仓库蜂群纪律 |

---

## 3. 《下级 Task 发包》— OP-小程序开发员

**致**：OP-小程序开发员（小程序与视觉工程部 · 末端）  
**执行阶段**：**EP-3**（依 SCHEDULE：依赖 **MG-端侧、OP-UX、OP-内容**）  
**首行锚点（OP 回复/Task 建议）**：`CHAIN=LEGION-POSE-COACH-001` `ROUND=<由统帅递增>` `ROLE=OP-小程序开发员` `PARENT_REF=MG-ENGINEERING-PLAN.md`

### 3.1 输入（I/O 对齐 SCHEDULE）

| 来源 | 交付物 | 状态 |
|------|--------|------|
| 军令状 | `MISSION-BRIEF.md` | **已有** |
| **MG-端侧** | **本文档**《端侧工程计划》+ `decisions_log` | **本文交付** |
| **OP-UX** | 《UX 与文案交付》（线框、文案表、状态机） | **EP-2 未到齐前为占位** |
| **OP-内容** | 《姿势素材包》（资源列表、命名、元数据） | **EP-0/1 后到齐** |
| **OP-隐私** | 《隐私与权限文案包》（弹窗/设置页/摘要） | **须经 UX 与小程序挂载** |
| 统帅 | I/O 路由表、Phase Gate 结论 | **随 EP 更新** |

### 3.2 输出（I/O 对齐 SCHEDULE）

| 产出 | 格式 | 消费者 |
|------|------|--------|
| 《小程序实现包》 | 源码树说明或仓库路径 + **实现说明** + `decisions_log` | 军团统帅；蜂群写码时遵守 `CLAUDE.md §二` |

### 3.3 工程任务书骨架（EP-3 前可并行准备部分）

1. **项目脚手架**  
   - 初始化小程序工程；配置 **eslint/构建**（若需要）；预留 **分包**目录。  

2. **权限与路由**  
   - 集成 **`scope.camera`** 流程：`getSetting` → `authorize` → 失败时 `openSetting` 引导；**文案占位符**来自 OP-隐私/OP-UX，禁止工程自拟对外合规文案终稿。  

3. **拍摄页技术骨架**  
   - 嵌入 **`camera`**；处理 `binderror` / `bindstop` / `bindinitdone`。  
   - 按文档评估 **`resolution` / `frame-size`** 与性能平衡（属性以 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 为准 **A**）。  

4. **VisionKit Body（能力路径）**  
   - `wx.createVKSession({ track: { body: { mode: 1 } }, ... })`（若与产品确认实时路径）；`start` 错误码处理；`updateAnchors` / `removeAnchors` 监听。  
   - 实现 **Level 0/1 降级** 与 **示意模式** 开关（与 UX 状态机对接）。  
   - 官方参考：[Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html)、Demo 链接见该页。  

5. **数据与隐私（工程实现）**  
   - 默认 **不上传** 相机原始帧；任何上传须 **显式同意** 与开关（军令状 **PENETRATING**）。  

6. **验收对齐（供统帅 R4 摘编）**  
   - 对照军令状 **成功标准** 三节写 **自测表**：授权、预览、引导至少一种、VK 失败降级、隐私与实现一致性。  

7. **decisions_log**  
   - OP 记录：基础库最终下限、是否启用 3D、分包切分、实测机型列表、已知不兼容机型。  

### 3.4 阻塞与上报

- **OP-UX / OP-内容 / OP-隐私未齐**：可完成 **脚手架 + 权限骨架 + camera 空页**；**不可**自定终版用户可见说明文字。  
- **文档与实机不一致**：上报统帅，触发 **R2 事实核对** 或调整 P0 宣称（见 2.7）。  

---

## 4. 引用索引（官方 URL · 便于统帅复核）

- [camera 组件](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)  
- [授权（含 scope.camera）](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)  
- [VisionKit 指南](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/base.html)  
- [wx.createVKSession](https://developers.weixin.qq.com/miniprogram/dev/api/ai/visionkit/wx.createVKSession.html)  
- [Body 检测](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/visionkit/body.html)  
- [原生组件使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)  

---

*本文档由 MG-端侧工程主管按军令状与 SCHEDULE 编制，供落盘与 EP-3 发包对账。*
