# MG · 信息架构与展陈主编（LEGION-SWARM-SHOWCASE-20260329）

`CHAIN=LEGION-SWARM-SHOWCASE-20260329 ROUND=2 WAVE=1 ROLE=信息架构与展陈主编 DEPT=展陈中台 LEVEL=L3 TIER=MG PARENT_REF=EX-战略与行业对标官`

> 依据：`MISSION-BRIEF.md`（只读）、`artifacts/EX-STRATEGY.md`、`10_对抗架构展陈HTML实践.md`。本节为 IA/Modal/无障碍/口播结构交付；**不**改写军令状。

---

## 1. Section ID 列表（与 EX 八屏对齐）

| 顺序 | `id`（`#` 锚点） | H2 文案（建议） | 要点 bullet（3–5 条） |
|------|------------------|-----------------|------------------------|
| 1 | `section-hook` | 从热潮到可审计编排 | • 多智能体常见痛点：编排松散、幻觉传染、验收悬空（叙事钩子）<br>• 引出「需要规则化分工 + 可复核门禁」（**C**）<br>• CTA 指向 `#section-four-roles` 或 `#architecture`（与 OP 统一一处）<br>• 与军令状 Hero 层对应 |
| 2 | `section-four-roles` | 四角色混沌对抗与日常降维 | • 出题人 / 审计员 / 优化者 / QA 与 R1–R4 映射（**C**）<br>• 互补：撕裂边界、外查事实、落地、黑盒验收<br>• 降维：复杂对抗可收缩为开发工作流习惯<br>• 对应 EX 屏二 |
| 3 | `section-isolation` | 蜂群物理隔离与总线 | • 非统帅角色经 Task、独立上下文（**C**）<br>• 统帅（+1）汇流；禁止子代理直连对话<br>• 与「单模型换四张脸」对比一句<br>• 对应 EX 屏三；**新增 CSS 仅挂 `#section-isolation` 下**（技能 10） |
| 4 | `section-gates` | 4+1 与时序闸门 | • R1+R2 关门 → R3；R4a ∥ R3；统帅实测；R4b 关门（**C**）<br>• R4a 契约级黑盒 vs R4b 证据核对<br>• 写码回合最低触达与豁免须口头指向军令状，不扩写条款<br>• 对应 EX 屏四 |
| 5 | `section-legion` | 军团 L3：军令状与部门链 | • EX / MG / OP、DAG、Phase Gate、穿透节（**C**）<br>• 与蜂群 L2 分层：链内对抗 vs 跨域多部门发包<br>• 展陈可用「军令状 → 部门交付物」比喻，避免虚构 API<br>• 对应 EX 屏五 |
| 6 | `section-compare` | 与主流框架的同维度对照 | • 四列：编排模型、状态与人介入、测试与对抗、组织扩展（**B/C** 表注与 EX 表一致）<br>• 强调互补非替代、不对抗拉踩<br>• **外链** LangGraph / AutoGen / CrewAI 等：**保留 `<a target="_blank" rel="noopener">`**，不用 Modal 替代（技能 10）<br>• 对应 EX 屏六 |
| 7 | `section-benefits` | 收益、适用边界与事实纪律 | • 何时值得引入：高风险、写码回合、契约冻结（**C**）<br>• 何时保持轻量：避免过度工程化<br>• **A/B/C** 与 `[PENETRATING]`：无 A 级来源不写死量化「事实」<br>• 对应 EX 屏七 |
| 8 | `section-references` | 参考、交付物与免责 | • 指向 `docs/hajimidog-swarm-legion-showcase.html` 与 `docs/hajimidog-swarm-legion-narration.md`（军令状路径）<br>• 本仓库规则/技能索引式外链（公开文档）<br>• 免责：非官方合作、单文件静态、无后端<br>• 对应 EX 屏八 |

**与军令状成功标准对齐**：视觉顺序等价于 **Hero → 蜂群层（屏二～四可视为蜂群叙事带）→ 军团层 → 对比 → 流程（闸门已含于蜂群带，若 OP 需单独「流程」可视作 `section-gates` 内子区块）→ 收益 → 参考与免责**。本表以 EX 八屏为权威切分，不强制再拆第九个顶层 `section`。

---

## 2. Modal 方案（`modalData`）

单一对象：`modalData[key] = { title, content }`；`content` 为 HTML 字符串（Tailwind 工具类 + 语义标签），由 **OP** 落盘到单文件 HTML。以下 **≥4 个 key**。

| `key` | `title`（建议） | 内容要点（OP 扩写为 HTML） |
|-------|-----------------|---------------------------|
| `modal-four-roles-map` | 四角色与 R1–R4 对照 | 小表或两列列表：出题人↔R1、审计员↔R2、优化者↔R3、QA↔R4；一句「统帅 +1 不在此表内」；别名见 `.mdc` 与《07》映射 |
| `modal-isolation-bus` | 物理隔离与总线汇流 | Task 承载非统帅；子代理不互聊；统帅解析→分发→汇流→实测门禁；图示可用 1 主脑 + N 隔离泡 |
| `modal-gates-timeline` | 时序闸门一图读懂 | 横向或纵向步骤条：R1∥R2 → R3；R4a 与 R3 并行；统帅跑表；R4b 对照证据；写码回合底线一句链到军令状（不抄全文） |
| `modal-r4-split` | R4a / 统帅 / R4b 三段式 | 清单设计（黑盒契约）| 清单执行（+1）| 关门核对（证据）；各 1–2 句职责；禁止「只清单不跑通」 |
| `modal-legion-ex-mg-op` | 军团 EX · MG · OP | EX 战略对标；MG 信息架构（本文）；OP 单页实现；DAG / Phase Gate 一句话；与蜂群 L2 边界一句 |
| `modal-abc-penetrating` | A / B / C 与穿透提醒 | A=可复核来源；B=综述推断；C=观点与仓库主张；`[PENETRATING]`：无 A 不写市场份额、排名类定论 |

