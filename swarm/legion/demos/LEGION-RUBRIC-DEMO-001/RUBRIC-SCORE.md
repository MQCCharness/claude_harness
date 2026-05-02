# 军团特性评分汇总（对照 LEGION-FEATURE-VERIFICATION-RUBRIC）

| 字段 | 值 |
|------|-----|
| **CHAIN** | `LEGION-RUBRIC-DEMO-001` |
| **Rubric 锚点** | `.claude/swarm/legion/LEGION-FEATURE-VERIFICATION-RUBRIC.zh-CN.md`（以仓库内当前正文为准） |
| **Rubric 版本** | 文档内未标 semver；以路径内正文为 **1.0.0（约定）** |
| **评分窗口** | 演示链冻结：`FREEZE_VERSION=1`（`README.md` / `ARCHITECTURE.md`）；统帅落盘与叶 OP 蜂群留痕同日 **2026-03-27** |
| **检验日期** | 2026-03-27 |
| **执行形态** | **混合**：叶 OP 蜂群 **满编 Task（R1–R4）**；EX/MG **统帅落盘等效**（见 `EP-DISPATCH-L3-LOG.md`） |
| **双轨策略 (RG-03)** | **取严**：蜂群 R4 **COND_PASS（契约级）** 不升格为军团 **PASS**；军团终裁与 `ECHO-CHECK.md` 一致为 **COND_PASS** |
| **COND_PASS 折损 (RG-06)** | 已冻结：无 runnable 实现时，R4 与军团层均允许 **COND_PASS**，但须在汇总表登记「实现后重跑 P0」 |

---

## 口径说明（§1.3 · §3.1 · §3.3）

- **§3.1**：4 分须该细项「至少一项关键断言」为 **A 级**（步骤 + 可机器读结果 + 环境摘要）；**3 分**为「主路径满足、次要缺口不破坏契约」，**未要求** A。
- **§3.3**：「无 A 级时该细项最高 **2**」与 §3.1 的 3 分档存在字面张力。本表采用 **检验常用合理解读**：**不得记 4**（无 A）；**3** 允许在 **B 级可追溯落盘**（路径、表、锚点与 CHAIN 对齐）且非「仅模板无过程」时给出；若监管方要求 **字面严封顶**，则将 **所有无 A 细项压至 ≤2** 并重算 —— 见文末 **「严口径对照」**。
- **RG-01**：下列细项表 **逐行** 绑定证据指针（已展开 F2，不再合并多 ID 于一行）。

---

## 证据包清单（§1.2）与核对结果

| 证据 | 状态 | 指针（相对仓库根 `.claude/swarm/legion/`） |
|------|------|---------------------------------------------|
| E1 | ⚠️ 部分 | 主对话导出未入包；**结构化主证**为同链落盘文件 |
| E2 | ✅ | `demos/LEGION-RUBRIC-DEMO-001/MISSION-BRIEF.md` |
| E3 | ✅ | 同目录 `ARCHITECTURE.md`、`MISSION-BRIEF.md`、`SCHEDULE.md` |
| E4 | ✅ | `demos/LEGION-RUBRIC-DEMO-001/SCHEDULE.md`（DAG + EP + I/O） |
| E5 | ⚠️ 部分 | `demos/LEGION-RUBRIC-DEMO-001/EP-DISPATCH-L3-LOG.md`；**各 L3 独立 Task 正文**未全量归档（EX/MG 为落盘等效） |
| E6 | ✅ | `demos/LEGION-RUBRIC-DEMO-001/PHASE-GATES.md`、`ECHO-CHECK.md` |
| E7 | ✅ | `demos/LEGION-RUBRIC-DEMO-001/swarm-traces/OP-THEME-R4-VERDICT.md`、`swarm-traces/OP-FOOTER-R4-VERDICT.md`（**无**统帅实测命令：合非目标） |
| E8 | ✅ | `skill-candidates/SC-001-cli-html-theme-footer-pack.md`、`skill-candidates/INDEX.md`（相对 `legion/`；**非** `demos/.../skill-candidates/`） |
| E9 | ✅ | `FREEZE_VERSION=1`（`README.md`、`ARCHITECTURE.md`）；无 git commit 锚（演示链声明） |

