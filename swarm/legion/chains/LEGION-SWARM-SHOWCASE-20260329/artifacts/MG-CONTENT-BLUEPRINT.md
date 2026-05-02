# MG · 内容与交互架构蓝图（LEGION-SWARM-SHOWCASE-V2）

`CHAIN=LEGION-SHOWCASE-V2 ROUND=2 WAVE=1 ROLE=内容与交互架构师 DEPT=内容设计 LEVEL=L3 TIER=MG PARENT_REF=EX-创意战略总监-R1`

> **军令状穿透（只读）**：静态单 HTML；A/B/C 分级；**[PENETRATING]** 无 A 级来源不得将推断写成定论；简体中文。

---

## 文档一：HTML 内容蓝图（给 OP-1 视觉前端艺术家）

### 全局说明

- **配色语义**：Slate-950 底 / Cyan-400 系统强调 / Violet-400 架构强调 / Rose-400 R1 / Amber-400 R2 / Cyan-400 R3 / Violet-400 R4 / Emerald-400 OP 层
- **字体**：Inter（正文）+ JetBrains Mono（代号、代码）
- **A/B/C Badge**：`<span class="badge-a">A</span>` / `<span class="badge-b">B</span>` / `<span class="badge-c">C</span>`，分别用 Emerald / Amber / Slate 着色
- **动画**：所有 section 使用 IntersectionObserver → `fade-up` / `scale-in`；闸门节增加 `draw-line` 连线动画
- **Modal 触发**：`data-modal-key="xxx"` 属性，OP 按此键名注入内容

---

### Section 1 · Hero

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-hero` |
| **H2 标题** | （无 H2，用 H1）**蜂群 4+1 对抗体系与军团 L3 编排** |
| **副标题** | 以可审计的角色分工、时序闸门与三段式验收，支撑 AI Agent 协同——不虚构能力，行业对照仅为维度比较（B/C）。 |
| **Eyebrow** | `展陈 · 离线单页 · V2` |
| **CTA 1** | 文案：`探索四角色与蜂群`　链接：`#section-roles`　样式：实心 Cyan 按钮 |
| **CTA 2** | 文案：`A / B / C 与穿透提醒`　触发 Modal：`modal-abc`　样式：描边按钮 + 天平图标 |
| **背景** | 双色 glow（Cyan + Violet），渐变叠加 Slate-950 |
| **估计字数** | ~90 字 |

---

### Section 2 · 痛点

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-pain` |
| **H2 标题** | **多智能体协作的三重困境** |
| **副标题** | 热潮之下，松散的 Agent 对话常掉入三个陷阱——这正是蜂群与军团要回答的问题（C）。 |
| **卡片 1** | 图标：`fa-diagram-project` Rose-400 / 标题：**编排松散（Loose Orchestration）** / 描述：缺少固定角色与时序约束时，任务链容易漂变、中途丢失目标，事后几乎无法复盘因果。 |
| **卡片 2** | 图标：`fa-virus` Amber-400 / 标题：**幻觉传染（Hallucination Contagion）** / 描述：同一上下文内多角色口吻切换，上游推断被下游当作已验证事实引用，错误沿链放大。 |
| **卡片 3** | 图标：`fa-clipboard-question` Cyan-400 / 标题：**验收悬空（Ungrounded Acceptance）** / 描述：验收清单很漂亮，却没有人按表跑命令、对证据——「理论上应过」代替了实测。 |
| **导航链接** | `继续：体系总览 →`　链接：`#section-overview` |
| **估计字数** | ~180 字 |

---

### Section 3 · 体系总览

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-overview` |
| **H2 标题** | **双层嵌套：蜂群 L2 + 军团 L3** |
| **副标题** | 两层各有所长——蜂群管单条任务链内的对抗与验收闭环，军团管跨域多部门的发包与阶段闸门（C）。 |
| **描述段落** | 蜂群（Swarm，L2）以 R1–R4 四角色 + 统帅（+1）为一个编队，通过 Sub-agent 物理隔离和时序闸门，确保「先撕裂、再查实、再实现、再按表验收」的节奏不被打乱。军团（Legion，L3）在蜂群之上增加 EX（战略）/ MG（架构）/ OP（操作）三层级、DAG 任务依赖与 Phase Gate，面向跨领域、多交付物的大型任务链。 |
| **架构图说明** | 中心：一个双环同心图。**内环**标注「L2 蜂群」，包含 R1 / R2 / R3 / R4 四个节点与统帅 +1 中枢。**外环**标注「L3 军团」，包含 EX / MG / OP 三个节点与 Phase Gate 弧线。**连线**：OP → 内环（表示叶操作带蜂群小队）。 |
| **CTA** | 文案：`查看蜂群编队详解`　触发 Modal：`modal-swarm-overview` |
| **估计字数** | ~220 字 |

---

### Section 4 · 四角色

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-roles` |
| **H2 标题** | **四角色混沌对抗与日常降维** |
| **副标题** | 出题人、审计员、优化者、QA——四个视角互为对手，可收缩为日常开发中可重复的习惯（C）。 |

**角色卡 × 4**：

| 代号 | 角色名 | 别名（《07》） | 色系 | 职责描述 | Modal 按钮文案 |
|------|--------|---------------|------|----------|---------------|
| **R1** | 需求撕裂者 | Chaos Examiner · 出题人 | Rose | 专攻边缘场景（Edge Case）、矛盾需求、极限输入与安全性质询——职责是「让方案在上线前就暴露最坏情况」。 | `R1 职责与触发条件 →` |
| **R2** | 技术调研员 | External Auditor · 外部审计员 | Amber | 负责向外查证：官方文档、规范版本、CVE 通告与最佳实践——打破信息茧房，用可核验事实替代猜测。 | `R2 强制触发场景 →` |
| **R3** | 核心开发者 | System Optimizer · 体系优化者 | Cyan | 架构取舍、实现路径、代码级边界与回滚点——建设性地把需求变成可运行的方案。 | `R3 实现轨与统帅关系 →` |
| **R4** | 独立测试员 | QA Examiner · QA 检测者 | Violet | 从用户可感知行为出发的黑盒验收——用例、DoD、误操作与回归关注点，不读实现细节（默认）。 | `R4 黑盒纪律详解 →` |

**Modal 触发按钮（汇总）**：`查看四角色与统帅对照表`　触发 Modal：`modal-roles-map`

