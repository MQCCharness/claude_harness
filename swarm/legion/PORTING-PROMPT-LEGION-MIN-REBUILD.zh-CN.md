# 军团体系 · 最小重建提示词（单文件 · 外机 AI）

> **用途**：在**另一台计算机**上，仅凭本 Markdown 让大模型**从零**重建与本仓语义等价的 **L3 军团 + L2 蜂群 + 多波次渐进闭环 + 逐级汇流 + 小组信息空间 + 链式派发（含统帅代发）**。  
> **约束**：总读长须短；**不可删减下列不变量**；宿主路径用占位符，**禁止**写死他机盘符。

---

## 0. 执行身份

你是 **治理落地执行者**。用户已授权你创建目录与规则草稿。不做业务需求发挥；只做**体系结构复刻**。

---

## 1. 占位符（先填再动）

| 占位符 | 含义 | 示例 |
|--------|------|------|
| `{GOVERNANCE_ROOT}` | 治理落盘根 | `.claude/swarm/` |
| `{LEGION_ROOT}` | 军团目录 | `{GOVERNANCE_ROOT}/legion/` |
| `{RULES_ROOT}` | Claude Code 规则目录 | `.claude/rules/` |
| `{CHAIN}` | **当前任务链 ID**；**多波次再启必须换新 CHAIN** | `CHAIN-xxx-001` |

**路径书写**：凡入档文件一律 **相对仓库根** 正斜杠；**禁止**把 `C:\` 等写入契约。

---

## 2. 不变量（违反任一条 = 体系无效）

| ID | 内容 |
|----|------|
| **I1** | **蜂群 L2** 与 **军团 L3** 并存：**不得**用军团替代蜂群的写码回合 **R3+R4 Task**、**R4 实测门禁**、**R2 强制触发**、可验证 **A/B/C**（须在宿主有一份等价 `CLAUDE.md §二` 语义，可复制或自写摘要）。 |
| **I2** | **军令状五要素**全域穿透；含 **`[PENETRATING]`** 的条目须**原文**贯穿全链，不得摘要降级。 |
| **I3** | **DAG 无环**；**I/O 契约表**与 **DAG 邻接表**双向对账后方可冻结执行。 |
| **I4** | **派发权**：冻结架构中 **凡存在直接下级的 L3 角色**（典型 EX→MG→OP；若架构允许非叶 OP 同则）必须能**拆解任务**并产出 **《下级 Task 发包》**；**首选**自建 Sub-agent Task，**仅统帅会话可 Task 时**须 **统帅代发**，且中间层**禁止**谎称已派发（**A 级须有锚点事实**）。 |
| **I5** | **禁止越级**：不得跳过冻结架构内的中间层对更下层塞全量包（**统帅直达 OP** 仅当架构已冻结无该层且留痕）。 |
| **I6** | **逐级主题汇流**：每角色对上交付必含 **《逐级主题汇流块》**（职责一句、直连下级清单与状态、到齐状态、主题摘要**仅直连边界**、矛盾风险、上送指针）。可落盘 `rollups/ROLLUP-<CHAIN>-<TIER>-<slug>.md`。 |
| **I7** | **小组信息空间**：仅 **同一领导及其辖内角色**在执行期共享；**不得**覆盖：**军令状**、**`[PENETRATING]`**、**跨组事实**；**不得**用组内草稿顶替 **ROLLUP 必填字段**；波次收口后对组空间 **只读或归档**（见 §5）。 |
| **I8** | **多波次**：`U1–U6` 任一为真 ⇒ **未收敛**；须 **Gap 落盘** + **收口包**（含 **F 众人拾柴对账** 或 **`N/A`**、**G 逐级汇流指针** 或 **`N/A`**），**禁止**未收口默认改主会话单线完结；再启须 **新 CHAIN**。 |
| **I9** | **Task 首行锚点**须含：`CHAIN` `ROUND` `ROLE` `DEPT` `LEVEL=L3|L2` `TIER=EX|MG|OP|N/A` `PARENT_REF`。 |
| **I10** | **Phase Gate**（EP 间）与 **回声校验**（全局）**双层**；**互不替代**。 |

**U1–U6（摘要）**：回声未过；②③④⑤ 偏离未闭环；P0 TC FAIL；PF/INDEX 未对账；⑤ 无证据却标已满足；**F** 与 `skill-candidates/INDEX.md` 不可对账或 **READY_FOR_REVIEW** 未走技能 **21** §6。（详细表可复制本仓 `legion/PORTING-PROMPT-PROGRESSIVE-CHARTER-LOOP.zh-CN.md`。）

---

## 3. 必须落地的最小目录树

在 `{LEGION_ROOT}` 创建（缺则建）：

```
legion/
├── MISSION-BRIEF.md              # 当前链军令状（或 chains/<CHAIN>/MISSION-BRIEF.md）
├── ARCHITECTURE.md
├── SCHEDULE.md
├── ECHO-CHECK.md
├── rollups/README.md
├── group-space/README.md          # 小组信息空间约定
├── skill-candidates/             # 众人拾柴（INDEX + 模板可后补）
├── chains/<CHAIN>/               # 每条 CHAIN 子目录（推荐）
│   ├── MISSION-BRIEF.md
│   ├── SCHEDULE.md
│   └── WAVE-CLOSE-<CHAIN>-W<N>.md
├── PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md  # 可将本文件复制到此
└── PORTING-PROMPT-PROGRESSIVE-CHARTER-LOOP.zh-CN.md  # 多波次详版；若无则至少实现 §4.1–§4.3 + §5 语义
```

在 `{RULES_ROOT}` 须有 **军团规则** 与 **蜂群规则** 各一份（文件名可映射，语义须满足 **I1–I10**）。

---

## 4. 小组信息空间（Group Space）

| 项 |约定 |
|----|------|
| **路径** | `{LEGION_ROOT}/group-space/<CHAIN>/W<波次>/<TIER>-<领导角色slug>/CONSENSUS.md`（可增 `ARTIFACTS.md`） |
| **成员** | 领导角色 + 其 **冻结架构内的全部后代 L3 角色**（不含兄弟部门） |
| **可写** | 组内术语表、过程共识、待定假设（标 **B/C**）、对内同步 checklist |
| **禁止** | 改写军令状；弱化 `PENETRATING`；把组内文当作对兄弟部门或统帅的 **A 级事实** 不经 Gate/裁剪 |
| **与汇流** | **ROLLUP** 上送可增「组空间指针」；**不可替代**汇流块必填字段 |
| **生命周期** | 本 **WAVE** 执行窗内读写；写入 **WAVE-CLOSE** 时声明归档路径或 `N/A` |

---

## 5. 多波次（极简操作）

1. 每波结束写 **`WAVE-CLOSE-<CHAIN>-W<N>.md`**：**§4.1 Gap 矩阵**（必有）；**§4.2** A–E + **F**（SC 或 `N=0`）+ **G**（ROLLUP 指针或 `N/A`）。  
2. **未收敛** ⇒ 分配 **NEWCHAIN** 与 **二期军令状**（可新文件或追加冻结区）。  
3. **再启前检查**：新 `SCHEDULE` 与 Gap 对账、ECHO 表清空/归档、**F/G** 与 INDEX/ROLLUP 对账。  

（完整条款：移植 `PORTING-PROMPT-PROGRESSIVE-CHARTER-LOOP.zh-CN.md`。）

---

## 6. 派发与汇流（一条链）

```
军团统帅: EP 顺序 + Gate + I/O 裁剪 + 代发 + 回声
    ↓