**§1.2 底线**：E2、E3、E5 类均有覆盖或等效说明 → F5/F6 **可评 3 档**（在未触发 §3.5 前提下）。

---

## 细项分（0–4 或 N/A）— 工作口径（B 级可追溯，无 A 则不上 4）

| 特性 | 细项 ID | 分 | 证据指针 | 等级 |
|------|---------|-----|----------|------|
| F1 | F1.1 | N/A | 本包专评「已激活军团链」，不评全局休眠 | — |
| F1 | F1.2 | 3 | `ARCHITECTURE.md` 树、角色表、叶 OP→蜂群 | B |
| F1 | F1.3 | 3 | 叶 OP 满编 R1–R4（`EP-DISPATCH-L3-LOG.md`）；**无**写码回合统帅实测（`MISSION-BRIEF` 非目标） | B |
| F1 | F1.4 | 3 | `ECHO-CHECK.md` 与 `CLAUDE.md` 关系无矛盾表述 | B |
| F2 | F2.1 | 3 | `DOMAIN-AND-RESEARCH.md` §2：M + L3 启动 | B |
| F2 | F2.2 | 3 | `README.md`「架构确认」+ `FROZEN_FOR_DEMO`（隐含用户已供约束）；**无**单独「退出军团」句入包 | B |
| F2 | F2.3 | 3 | `DOMAIN-AND-RESEARCH.md` §2 规模与理由 | B |
| F2 | F2.4 | 3 | 规模 M 上军团、未对 S 强上；`SCHEDULE` 预算 12 | B |
| F2 | F2.5 | 3 | `ARCHITECTURE.md` 角色表 + `DOMAIN-AND-RESEARCH.md` §4 | B |
| F2 | F2.6 | 3 | `SCHEDULE.md` §4 Task 预算表 | B |
| F2 | F2.7 | 3 | `EP-DISPATCH-L3-LOG.md` 诚实边界 + `PHASE-GATES.md` P0 保留蜂群 | B |
| F3 | F3.1 | 3 | `DOMAIN-AND-RESEARCH.md` §1–§2 | B |
| F3 | F3.2 | 3 | `DOMAIN-AND-RESEARCH.md` §3 标注 B/C | B |
| F3 | F3.3 | 2 | `README`/`ARCHITECTURE` 以 `FROZEN_FOR_DEMO` 收口；**续聊「继续」未显式再次确认树** — 取严（对照技能 18 阶段三） | B |
| F3 | F3.4 | 3 | 三件套 + `SCHEDULE` | B |
| F3 | F3.5 | 3 | `SCHEDULE` EP + `PHASE-GATES.md` + `ECHO-CHECK.md` | B |
| F3 | F3.6 | 3 | `SCHEDULE.md` EP 为批次，非「六阶段序号」混用 | B |
| F4 | F4.1 | 2 | EX/MG **无**独立 L3 Sub-agent；`EP-DISPATCH-L3-LOG.md` 已声明等效 | B |
| F4 | F4.2 | 3 | `ARCHITECTURE.md`「蜂群」列 | B |
| F4 | F4.3 | 3 | 架构与 I/O 表；**无**逐份 Task 正文抽检归档 | B |
| F4 | F4.4 | 3 | `EP-DISPATCH-L3-LOG.md` + `swarm-traces/*R4*` 锚点行 | B |
| F5 | F5.1 | 3 | `MISSION-BRIEF.md` 五要素齐全；**① 为节录+「中略」指针**，完整原话**不在**证据包内 — **不得记 4**；未瞒报且 `ECHO-CHECK.md` #49–50 说明单一事实源 | B |
| F5 | F5.2 | 3 | 军令状落盘路径即穿透主证；L3 Task 正文未逐份归档 | B |
| F5 | F5.3 | 3 | `ARCHITECTURE.md` §叶 OP→蜂群；无 ②③⑤+[`PENETRATING`] **全文字节镜像** | B |
| F5 | F5.4 | N/A | 无 EX/MG 追加区样本 | — |
| F5 | F5.5 | 3 | 无冲突记录；`PHASE-GATES` 齐全 | B |
| F5 | F5.6 | 3 | `PHASE-GATES.md` G1–G4 + `ECHO-CHECK.md` | B |
| F6 | F6.1 | 3 | `SCHEDULE.md` 无环说明 | B |
| F6 | F6.2 | 3 | I/O 表 + 各交付物 `decisions_log` | B |
| F6 | F6.3 | 2 | 裁剪转发以统帅叙述与汇流结构为主，**无**路由前后字节镜像对照 | C |
| F6 | F6.4 | 3 | `EP-DISPATCH-L3-LOG.md` 与叶 OP 8 Task 指针对账 | B |
| F6 | F6.5 | 3 | 日志与 R4 留痕；**非**全字段全样本归档 | B |
| F7 | F7.1 | 3 | `deliverables/OP-THEME-ROLLUP.md`、`deliverables/OP-FOOTER-ROLLUP.md` 汇流结构 | B |
| F7 | F7.2 | 3 | 同上；叶 OP 对上不堆 R1–R4 原文 | B |
| F7 | F7.3 | N/A | 未用 `legion/rollups/` 独立卷 | — |
| F7 | F7.4 | 3 | `ECHO-CHECK.md` 跨部门表；未滥用 `group-space` | B |
| F7 | F7.5 | 3 | `PHASE-GATES.md` / `ECHO-CHECK.md` 与技能 19/20 模板字段对齐（自证为演示包） | B |
| F8 | F8.1 | 3 | `PHASE-GATES.md` 分层检查项 | B |
| F8 | F8.2 | 3 | PG-01/12/23 + GE/GM/GO 分型 | B |
| F8 | F8.3 | N/A | 无连续 BLOCK 事件 | — |
| F8 | F8.4 | 3 | `ECHO-CHECK.md` | B |
| F8 | F8.5 | 3 | 军团 COND_PASS 未覆盖蜂群为 PASS（`ECHO-CHECK` + R4 文件） | B |
| F9 | F9.1 | N/A | 无契约变更日志事件 | — |
| F9 | F9.2 | 3 | `README.md`、`EP-DISPATCH-L3-LOG.md` 诚实边界 | B |
| F9 | F9.3 | 3 | `FREEZE_VERSION` + 变更说明入口 | B |
| F10 | F10.1 | 3 | `skill-candidates/SC-001-cli-html-theme-footer-pack.md`、`skill-candidates/INDEX.md` | B |
| F10 | F10.2 | N/A | 非 PORTING 波次；**无** `WAVE-CLOSE-*` — **零申报** | — |
| F10 | F10.3 | 2 | 技能 21 §6 升格提问后用户仅「继续」，**未**对 `READY_FOR_REVIEW` 做升格/不升格裁决留痕 | B |
| F10 | F10.4 | 3 | 未改正式 `hajimi-dog` 技能树；**可路径核验**，无「命令+退出码」故 **不记 4** | B |
| F11 | F11.1 | 2 | 演示包正文**未**显式引用 `PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md` | C |
| F11 | F11.2 | 3 | `skill-candidates/README.md` + 草稿路径；未做单文件外机复刻演练 | B |