**估计字数** | ~280 字（含卡片）

---

### Section 5 · 物理隔离

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-isolation` |
| **H2 标题** | **蜂群物理隔离：不是同一模型换四张脸** |
| **副标题** | 非统帅角色经 Sub-agent（Task）承载、拥有独立上下文；子代理禁止互聊，一律经统帅总线中转（C）。 |
| **描述段落** | 物理隔离的核心在于：每个角色的推理过程互不可见，只有统帅能看到全貌。这杜绝了「角色 B 顺着角色 A 的结论往下走」的串台问题，也防止了测试员提前看到实现细节而丧失黑盒立场。 |
| **Hub 标签** | 中心大圆：`统帅 +1 · 总线汇流`（Cyan 描边发光） |
| **4 个泡标签** | 左上 `R1 泡 · 独立上下文` / 右上 `R2 泡 · 独立上下文` / 左下 `R3 泡 · 独立上下文` / 右下 `R4 泡 · 独立上下文` |
| **连线说明** | 泡 → Hub 虚线连接，标注「经统帅中转」 |
| **Modal 按钮** | 文案：`物理隔离与总线规则`　触发 Modal：`modal-isolation` |
| **估计字数** | ~200 字 |

---

### Section 6 · 时序闸门

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-gates` |
| **H2 标题** | **时序闸门：谁先谁后，不可商量** |
| **副标题** | 蜂群编队启动后，R1–R4 与统帅的执行顺序被三道闸门锁死——防止实现跑在事实前面（C）。 |

**4 个节点（水平时间轴）**：

| 步骤号 | 步骤名 | 简述 |
|--------|--------|------|
| ① | **R1 ∥ R2 并行关门** | 需求撕裂与事实调研可同时进行，但两者均需关门后方可推进。 |
| ② | **→ R3 实现轨启动** | R3 的输入必须包含 R1/R2 的摘要或落盘指针，禁止「裸启动」。 |
| ③ | **R4a ∥ R3 并行** | R4a 在闸门①满足后即可启动，但只读契约级输入，不依赖 R3 成果。 |
| ④ | **统帅实测 → R4b 关门** | R3 关门后统帅按 R4a 冻结表逐项跑命令；R4b 最后对照证据做事实核对。 |

**连线动画**：步骤间用 `draw-line` SVG 动画连接，①→② 实线，②③ 并行分叉线，③④ 汇聚线。

**Modal 按钮 1** | 文案：`时序闸门一图读懂`　触发 Modal：`modal-gates-detail` |
**Modal 按钮 2** | 文案：`写码回合最低触达`　触发 Modal：`modal-coding-round` |

**估计字数** | ~250 字 |

---

### Section 7 · R4 三段式

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-r4` |
| **H2 标题** | **R4 三段式验收：从清单到证据** |
| **副标题** | 把验收拆成「设计 → 执行 → 核对」三步，压缩「只写清单不跑通」的灰色地带（C）。 |

**3 张阶梯卡**：

| 阶段 | 标题 | 色系 | 描述 |
|------|------|------|------|
| **R4a** | 清单设计（Contract-Level） | Violet | 基于契约级输入（需求、冻结目标、环境矩阵）产出编号验收表 TC-xxx 与 P0/P1 优先级。默认黑盒——不读 R3 的实现细节。工程类 P0 必须落到「可执行命令 + 期望退出码 + 约定生成物」。 |
| **统帅实测** | 清单执行（Commander Runs） | Cyan | 仓库改动落地后，统帅亲自按 R4a 冻结表逐项执行——跑测试、起服务、检查日志与返回码。「理论上应通过」不能替代实测。 |
| **R4b** | 关门核对（Evidence Gate） | Slate | 在 R3 关门且可运行证据就绪后启动。对照 R4a 冻结表与统帅实测留痕，做事实核对与漏项指出。R4b 不替代统帅跑命令。 |

**裁决 Badge 说明**（卡片下方一行）：
- `PASS`（Emerald）：P0 全部实测通过
- `COND_PASS`（Amber）：P0 通过但有已文档化的剩余风险
- `FAIL`（Rose）：任一 P0 未过或关键契约被破坏

**估计字数** | ~280 字 |

---

### Section 8 · 军团 L3

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-legion` |
| **H2 标题** | **军团 L3：跨域协作的组织架构** |
| **副标题** | 当任务规模超出单条蜂群链的能力，军团用三层级 + DAG + Phase Gate 管理多部门并行交付（C）。 |

**3 张层级卡（纵向阶梯，越往下越具体）**：

| 层级 | 标题 | 色系 | 描述 |
|------|------|------|------|
| **EX** | 战略层 Executive | Cyan | 行业对标、叙事主线、差异化主张与 A/B/C 事实纪律。为整条军团链定调，不直接写代码。 |
| **MG** | 架构层 Manager | Violet | 信息架构、内容蓝图、交互设计与口播结构。把 EX 的战略翻译成可执行的任务拆分。 |
| **OP** | 操作层 Operator | Emerald | 叶操作落盘——本 HTML 与口播稿就是 OP 的交付物。每个 OP 角色自带一支 4+1 蜂群小队。 |

**补充说明**（卡片组下方）：
- **DAG**：任务之间可定义有向依赖（Directed Acyclic Graph），杜绝循环等待。
- **Phase Gate**：阶段闸门控制何时放行下一波次——上游未关门，下游不得启动。

**Modal 按钮** | 文案：`军团 EX · MG · OP 详解`　触发 Modal：`modal-legion-detail` |

**估计字数** | ~250 字 |

---