**交互脚本约定**（对齐技能 10）：`openModal(key)` / `closeModal`；点击遮罩关闭；`Escape` 关闭；`body.modal-open { overflow: hidden }`。

---

## 3. 视觉方向

| 维度 | 建议 |
|------|------|
| **整体气质** | **深色基底**（如 `slate-950` / `zinc-900` 系）+ **冷色渐变** Hero（青／靛／紫低饱和渐变），局部 **玻璃拟态**（`backdrop-blur`、`bg-white/5` 边框 `border-white/10`） |
| **强调色** | 主 CTA 与高亮：**青绿或电青**（与「对抗／门禁通过」心理一致）；警示／R1 撕裂可用 **玫瑰／琥珀** 点缀，避免全页大红 |
| **排版** | **Inter**（Google Fonts `@import`）；标题 `font-bold` / `tracking-tight`；正文 `text-slate-300`，层级用 `text-white` / `text-slate-400` |
| **图标** | Font Awesome 6（`all.min.css` CDN），与技能 10 一致 |
| **区块** | 对比表可用 **bento 卡片栅格**；军团链可用 **阶梯或 DAG 简图**（CSS/SVG 内联，不引构建） |
| **技能约束** | Tailwind **CDN**；**区块 CSS 全部挂在 section `id` 前缀下**（如 `#section-compare .…`），避免污染 Modal / Hero |

---

## 4. 无障碍（A11y）

| 项 | 要求 |
|----|------|
| **焦点** | Modal 打开时 **`focus` 移至对话框内首个可聚焦元素**（或标题 `tabindex="-1"` + `focus()`）；关闭后 **焦点回到触发按钮**（`openModal` 保存 `document.activeElement`） |
| **对比度** | 正文与背景对比 **≥ WCAG AA**（深色模式下避免 `text-slate-500` 过小字 on 深灰）；渐变上的字加 **底衬或 text-shadow** 防糊边 |
| **Modal 语义** | 容器 `role="dialog"`、`aria-modal="true"`、`aria-labelledby` 指向标题 id；遮罩可 `aria-hidden="true"` |
| **键盘** | **Esc 关闭 Modal**（`keydown` 监听 `Escape`）；Tab **圈在 dialog 内**（可选 focus trap，至少不落到背后主文档） |
| **锚点跳转** | 固定导航跳转 `section` 时 **`scroll-margin-top`** 避免被 sticky 头遮挡 |
| **动态区** | 若 OP 加入轮播/模拟器，容器加 `aria-live="polite"`（技能 10 80 轮节） |

---

## 5. 口播稿结构（H2 级章节标题 · 对应 EX 分镜）

以下标题供 `docs/hajimidog-swarm-legion-narration.md` 直接使用或微调；顺序与 EX §4 八段一致，总时长目标 **6–10 分钟**、**1800–3200 字**（军令状）。

1. `## 开场：多智能体很热，但痛点在哪`（0:00–1:00）  
2. `## 四角色：破坏、外查、建设、诊断`（1:00–1:45）  
3. `## 物理隔离与总线：不是换四张脸`（1:45–3:00）  
4. `## 蜂群 4+1：闸门、清单、实测与关门`（3:00–4:15）  
5. `## 军团 L3：军令状、部门链与阶段门`（4:15–5:15）  
6. `## 与 LangGraph、AutoGen、CrewAI 同维度对照`（5:15–6:30）  
7. `## 何时值得用、何时保持轻量`（6:30–7:30）  
8. `## 收尾：事实分级、参考与免责`（7:30–8:30）  

**数字人友好**：少极端口癖；符号避免连续堆砌；技术词第一次可「中文（English）」。

---

## 6. `decisions_log`

| 类型 | 内容 |
|------|------|
| **已决策** | Section **8 个顶层 id** 与 EX 八屏 **1:1**，命名采用 `section-*` 前缀，便于 CSS 隔离与锚点导航。 |
| **已决策** | **Modal ≥6 key**，覆盖角色映射、隔离总线、闸门、R4 三段式、军团三角、A/B/C；**行业框架外链不 Modal**（技能 10 + 军令状外链要求）。 |
| **已决策** | 视觉：**深色 + 渐变 Hero + 玻璃卡片 + Inter + FA6**；与 `10_对抗架构展陈HTML实践.md` 一致。 |
| **已决策** | 无障碍：**Esc 关 Modal、dialog 语义、焦点归还、对比度 AA 取向**。 |
| **已决策** | 口播 **8 个 H2** 对齐 EX 分镜表，正文由 narration 文件扩写。 |
| **继承 EX** | 行业表 **B/C** 标注、无 A 不量化排名；不虚构 API；不暗示官方合作（`EX-STRATEGY` decisions_log）。 |
| **待 OP 收敛** | Hero CTA 的 `href` 与第一个内容 section id **二选一统一**（`#architecture` 或 `#section-four-roles`）；若 OP 增加 Tab 交互，须独立 `id` 与键盘操作说明。 |

---

*产出角色：信息架构与展陈主编（MG）· TIER=MG · WAVE=1*
