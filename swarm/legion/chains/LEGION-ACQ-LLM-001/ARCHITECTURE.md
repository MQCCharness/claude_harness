# 冻结组织架构 — LEGION-ACQ-LLM-001

**CHAIN**：`LEGION-ACQ-LLM-001`  
**冻结时间**：2026-03-29  
**统帅**：主对话 +1（军团统帅）

---

## 1. 组织树（L3 平级编组）

```
军团统帅（+1）
│
├── EX·战略（EX-STRATEGY）          TIER=EX
├── EX·合规与数据（EX-COMPLIANCE-DATA）   TIER=EX     ← 与上并列，向统帅/收口汇报
│
├── MG·产品中台（MG-PRODUCT）       TIER=MG     ← 输入：双 EX 汇流块
├── MG·增长与分析（MG-GROWTH-ANALYTICS）   TIER=MG     ← 同上
│
├── OP·后端与 LLM（OP-BACKEND-LLM）        TIER=OP（叶）→ 蜂群 L2-A
└── OP·获客与运营（OP-GROWTH-OPS）       TIER=OP（叶）→ 蜂群 L2-B
```

---

## 2. 角色明细表

| ROLE | TIER | 上级 | 直接下级 | 职责摘要 | 预期产出形态 | 带蜂群 |
|------|------|------|----------|----------|--------------|--------|
| EX-STRATEGY | EX | 统帅 | 无 | 市场切入、MVP 范围、路线图、资源优先级 | 战略纲要＋决策假设（A/B/C） | 否 |
| EX-COMPLIANCE-DATA | EX | 统帅 | 无 | PII 分级、留存与出境、模型使用与日志边界；`[PENETRATING]` 维护 | 合规矩阵＋红线条款 | 否 |
| MG-PRODUCT | MG | 统帅* | 无 | 获客后台能力切片、用户旅程、PRD、接口与错误语义草案 | PRD + I/O 草案 | 否 |
| MG-GROWTH-ANALYTICS | MG | 统帅* | 无 | 漏斗与渠道指标、事件字典、实验占位 | 指标与事件契约 | 否 |
| OP-BACKEND-LLM | OP | 统帅* | — | API、LLM 网关、编排、限流、审计、观测 | 可运行后端 + 文档 | **是（L2-A）** |
| OP-GROWTH-OPS | OP | 统帅* | — | 活动/线索/触达侧功能与运营闭环 | 域服务 + 文档 | **是（L2-B）** |

\*实际派发：**统帅**在双 EX 收口后向双 MG 下发；双 MG 收口后向双 OP 下发（见 `SCHEDULE.md`）。若平台由中间层代发，锚点 `PARENT_REF` 指向上一级 Task。

---

## 3. 组空间（可选落盘，后续波次启用）

建议路径：`../group-space/LEGION-ACQ-LLM-001/W1/<ROLE>/`（与既有 CHAIN 惯例一致，需时再建）。

---

## 4. 变更纪律

任一角色增减、TIER 调整或汇报关系变化 → **用户明示 + 统帅声明推翻条目标 + 重生成 DAG/I/O**（形状保持）。