---

## 特性分 `Score(Fx)` = 行内 min（§3.2）

| Fx | Score(Fx) | 制约细项 |
|----|-----------|----------|
| F1 | **3** | F1.2～F1.4 最低 3 |
| F2 | **3** | F2.1～F2.7 最低 3 |
| F3 | **2** | **F3.3** |
| F4 | **2** | **F4.1** |
| F5 | **3** | F5.1～F5.3 最低 3 |
| F6 | **2** | **F6.3** |
| F7 | **3** | F7.1～F7.2、F7.4～F7.5 最低 3 |
| F8 | **3** | F8.1、F8.2、F8.4、F8.5 最低 3 |
| F9 | **3** | F9.2、F9.3 |
| F10 | **2** | **F10.3** |
| F11 | **2** | **F11.1**、F11.2 |

---

## 汇总（§6.1–6.2）— 工作口径

- \(S_{raw} = 3+3+2+2+3+2+3+3+3+2+2 = 28\)
- \(N_{eff} = 11\)
- \(H_{feature} = \mathrm{round}(100 \times 28 / 44) = 64\%\)

**加权**（P0: F5,F6,F8,F9；P1: F1,F3,F7；P2: F2,F4,F10,F11）：

- \(1.5 \times (3+2+3+3) = 16.5\)
- \(1.2 \times (3+2+3) = 9.6\)
- \(1.0 \times (3+2+2+2) = 9\)
- \(S_w = 35.1\)，\(H_{weighted} = \mathrm{round}(100 \times 35.1 / 54.4) = 65\%\)