### Section 9 · 军令状

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-brief` |
| **H2 标题** | **军令状：需求冻结与穿透提醒** |
| **副标题** | 军令状是军团链的「宪法」——冻结原始需求、硬约束与验收口径，穿透节提醒哪些结论不能靠推断冒充（C）。 |

**5 个字段展示（横向卡片组或竖列）**：

| 序号 | 字段名 | 展示文案 |
|------|--------|----------|
| ① | **冻结目标句** | 一句话说清本链要交付什么——所有下游角色以此为锚，不得静默偏离。 |
| ② | **硬约束** | 不可违反的底线条件（技术栈、格式、安全、预算等），写码前就冻结。 |
| ③ | **非目标** | 显式声明「本链不做什么」——避免范围蔓延（Scope Creep）。 |
| ④ | **成功标准** | 可测量的验收口径，直接喂给 R4a 做 P0/P1 冻结表。 |
| ⑤ | **穿透节 [PENETRATING]** | 标记必须跨层级传递的硬事实——任何层级的子代理看到 `[PENETRATING]` 标签，都不得降级为建议。 |

**穿透节额外说明**（醒目提示框，Amber 边框）：
> 穿透节的核心约束：**无 A 级来源，不得把推断写成定论。** 市场份额、性能排名、未经核验的统计数字——一律不得在展陈或口播中以事实口吻出现。

**Modal 按钮** | 文案：`军令状五要素模板`　触发 Modal：`modal-brief-template` |

**估计字数** | ~300 字 |

---

### Section 10 · 行业对照

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-compare` |
| **H2 标题** | **与主流框架的同维度对照** |
| **副标题** | 对照固定四维度：编排模型、状态与人介入、测试与对抗、组织扩展——强调互补而非替代，不对抗拉踩（B/C）。 |

**完整对比表（4 行 × 5 列）**：

| 体系 | 编排模型 | 状态与人介入 | 测试与对抗 | 组织扩展 |
|------|----------|-------------|-----------|---------|
| **LangGraph** | 有向图/工作流式编排，条件分支与显式控制流较清晰（B） | 状态图、检查点（Checkpoint）等叙事常见于文档与教程（B） | 节点与边的可测性偏工程自建；内置对抗角色链因项目而异（C） | 扩展多呈「图变大、子图复用」；不等于本仓库军团编制（B） |
| **AutoGen** | 对话式多 Agent、层级委托与群组会商常见（B） | Human-in-the-loop 在多篇介绍中作为典型用法出现（B） | 分层测试、上线前校验多被描述为应用方流程责任（B） | 多 Agent 协作；不自动等价 EX/MG/OP 穿透（C） |
| **CrewAI** | 角色/班组（Crew）隐喻与任务链编排，组织化叙事突出（B） | 流程中可插入人工环节一类说法见于教程与案例（B） | 编排与角色分工为主；完整质效门禁通常依赖团队自建（B） | 班组扩展直观；与 DAG + 多部门 Gate 可对照但勿混同（C） |
| **蜂群 + 军团** | L2 蜂群 R1–R4 + 统帅，Task 物理隔离；L3 EX/MG/OP + DAG + Phase Gate（C） | CHAIN/冻结条/军令状协同；统帅承担汇流与 R4 清单执行门禁（C） | R4a 契约级黑盒 ∥ R3；统帅实测；R4b 证据关门；R1 专责边缘（C） | L3 跨域多部门发包；蜂群管单链闭环（C） |

**表注**（表格下方小字）：**A** = 可指回具体公开文档条款 / 可复现命令与输出；**B** = 综述、二手对比或社区归纳；**C** = 本仓库规则与技能内主张。本表不含市场份额、性能排名等量化断言。

**3 张外链卡**：

| 框架 | 图标 | 标题 | 描述 | URL |
|------|------|------|------|-----|
| LangGraph | `fa-book` | LangGraph 文档 | 官方文档入口 · 新标签打开 | `https://langchain-ai.github.io/langgraph/` |
| AutoGen | `fa-brands fa-microsoft` | AutoGen 文档 | 微软 AutoGen 项目文档 | `https://microsoft.github.io/autogen/` |
| CrewAI | `fa-users` | CrewAI 文档 | Crew 编排与教程入口 | `https://docs.crewai.com/` |

**估计字数** | ~400 字（含表格） |

---

### Section 11 · 收益

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-benefits` |
| **H2 标题** | **收益与适用边界** |
| **副标题** | 不是所有任务都需要满编蜂群——认清边界，才能把治理用在刀刃上（C）。 |

**"何时值得引入" 列表**（Emerald 面板）：
1. **高风险改动**——安全策略、持久化、密钥轮换、规则语义变更等需要威胁面与事实链的场景
2. **写码回合**——需要明确的 R3 + R4a + R4b 验收门禁，而不只是「看着没问题就合入」
3. **多角色分工**——必须物理隔离而非口吻扮演，以避免幻觉传染与顺向测试
4. **跨域交付**——军团 L3 面向多部门、多交付物的大型任务链编排

**"何时保持轻量" 列表**（Slate 面板）：
1. **小任务、一次性问答**——一个统帅即可闭环，不必强行上四角色
2. **纯文档或注释修改**——不改行为语义时，用户可明示「免 R3R4」跳过门禁
3. **探索性对话**——尚未明确要改什么时，先用统帅总线理清方向

**数字墙（4 个关键数字）**：

| 数字 | 标签 | 备注 |
|------|------|------|
| **4+1** | 蜂群角色数 | R1–R4 + 统帅 |
| **3** | 时序闸门数 | 控制 R1/R2 → R3 → R4b 的执行序 |
| **3** | R4 验收段数 | R4a · 统帅实测 · R4b |
| **3** | 军团层级数 | EX · MG · OP |

**估计字数** | ~300 字 |

---

### Section 12 · 使用场景

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-scenarios` |
| **H2 标题** | **实战场景速览** |
| **副标题** | 三种典型编队形态——从最小充分到满编军团，按任务复杂度选择合适的治理粒度（C）。 |

**3 个 Tab**：

**Tab 1 · 满编蜂群**

| 字段 | 内容 |
|------|------|
| 标题 | **满编蜂群（Full Swarm）** |
| 描述 | 用户明示「满编蜂群」口令时，R1、R2、R3、R4a、R4b 各至少一次 Task。适用于高风险写码回合、规则语义变更等场景。时序闸门全程约束，统帅实测不可省略。 |
| 标签 | `R1` `R2` `R3` `R4a` `R4b` `5 段 Task` |

**Tab 2 · 最小充分**

| 字段 | 内容 |
|------|------|
| 标题 | **最小充分角色集（Minimal Sufficient）** |
| 描述 | 统帅按任务复杂度裁量，仅触达必要角色。例如低风险写码可能只需 R3 + R4a + R4b；纯调研可能只需 R2 + 统帅汇流。避免无差别满编造成浪费。 |
| 标签 | `按需触达` `统帅裁量` `成本控制` |

**Tab 3 · 军团 L3**

| 字段 | 内容 |
|------|------|
| 标题 | **军团编排（Legion L3）** |
| 描述 | 跨域多部门任务链：EX 定调、MG 拆分、OP 落盘，Phase Gate 控制阶段放行。每个叶 OP 自带蜂群小队执行。适用于多交付物、长周期、需要组织架构的项目。 |
| 标签 | `EX` `MG` `OP` `DAG` `Phase Gate` |

