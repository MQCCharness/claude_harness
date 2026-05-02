# 冻结组织架构 — LEGION-TOOL-AGENT-ANALYSIS-20260330

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**冻结时间**：2026-03-30  
**统帅**：主对话 +1（军团统帅）  
**用户确认**：架构图已确认（2026-03-30）

---

## 1. 组织树（L3）

```
军团统帅（+1）
│
├── EX·证据与分级（EX-EVIDENCE-RUBRIC）           TIER=EX
├── MG·Claude 多代理（MG-CLAUDE-SUBAGENT）        TIER=MG
└── MG·OpenClaw 长时运行（MG-OPENCLAW-RUNTIME）   TIER=MG
        │
        └── OP·文档与实现核对（OP-DOC-VERIFY）    TIER=OP（叶）
```

**命名映射（与对话草案一致）**

| 草案称呼 | 本文件 ROLE ID |
|----------|----------------|
| EX「工具架构与证据分级」 | EX-EVIDENCE-RUBRIC |
| MG-A「Claude 多代理」 | MG-CLAUDE-SUBAGENT |
| MG-B「OpenClaw 长时运行与记忆」 | MG-OPENCLAW-RUNTIME |
| OP「文档/实现级核对」 | OP-DOC-VERIFY |

---

## 2. 角色明细表

| ROLE | TIER | 上级 | 直接下级 | 职责摘要 | 预期产出形态 | 带蜂群 |
|------|------|------|----------|----------|--------------|--------|
| EX-EVIDENCE-RUBRIC | EX | 统帅 | 无 | 定义 A/B/C 证据等级、禁止把推断当事实；收窄分析边界 | 证据分级说明 + 约束块（Markdown） | 否 |
| MG-CLAUDE-SUBAGENT | MG | 统帅 | 无 | Claude 系 sub-agent「通讯」拓扑、Task/Team 差异、简短描述多启的机制与示例 | 分析汇流块 + 概念级伪代码/步骤（Markdown） | 否 |
| MG-OPENCLAW-RUNTIME | MG | 统帅 | OP-DOC-VERIFY | OpenClaw 长时运行：外存、检索、compaction 与 memory flush | 机制说明 + 官方文档指针（Markdown） | 否 |
| OP-DOC-VERIFY | OP | 统帅* | 无 | 对照 OpenClaw 官方 Memory/Compaction 条款做核对清单与漏项 | 核对结论 + TC 指针（Markdown） | **可选 L2**：若需工程实测再启蜂群；默认本链为知识型，叶 OP 可无 L2 |

\*派发路径：冻结树为 **MG-OPENCLAW-RUNTIME → OP-DOC-VERIFY**；**统帅**在 Gate 后依 `SCHEDULE.md` 向 OP 下发（中间层代发时 `PARENT_REF` 指 MG Task）。

---

## 3. 信息流向（叙述）

- **统帅 → EX**：军令状与原始问题边界。  
- **EX → 双 MG**：证据分级与硬约束块，双 MG 汇流须引用。  
- **MG-OPENCLAW-RUNTIME → OP**：OpenClaw 机制草案 + 待核对 URL/条款列表。  
- **MG-CLAUDE-SUBAGENT → 统帅**：Claude 轨道汇流（无架构内下级）。  
- **OP → 统帅**：OpenClaw 轨道关门核对结果。

---

## 4. 变更纪律

任一节点增减、TIER 调整或 **OP 上级变更** → 须 **用户明示** + 统帅声明推翻条目 + 重生成 `SCHEDULE.md`（形状保持，与蜂群 `CLAUDE.md` 对齐）。
