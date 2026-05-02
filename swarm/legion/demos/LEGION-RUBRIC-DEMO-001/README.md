# LEGION-RUBRIC-DEMO-001

**任务链**：`CHAIN=LEGION-RUBRIC-DEMO-001`  
**用途**：军团（L3）流程演示包——内部 Markdown→单文件 HTML 的 CLI 增加「可选暗色主题」与「可配置页脚版权行」。  
**FREEZE_VERSION**：`1`（修订架构/DAG/I/O 时递增并写变更摘要）

## 冻结三件套（成功标准：路径可查）

| 文件 | 说明 |
|------|------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 可编辑组织树（冻结版）+ 角色明细 + 信息流向 |
| [MISSION-BRIEF.md](./MISSION-BRIEF.md) | 军令状五要素（含 `[PENETRATING]`） |
| [SCHEDULE.md](./SCHEDULE.md) | DAG + EP + I/O 契约 + Task 预算 |

## 配套

- [DOMAIN-AND-RESEARCH.md](./DOMAIN-AND-RESEARCH.md) — 领域识别、S/M/L、联网调研摘要  
- [ORG-TREE-EDITABLE.md](./ORG-TREE-EDITABLE.md) — 供你本地改名的可复制树草稿  
- [PHASE-GATES.md](./PHASE-GATES.md) — EP 间 Phase Gate 记录  
- [ECHO-CHECK.md](./ECHO-CHECK.md) — 终态回声校验（对照军令状 + 跨部门一致性）  
- [EP-DISPATCH-L3-LOG.md](./EP-DISPATCH-L3-LOG.md) — L3/蜂群 Task 派发与 Sub-agent 指针对账  
- [RUBRIC-SCORE.md](./RUBRIC-SCORE.md) — 对照 `LEGION-FEATURE-VERIFICATION-RUBRIC.zh-CN.md` 的证据包 + 附录 A 汇总  
- `deliverables/` — EX/MG/叶 OP 汇流产出（各含 `decisions_log`）  
- `swarm-traces/` — 叶 OP 蜂群 R4 裁决留痕与其它子代理摘录  

## 架构确认说明

本演示链中，**用户当轮消息内已给出硬约束、非目标与成功标准**，统帅据此将组织树标为 **FROZEN_FOR_DEMO**。若你需改编制，请直接改 `ARCHITECTURE.md` / `SCHEDULE.md` 并递增 `FREEZE_VERSION`。

## 诚实边界

- **未**将产物合并入正式 `hajimi-dog` 技能树；可复用套路见 `../skill-candidates/SC-001-*.md`（若存在）。  
- **未**在本轮向主分支提交 CLI 实现代码（非目标）。