**Modal 按钮** | 文案：`更多场景与口令速查`　触发 Modal：`modal-scenarios` |

**估计字数** | ~300 字 |

---

### Section 13 · 参考与免责

| 字段 | 内容 |
|------|------|
| **Section ID** | `section-references` |
| **H2 标题** | **参考、交付物与免责** |
| **副标题** | 本页为静态单文件展陈，不修改规则文件语义，不上线后端，不展示密钥或隐私样例。 |

**交付物路径**（卡片 1）：
- `docs/hajimidog-swarm-legion-showcase.html`（本页）
- `docs/hajimidog-swarm-legion-narration.md`（口播稿）

**仓库索引**（卡片 2）：
- 规则入口：`CLAUDE.md §二`
- 技能索引：`.claude/skills/hajimi-dog/00_全局索引/SKILL.md`
- 军团规则：`CLAUDE.md §三`

**免责文字**（页面底部小字，slate-500）：
> 免责：行业对比为维度说明，框架能力以各自官方文档为准。本展陈不修改 `.mdc` 语义，不承诺与任何商业框架的官方关系。与 LangGraph、AutoGen、CrewAI 的对照基于公开综述与社区归纳（B），不构成评级或推荐。若在组织内推广，建议结合自身工具链与合规要求裁剪流程。

**估计字数** | ~200 字 |

---

### 所有 Modal 内容（≥7 个）

---

#### Modal 1 · `modal-abc`

| 字段 | 内容 |
|------|------|
| **key** | `modal-abc` |
| **title** | A / B / C 事实分级与穿透提醒 |
| **content** | 见下方 HTML |

```html
<ul class="space-y-3">
  <li><strong class="text-emerald-300">A（可验证）</strong>：附带可复核证据——官方文档 URL 与条款、规范名与版本、终端命令 + 退出码 + 关键输出摘要、仓库路径 + 行号、已执行且编号的 TC、CI 任务名 + 通过事实。</li>
  <li><strong class="text-amber-300">B（待核实）</strong>：逻辑自洽或内部一致，但尚未对外文档或实测复核——综述、二手对比或社区归纳。</li>
  <li><strong class="text-slate-300">C（观点）</strong>：偏好、经验法则、本仓库规则与技能内的主张——不可写进「已拍板」主结论。</li>
</ul>
<div class="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
  <p class="text-amber-100/90 font-semibold">[PENETRATING] 穿透提醒</p>
  <p class="mt-2 text-amber-100/70">无 A 级来源时，不得把市场份额、性能排名、未经核验的统计数字写成已证实事实。展陈与口播均遵守此纪律。</p>
</div>
<p class="mt-4 text-slate-500 text-xs">定义对齐：<code>CLAUDE.md §二</code>「子代理结论可验证分级」章节。</p>
```

---

#### Modal 2 · `modal-roles-map`

| 字段 | 内容 |
|------|------|
| **key** | `modal-roles-map` |
| **title** | 四角色与统帅对照表 |
| **content** | 见下方 HTML |

```html
<p class="text-slate-400 mb-4">《07》别名与本仓库 R1–R4 映射（C）：</p>
<div class="overflow-x-auto">
  <table class="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
    <thead>
      <tr class="bg-white/5 text-slate-400">
        <th class="p-3 text-left">《07》别名</th>
        <th class="p-3 text-left">代号</th>
        <th class="p-3 text-left">角色名</th>
        <th class="p-3 text-left">核心职责</th>
      </tr>
    </thead>
    <tbody class="text-slate-300">
      <tr class="border-t border-white/10">
        <td class="p-3">出题人 Chaos Examiner</td>
        <td class="p-3 font-mono text-rose-300">R1</td>
        <td class="p-3">需求撕裂者</td>
        <td class="p-3">边缘场景、矛盾需求、极限输入与安全质询</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="p-3">外部审计员 External Auditor</td>
        <td class="p-3 font-mono text-amber-300">R2</td>
        <td class="p-3">技术调研员</td>
        <td class="p-3">官方文档核对、外部最佳实践、打破信息茧房</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="p-3">体系优化者 System Optimizer</td>
        <td class="p-3 font-mono text-cyan-300">R3</td>
        <td class="p-3">核心开发者</td>
        <td class="p-3">架构与实现方案、代码级边界、回滚点</td>
      </tr>
      <tr class="border-t border-white/10">
        <td class="p-3">QA 检测者 QA Examiner</td>
        <td class="p-3 font-mono text-violet-300">R4</td>
        <td class="p-3">独立测试员</td>
        <td class="p-3">黑盒验收、用例、DoD、误操作与回归</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
  <p class="text-cyan-300 font-semibold">统帅（+1）</p>
  <p class="mt-1 text-slate-400">不在四角色表内。负责总线：解析 → 分发 → 汇流 → 续聊状态。写码回合配合 diff + test、R4 清单实测门禁与 PASS/COND_PASS/FAIL 裁决。默认不在主对话做主体大篇幅写码（统帅实现轨外置）。</p>
</div>
```

---

#### Modal 3 · `modal-swarm-overview`

| 字段 | 内容 |
|------|------|
| **key** | `modal-swarm-overview` |
| **title** | 蜂群 L2 编队详解 |
| **content** | 见下方 HTML |

```html
<div class="space-y-4">
  <div>
    <h3 class="text-white font-semibold">编队组成</h3>
    <p class="mt-1 text-slate-400">一支蜂群编队 = R1（撕裂）+ R2（调研）+ R3（开发）+ R4（测试）+ 统帅（+1，总线）。非统帅角色经 Sub-agent（Task）承载，彼此上下文隔离。</p>
  </div>
  <div>
    <h3 class="text-white font-semibold">编队启动条件</h3>
    <ul class="mt-1 text-slate-400 list-disc list-inside space-y-1">
      <li>用户显式多视角分责（如「蜂群」「满编蜂群」「按 R1/R2/R3/R4」）</li>
      <li>写码回合（对仓库做实质性编辑）</li>
      <li>R2 强制触发命中（低置信、需可核验来源、连续碰壁等）</li>
      <li>高风险回合（安全策略、密钥、不可逆操作等）</li>
    </ul>
  </div>
  <div>
    <h3 class="text-white font-semibold">最小充分 vs 满编</h3>
    <p class="mt-1 text-slate-400">非所有对话都需满编五段 Task。统帅按任务复杂度裁量最小充分角色集——但写码回合至少须 R3 + R4a + R4b。</p>
  </div>
</div>
<p class="mt-4 text-slate-500 text-xs">详见 <code>CLAUDE.md §二</code>「蜂群编队启动与时序闸门」。</p>
```