**健康度档位（§6.3）**：存在 **P1（F3）= 2** → **亚健康**；且 \(H_{weighted} = 65\) 处于亚健康下沿。

---

## 严口径对照（§3.3 字面：无 A 则该细项 ≤2）

若将 **所有** 无 A 细项封顶为 **2**（N/A 仍剔除）：

- 各 \(Score(Fx) = 2\)（F3.3、F6.3、F10.3、F11.x 等缺口在严口径下仍为 **2**，除非另降为 **1** 的「仅模板」情形）
- \(S_{raw} = 22\)，\(H_{feature} = 50\%\)，\(H_{weighted} \approx 50\%\) → **不健康**（P0 均为 2，不满足「健康」要求的 P0 ≥3）

**选用建议**：对外合规叙事优先 **工作口径 + 本文 §3.3 张力说明**；监管/内审要求 **字面 §3.3** 时改用 **严口径** 并补 **A 级**（命令 + 退出码 + 环境）后重评。

---

## 最终裁决（§6.4）

| 项 | 值 |
|----|-----|
| **TC-LGV（§5）** | **未执行**（本表为单链评分，非 rubric 自检全套）→ **不**宣称「检验任务 PASS」 |
| **§3.5 一票否决** | **未触发**：① 节录已明示「中略」与 `ECHO-CHECK` 映射；无「伪造 Task / 蜂群 FAIL 却军团 PASS」 |
| **本 CHAIN 军团落实（工作口径）** | **COND_PASS** |
| **保留项** | ① 用户显式确认组织树或修订 `ARCHITECTURE`；② 实现入仓后重跑 R4 P0 + 统帅实测；③ 答复 **SC-001** 升格闸；④ 可选：`README` 增加 `PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md` 指针抬 F11；⑤ 若需 **F5.1①** 满分档：将用户原话**全文**脱敏入 `MISSION-BRIEF` 或附 `E1` 导出 |

---

## 签核

| 角色 | 说明 |
|------|------|
| 检验统帅 | 主对话助手（本回合据证据包复核并修订本表） |
| 用户 | 可抬分路径：确认架构 / 接受 EX·MG 落盘等效 / SC-001 升格裁决 / 补 E1 全文 |

---

## 附录 A 摘要（字段对齐）

| 字段 | 值 |
|------|-----|
| 证据包清单（§1.2） | E1:⚠️ E2:✅ E3:✅ E4:✅ E5:⚠️ E6:✅ E7:✅ E8:✅ E9:✅ |
| **最终裁决** | **COND_PASS**（工作口径） |
| **健康度档位** | **亚健康**（\(H_{weighted}=65\%\)，F3 为 P1 且 =2） |
