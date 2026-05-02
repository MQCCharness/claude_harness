# 波次收口包 — CHAIN-MW-REBUILD-2026-03-26 · WAVE 1

**执笔**：军团统帅 +1  
**状态**：W1 **已收口**（母仓侧）；外机验证见 **NEWCHAIN**。

---

## 4.1 Gap 矩阵

▲ **应有**（⑤ 或 ②） | **已有**（路径/证据） | **残差** | **下一波动作** |
|---------------------|----------------------|----------|----------------|
| 外机仅凭 MIN 可同构重建 + 自检 Exit 0 | `chains/CHAIN-MW-EXTERNAL-VERIFY-2026-03-26/` 已建；**待外机**填 `REBUILD-REPORT.md` | 缺第二环境实测 | 外机跑 MIN → 跑 `legion-min-tree-check.ps1` → 回填 **NEWCHAIN** |
| MIN 含 I1–I10 + 组空间 + 多波次 | `.claude/swarm/legion/PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md`（可读 grep） | **无**（本仓） | W2  diff |
| 规则含带下级 L3 派发 + 组空间 | `CLAUDE.md §三`（「小组信息空间」「带下级 L3」） | **无**（本仓） | W2 对照 |

**W1 本仓裁决**：Gap 第 2–3 行在母仓 **已闭合**；第 1 行 **外机实测** 仍为开放残差 → 按渐进闭环定义 **未收敛**，须执行 **CHAIN-MW-EXTERNAL-VERIFY-2026-03-26**。

## 4.2 必选块

- **A. 本波已实现范围**：MIN 提示词、`group-space/README`、CHAIN 目录、规则专节、`RECENT-DECISIONS` 指针。  
- **B. 残差**：外机重建未跑；组空间 **已有 W1 样例** `group-space/CHAIN-MW-REBUILD-2026-03-26/W1/*/CONSENSUS.md`。  
- **C. PF**：本波未强制 PF；`N/A`。  
- **D. 回声**：指向 `ECHO-CHECK.md` 或本链专用回声节（若未建则 `N/A` + 理由）。  
- **E. 形状保持**：② 沿用至 W2；推翻须用户明示。  
- **F. 众人拾柴**：本波无新 SC → **`N=0` 显式零申报**。  
- **G. 逐级汇流**：本波统帅直编 → **`ROLLUP N/A`**（显式）。  
- **G′. 小组信息空间**（随 PORTING G）：`group-space/CHAIN-MW-REBUILD-2026-03-26/W1/EX-体系编纂官/`、`…/MG-规范对齐员/`、`…/OP-文档落盘员/` 各 `CONSENSUS.md`。

---

## 未收敛判定（布尔）

- **未收敛**：Gap 第一行 **外机**仍为开放 → **须继续** `CHAIN-MW-EXTERNAL-VERIFY-2026-03-26`。

## 二期（W2）已选策略

- **S-A**：已创建 **`chains/CHAIN-MW-EXTERNAL-VERIFY-2026-03-26/MISSION-BRIEF.md`**；**PARENT_CHAIN**=`CHAIN-MW-REBUILD-2026-03-26`。