---

#### Modal 4 · `modal-isolation`

| 字段 | 内容 |
|------|------|
| **key** | `modal-isolation` |
| **title** | 物理隔离与总线规则 |
| **content** | 见下方 HTML |

```html
<ul class="list-disc list-inside space-y-3 text-slate-300">
  <li>非统帅角色由 <strong class="text-white">Sub-agent（Task）</strong>承载，各自拥有独立上下文窗口。</li>
  <li>子代理之间<strong class="text-white">禁止直接对话</strong>——一律经统帅中转，防止串台与顺向测试。</li>
  <li>统帅职责链：<strong class="text-cyan-300">解析 → 分发 → 汇流 → 续聊状态</strong>。</li>
  <li>统帅向子代理下发的是<strong class="text-white">最小充分信息</strong>，而非完整聊天历史。</li>
  <li>子代理无法订阅主帅的 Shell 输出——若后续 Task 依赖前轮结果，统帅须在 Task 正文中粘贴摘要或给出落盘路径。</li>
</ul>
<div class="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
  <p class="text-rose-300 font-semibold">禁止</p>
  <p class="mt-1 text-slate-400">在主对话中由同一助手通过换口吻、分段扮演等方式替代 Sub-agent——这不构成物理隔离（C）。</p>
</div>
```

---

#### Modal 5 · `modal-gates-detail`

| 字段 | 内容 |
|------|------|
| **key** | `modal-gates-detail` |
| **title** | 时序闸门一图读懂 |
| **content** | 见下方 HTML |

```html
<ol class="list-decimal list-inside space-y-4 text-slate-300">
  <li>
    <strong class="text-white">闸门 1 · R1+R2 关门 → R3</strong>
    <p class="mt-1 text-slate-400 ml-5">R1 与 R2 可并行派发，但两者均需返回后方可启动 R3。R1 关门 = 产出经统帅汇流为可指针化摘要；R2 关门 = Task 已返回，或统帅已给出「本轮不需要 R2」的边界说明。</p>
  </li>
  <li>
    <strong class="text-white">闸门 2 · R3 最小输入</strong>
    <p class="mt-1 text-slate-400 ml-5">R3 Task 正文必须包含 R1→R3 与 R2→R3 的条目化摘要或落盘指针——禁止「裸启动」。</p>
  </li>
  <li>
    <strong class="text-white">闸门 3 · R4a ∥ R3 → 统帅实测 → R4b</strong>
    <p class="mt-1 text-slate-400 ml-5">R4a 在闸门 1 满足后可与 R3 并行，但仅基于契约级输入产出验收表——不依赖 R3 成果。R4b 仅在 R3 关门且统帅已整理可运行证据后启动。</p>
  </li>
</ol>
<p class="mt-4 text-slate-500 text-xs">写码回合最低触达（R3+R4a+R4b）与豁免口令见 <code>.mdc</code>「写码回合最低触达」。</p>
```

---

#### Modal 6 · `modal-coding-round`

| 字段 | 内容 |
|------|------|
| **key** | `modal-coding-round` |
| **title** | 写码回合最低触达 |
| **content** | 见下方 HTML |

```html
<div class="space-y-4">
  <div>
    <h3 class="text-white font-semibold">触发条件</h3>
    <p class="mt-1 text-slate-400">任务链即将或正在对仓库做实质性写码落地：增删改源码、构建配置、CI 工作流、影响运行的脚本、Cursor 规则等。</p>
  </div>
  <div>
    <h3 class="text-white font-semibold">最低要求（3 次 Task）</h3>
    <ul class="mt-1 text-slate-400 list-disc list-inside space-y-1">
      <li><strong class="text-cyan-300">R3</strong>：实现边界、架构取舍、与现有代码一致性、技术债与回滚点</li>
      <li><strong class="text-violet-300">R4a</strong>：冻结验收表 TC-xxx、DoD、P0/P1、误操作与回归</li>
      <li><strong class="text-slate-200">R4b</strong>：R3 关门后，对照 R4a 与证据做事实核对</li>
    </ul>
  </div>
  <div>
    <h3 class="text-white font-semibold">豁免</h3>
    <p class="mt-1 text-slate-400">用户在当轮消息中明示「免子代理 / 跳过 R3R4 / 不写蜂群」等同类意思时可豁免。统帅须一句说明已跳过。</p>
  </div>
</div>
```

---

#### Modal 7 · `modal-legion-detail`

| 字段 | 内容 |
|------|------|
| **key** | `modal-legion-detail` |
| **title** | 军团 EX · MG · OP 详解 |
| **content** | 见下方 HTML |

```html
<div class="space-y-4">
  <div class="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
    <strong class="text-cyan-300">EX · 战略层 Executive</strong>
    <p class="mt-1 text-slate-400">行业对标、四列维度表、叙事主线与差异化主张。定调「做什么、为什么、怎么说」，A/B/C 标注贯穿。不直接接触代码或交付物实现。</p>
  </div>
  <div class="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
    <strong class="text-violet-300">MG · 架构层 Manager</strong>
    <p class="mt-1 text-slate-400">信息架构师与主编排者——拆分 Section、设计 Modal、规划口播结构、协调无障碍与响应式。把 EX 的战略翻译成可执行的任务蓝图。</p>
  </div>
  <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
    <strong class="text-emerald-300">OP · 操作层 Operator</strong>
    <p class="mt-1 text-slate-400">叶操作落盘者——写 HTML、写口播稿、调动画、跑验收。每个 OP 角色自带一支 4+1 蜂群小队（R1–R4 + 统帅）执行。</p>
  </div>
</div>
<div class="mt-4 space-y-2 text-slate-400">
  <p><strong class="text-white">DAG（有向无环图）</strong>：任务之间可定义有向依赖——OP-1 的交付物可以是 OP-2 的输入，但不允许循环等待。</p>
  <p><strong class="text-white">Phase Gate</strong>：阶段闸门——上游 Wave 未关门，下游 Wave 不得启动。确保信息单向流动，防止基于过时假设的并行。</p>
  <p><strong class="text-white">军令状</strong>：军团链的「宪法」——冻结目标、硬约束、非目标、成功标准与穿透节，全链只读传递。</p>
</div>
<p class="mt-4 text-slate-500 text-xs">定义对齐：<code>CLAUDE.md §三</code> 与技能 18/19/20。</p>
```