带下级 L3 角色: 拆解 →《下级 Task 发包》→ (自建 Task | 统帅代发)
    ↓
叶 OP: 任 L2 蜂群 +1，蜂群内部 R1–R4；OP 汇流块向上
    ↓
各级: 《逐级主题汇流块》逐层上送；组空间仅横向备忘
```

---

## 7. 完成后自检（P0）

- [ ] `{LEGION_ROOT}` 下 **§3 树**存在且可打开。  
- [ ] 规则文件能检索：**军令状**、**代发**、**汇流块**、**U6/F**、**group-space**。  
- [ ] **随机破坏**一个必备 MD 段标题后，执行者能说明缺哪条不变量。  

**母仓附带脚本**（可复制到外机，按需改 `required` 列表）：  
`.claude/swarm/legion/scripts/legion-min-tree-check.ps1`  
仓库根执行：`powershell -NoProfile -ExecutionPolicy Bypass -File .claude/swarm/legion/scripts/legion-min-tree-check.ps1` → **Exit 0**。

---

## 8. 与本仓对齐指针（人类检核）

源参考仓库结构示例：`CLAUDE.md §三`、`CLAUDE.md §二`、技能 **`18`/`19`/`20`/`21`**、`legion/rollup-verify-demo/`（演练样例）。

---

**版本**：2026-03-26 · 可与 **CHAIN-MW-REBUILD-2026-03-26** 同启。