---

#### Modal 8 · `modal-brief-template`

| 字段 | 内容 |
|------|------|
| **key** | `modal-brief-template` |
| **title** | 军令状五要素模板 |
| **content** | 见下方 HTML |

```html
<div class="space-y-3">
  <div class="rounded-lg border border-white/10 bg-white/5 p-3">
    <span class="text-cyan-400 font-mono">①</span> <strong class="text-white">冻结目标句</strong>
    <p class="mt-1 text-slate-400 text-sm">一句话概括本链交付什么。所有下游角色以此为锚，不得静默偏离。</p>
    <p class="mt-1 text-slate-500 text-xs italic">示例：为 HajimiDog 蜂群与军团体系输出一份静态 HTML 展陈单页 + 配套口播稿。</p>
  </div>
  <div class="rounded-lg border border-white/10 bg-white/5 p-3">
    <span class="text-cyan-400 font-mono">②</span> <strong class="text-white">硬约束</strong>
    <p class="mt-1 text-slate-400 text-sm">不可违反的底线：技术栈、格式、安全策略、预算等。</p>
    <p class="mt-1 text-slate-500 text-xs italic">示例：静态单 HTML；A/B/C 分级；[PENETRATING] 无 A 级来源不得将推断写成定论。</p>
  </div>
  <div class="rounded-lg border border-white/10 bg-white/5 p-3">
    <span class="text-cyan-400 font-mono">③</span> <strong class="text-white">非目标</strong>
    <p class="mt-1 text-slate-400 text-sm">显式声明本链不做什么——防止范围蔓延。</p>
    <p class="mt-1 text-slate-500 text-xs italic">示例：不修改 .mdc 语义；不虚构 API；不上线后端。</p>
  </div>
  <div class="rounded-lg border border-white/10 bg-white/5 p-3">
    <span class="text-cyan-400 font-mono">④</span> <strong class="text-white">成功标准</strong>
    <p class="mt-1 text-slate-400 text-sm">可测量的验收口径，直接喂给 R4a 做 P0/P1 冻结表。</p>
    <p class="mt-1 text-slate-500 text-xs italic">示例：≥12 section；模态框≥4；口播 8-12 分钟；响应式；无障碍。</p>
  </div>
  <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
    <span class="text-amber-400 font-mono">⑤</span> <strong class="text-amber-200">穿透节 [PENETRATING]</strong>
    <p class="mt-1 text-slate-400 text-sm">必须跨层级传递的硬事实——子代理看到此标签不得降级为建议。</p>
    <p class="mt-1 text-slate-500 text-xs italic">示例：[PENETRATING] 无 A 级来源不得将推断写成定论；简体中文。</p>
  </div>
</div>
```

---

#### Modal 9 · `modal-scenarios`

| 字段 | 内容 |
|------|------|
| **key** | `modal-scenarios` |
| **title** | 更多场景与口令速查 |
| **content** | 见下方 HTML |

```html
<div class="space-y-4">
  <div>
    <h3 class="text-white font-semibold">常用口令</h3>
    <div class="mt-2 overflow-x-auto">
      <table class="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-white/5 text-slate-400">
            <th class="p-2 text-left">口令</th>
            <th class="p-2 text-left">效果</th>
          </tr>
        </thead>
        <tbody class="text-slate-300">
          <tr class="border-t border-white/10"><td class="p-2 font-mono text-cyan-300">满编蜂群</td><td class="p-2">R1/R2/R3/R4a/R4b 各至少一次 Task</td></tr>
          <tr class="border-t border-white/10"><td class="p-2 font-mono text-cyan-300">免 R3R4</td><td class="p-2">跳过写码回合门禁（统帅一句声明）</td></tr>
          <tr class="border-t border-white/10"><td class="p-2 font-mono text-cyan-300">统帅可落地代码</td><td class="p-2">允许主帅在主对话直接改仓</td></tr>
          <tr class="border-t border-white/10"><td class="p-2 font-mono text-cyan-300">退出蜂群</td><td class="p-2">结束 4+1 模式，回归单角色</td></tr>
          <tr class="border-t border-white/10"><td class="p-2 font-mono text-cyan-300">记忆接力</td><td class="p-2">主帅按约定顺序 Read 落盘文件恢复上下文</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
    <h3 class="text-white font-semibold">场景适配建议</h3>
    <ul class="mt-2 text-slate-400 list-disc list-inside space-y-1">
      <li><strong class="text-white">安全策略变更</strong>：推荐满编蜂群 + 高风险加码</li>
      <li><strong class="text-white">日常功能开发</strong>：最小充分（R3 + R4a + R4b）</li>
      <li><strong class="text-white">多团队交付</strong>：军团 L3 + 叶 OP 蜂群</li>
      <li><strong class="text-white">纯调研</strong>：R2 + 统帅汇流</li>
      <li><strong class="text-white">文档修改</strong>：用户可明示「免 R3R4」</li>
    </ul>
  </div>
</div>
```

---

### Section ID 与 Modal Key 汇总表

| Section ID | Modal Key(s) | 触发按钮文案 |
|------------|-------------|-------------|
| `section-hero` | `modal-abc` | A / B / C 与穿透提醒 |
| `section-pain` | — | — |
| `section-overview` | `modal-swarm-overview` | 查看蜂群编队详解 |
| `section-roles` | `modal-roles-map` | 查看四角色与统帅对照表 |
| `section-isolation` | `modal-isolation` | 物理隔离与总线规则 |
| `section-gates` | `modal-gates-detail`, `modal-coding-round` | 时序闸门一图读懂 / 写码回合最低触达 |
| `section-r4` | — (内容自洽，可选追加) | — |
| `section-legion` | `modal-legion-detail` | 军团 EX · MG · OP 详解 |
| `section-brief` | `modal-brief-template` | 军令状五要素模板 |
| `section-compare` | — (外链卡自成体系) | — |
| `section-benefits` | `modal-abc`（复用） | 打开穿透提醒 Modal |
| `section-scenarios` | `modal-scenarios` | 更多场景与口令速查 |
| `section-references` | — | — |

**Modal 总数 = 9 个**（≥7 达标），其中 `modal-abc` 被 Hero 与 Benefits 复用。

---

## 文档二：口播大纲（给 OP-2 口播文案创作师）

### 全局参数

- **总时长目标**：480–720 秒（8–12 分钟）
- **语言**：简体中文，技术词首次出现附英文
- **事实纪律**：遵循 A/B/C 与 [PENETRATING]
- **口吻基调**：专业平稳、不煽情、有节奏感；像一位资深架构师在做内部分享

---

### 段落 1 · Hero / 开场

| 字段 | 内容 |
|------|------|
| **段落主题** | 引子——从多智能体热潮到「为什么需要可审计编排」 |
| **目标时长** | 45–60 秒 |
| **关键词** | 多智能体、编排、可审计、蜂群、军团 |
| **核心信息** | ①多智能体协作正在爆发，但落地时常遇到「编排松散、幻觉传染、验收悬空」三类痛点。②HajimiDog 的蜂群与军团体系尝试用规则化分工与可复核门禁回应这些问题。③本次分享将完整走一遍思路，从四角色到军团，再到行业对照与适用边界。 |
| **语气指导** | 引起共鸣，点出痛点；建立「这不是空谈，有具体规则可审计」的预期 |

---

### 段落 2 · 痛点

| 字段 | 内容 |
|------|------|
| **段落主题** | 三重困境的具体画面 |
| **目标时长** | 40–50 秒 |
| **关键词** | 编排松散、幻觉传染、验收悬空、目标漂移 |
| **核心信息** | ①编排松散：没有固定角色和时序，任务链说漂就漂。②幻觉传染：同一上下文切换口吻，推断被当事实引用。③验收悬空：清单很漂亮，没人按表跑命令。每一种痛点都不是假设——在真实工程里反复出现。 |
| **语气指导** | 具体、生动，让听众产生「确实遇到过」的共鸣 |

---

### 段落 3 · 体系总览

| 字段 | 内容 |
|------|------|
| **段落主题** | 双层嵌套的全景——L2 蜂群与 L3 军团各管什么 |
| **目标时长** | 45–60 秒 |
| **关键词** | L2 蜂群、L3 军团、双层嵌套、分层治理 |
| **核心信息** | ①蜂群（L2）管单条任务链内的对抗与验收闭环——R1 到 R4 加统帅组成一个编队。②军团（L3）在蜂群之上增加 EX/MG/OP 三层级与 Phase Gate，面向跨域多部门任务。③两层各有所长，不是「军团替代蜂群」——而是嵌套。 |
| **语气指导** | 全景式俯瞰，建立结构感；节奏稍慢，让听众先「看到全貌」 |

---

### 段落 4 · 四角色

| 字段 | 内容 |
|------|------|
| **段落主题** | R1–R4 与统帅的角色分工及日常降维 |
| **目标时长** | 50–65 秒 |
| **关键词** | R1 出题人、R2 审计员、R3 优化者、R4 QA、统帅 |
| **核心信息** | ①四角色分别映射到《07》别名：出题人、外部审计员、体系优化者、QA 检测者。②各自视角：R1 找最坏情况、R2 查外部事实、R3 落地方案、R4 黑盒验收。③日常降维：不必每次满编，但「先想清怎么失败、再查实、再实现、再按表验收」可以成为可重复的习惯。 |
| **语气指导** | 专业讲解，用别名帮助记忆；强调「降维到日常」的实用性 |

---

### 段落 5 · 物理隔离

| 字段 | 内容 |
|------|------|
| **段落主题** | 为什么不能「一个模型换四张脸」 |
| **目标时长** | 45–55 秒 |
| **关键词** | 物理隔离、Sub-agent、独立上下文、统帅总线 |
| **核心信息** | ①蜂群的关键不是名字好听，而是物理隔离——非统帅角色经 Sub-agent 承载、上下文互不可见。②子代理禁止直接对话，一律经统帅中转，杜绝串台与顺向测试。③可以想象为一颗主脑加多个互不可见的协作泡。 |
| **语气指导** | 类比生动化（主脑 + 泡），但保持技术准确 |

---

### 段落 6 · 时序闸门

| 字段 | 内容 |
|------|------|
| **段落主题** | 三道闸门锁定执行顺序 |
| **目标时长** | 50–65 秒 |
| **关键词** | 时序闸门、R1R2 关门、R3 启动、R4a 并行、R4b 证据关门 |
| **核心信息** | ①闸门 1：R1 和 R2 关门后才能进入 R3——防止实现跑在事实前面。②闸门 2：R3 输入必须包含 R1/R2 摘要。③闸门 3：R4a 可与 R3 并行但只读契约，R4b 在 R3 关门且证据齐备后才启动。 |
| **语气指导** | 有节奏感，像在描述流水线的门禁——清晰、不急 |

---

### 段落 7 · R4 三段式

| 字段 | 内容 |
|------|------|
| **段落主题** | 验收从清单到证据的三步闭环 |
| **目标时长** | 50–60 秒 |
| **关键词** | R4a 清单设计、统帅实测、R4b 关门核对、PASS/FAIL |
| **核心信息** | ①R4a 基于契约写验收表（TC-xxx），标注 P0/P1，默认黑盒不读实现。②统帅亲自按表跑命令，禁止「理论上应通过」。③R4b 在证据齐备后对照清单做事实核对——不替代统帅执行。裁决：PASS / COND_PASS / FAIL。 |
| **语气指导** | 强调「跑通才算数」的实操精神 |

---

### 段落 8 · 军团 L3

| 字段 | 内容 |
|------|------|
| **段落主题** | 跨域协作的三层级与阶段闸门 |
| **目标时长** | 50–60 秒 |
| **关键词** | EX 战略、MG 架构、OP 操作、DAG、Phase Gate |
| **核心信息** | ①军团在蜂群之上解决跨域多部门问题。②EX 定调、MG 翻译为可执行蓝图、OP 落盘——每个 OP 自带蜂群小队。③DAG 定义任务依赖，Phase Gate 控制阶段放行——上游未关门，下游不得启动。 |
| **语气指导** | 专业权威，用「本展陈本身就是军团的产物」来让概念落地 |

---

### 段落 9 · 军令状

| 字段 | 内容 |
|------|------|
| **段落主题** | 军令状——军团的「宪法」 |
| **目标时长** | 40–50 秒 |
| **关键词** | 冻结目标句、硬约束、非目标、成功标准、穿透节 |
| **核心信息** | ①军令状冻结五个要素：目标、硬约束、非目标、成功标准与穿透节。②穿透节标记必须跨层传递的硬事实——子代理看到 [PENETRATING] 不得降级为建议。③军令状全链只读，防止下游静默篡改上游契约。 |
| **语气指导** | 严肃、权威，传达「冻结即纪律」的感觉 |

---

### 段落 10 · 行业对照

| 字段 | 内容 |
|------|------|
| **段落主题** | 与 LangGraph / AutoGen / CrewAI 的四维度对照 |
| **目标时长** | 55–70 秒 |
| **关键词** | LangGraph、AutoGen、CrewAI、互补、B/C 标注 |
| **核心信息** | ①固定四维度对照：编排模型、状态与人介入、测试与对抗、组织扩展。②各框架一句话定位：LangGraph 侧重有向图编排，AutoGen 侧重对话式多 Agent，CrewAI 侧重角色班组。③本体系与上述框架是互补对照，不是替代，更不暗示官方合作。对照中的 B/C 标记是信息可信度分级，不是排名。 |
| **语气指导** | 客观、尊重同行；刻意「不拉踩」 |

---

### 段落 11 · 收益

| 字段 | 内容 |
|------|------|
| **段落主题** | 何时值得引入，何时保持轻量 |
| **目标时长** | 40–50 秒 |
| **关键词** | 高风险、写码回合、满编蜂群、最小充分、过度工程化 |
| **核心信息** | ①值得引入：高风险改动、写码需验收门禁、多角色需真隔离。②保持轻量：小任务一次闭环、纯文档改动、探索性对话。③核心原则：认清边界，把治理用在刀刃上，不为了治理而治理。 |
| **语气指导** | 平衡、务实，传达「我们不鼓励过度使用」 |

---

### 段落 12 · 使用场景

| 字段 | 内容 |
|------|------|
| **段落主题** | 三种典型编队形态速览 |
| **目标时长** | 40–50 秒 |
| **关键词** | 满编蜂群、最小充分、军团 L3、口令速查 |
| **核心信息** | ①满编蜂群：五段 Task，适用于高风险写码。②最小充分：统帅裁量只触达必要角色，控制成本。③军团 L3：跨域多交付物时启用 EX/MG/OP + Phase Gate。用户可以用固定口令触发或豁免。 |
| **语气指导** | 实用速查，让听众「知道怎么选」 |

---

### 段落 13 · 参考与收尾

| 字段 | 内容 |
|------|------|
| **段落主题** | 交付物、免责与引导行动 |
| **目标时长** | 35–45 秒 |
| **关键词** | 静态 HTML、口播稿、免责、A/B/C、下一步 |
| **核心信息** | ①交付物：单文件 HTML + 口播稿 Markdown。②外链指向公开文档，不表示官方合作。③事实纪律贯穿全篇——A/B/C 与穿透提醒请在转述时保留分级。④建议结合自身工具链裁剪流程。感谢收听。 |
| **语气指导** | 收束总结，平稳结尾；留下「可信赖」的印象 |

---

### 口播时长汇总

| 段落 | 主题 | 时长（秒） |
|------|------|-----------|
| 1 | Hero / 开场 | 45–60 |
| 2 | 痛点 | 40–50 |
| 3 | 体系总览 | 45–60 |
| 4 | 四角色 | 50–65 |
| 5 | 物理隔离 | 45–55 |
| 6 | 时序闸门 | 50–65 |
| 7 | R4 三段式 | 50–60 |
| 8 | 军团 L3 | 50–60 |
| 9 | 军令状 | 40–50 |
| 10 | 行业对照 | 55–70 |
| 11 | 收益 | 40–50 |
| 12 | 使用场景 | 40–50 |
| 13 | 参考与收尾 | 35–45 |
| **合计** | | **585–740 秒 ≈ 9:45–12:20** |

> 最小值 585 秒（9 分 45 秒），最大值 740 秒（12 分 20 秒），命中目标区间 8–12 分钟。OP-2 可在稿件层面微调各段节奏以精确控制总时长。

---

## decisions_log

| 类型 | 决策内容 |
|------|----------|
| **已决策** | Section 从 8 个扩充到 13 个，新增：`section-overview`（体系总览）、`section-r4`（R4 三段式）、`section-brief`（军令状）、`section-scenarios`（使用场景），`section-pain` 替代原 `section-hook` |
| **已决策** | Modal 从 6 个扩充到 9 个，新增：`modal-swarm-overview`、`modal-coding-round`、`modal-brief-template`、`modal-scenarios`；`modal-abc` 复用于 Hero 和 Benefits |
| **已决策** | 对比表维持 EX-STRATEGY 原始 4×5 结构与 A/B/C 标注，不增减列或行；表注保留 |
| **已决策** | 口播从 7 段扩充到 13 段，与 HTML section 一一对齐；总时长 585–740 秒命中 8–12 分钟目标 |
| **已决策** | R4 三段式单独成 section（从原闸门 section 中拆出），增强验收闭环的展示力度 |
| **已决策** | 军令状单独成 section（从原军团 section 中拆出），便于深度展示五要素与穿透节 |
| **已决策** | 使用场景 section 采用 Tab 切换（满编蜂群 / 最小充分 / 军团 L3），含口令速查 Modal |
| **已决策** | 文案风格：专业不枯燥，技术词首次出现附英文，每 section ≤400 字 |
| **已决策** | 所有行业主张均标注 A/B/C，对齐 EX 策略与 [PENETRATING] |
| **排除** | 不在展陈或口播中写入市场份额、性能排名、未经核验的统计数字（无 A 级来源） |
| **排除** | 不虚构 API、不展示密钥或隐私、不暗示与商业框架的官方合作 |
| **排除** | 不修改 `.mdc` 规则语义；HTML 保持静态单文件、无后端 |
| **排除** | 不在对比表中增加未在 EX-STRATEGY 中审核过的新框架行 |
| **排除** | 不将 R4 三段式的内容与时序闸门合并——两者各有侧重，合并会模糊验收闭环的独立叙事 |

---

*产出角色：内容与交互架构师（MG）· CHAIN=LEGION-SHOWCASE-V2 ROUND=2 WAVE=1*
