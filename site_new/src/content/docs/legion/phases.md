---
title: 六阶段强制门禁
description: 军团模式的六大阶段 — 从领域识别到汇流与回声校验
---

# 六阶段强制门禁

军团模式的每个项目周期必须完整经历六个阶段。**禁止**跳过任一阶段、倒序交付、或用"任务小"省略阶段二～六。

---

## 阶段全景

<div class="gate-flow">

<div class="gate-row">
  <span class="gate-label">阶段一</span>
  <span><strong>领域识别与目标收敛</strong> — S/M/L 规模判定</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">阶段二</span>
  <span><strong>联网调研</strong> — WebSearch 强制，产出领域组织架构参照报告</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">阶段三</span>
  <span><strong>输出可编辑组织架构方案图</strong> — 用户编辑权</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">⛔ Gate</span>
  <span><strong>ARCHITECTURE_USER_GATE</strong> — 用户显式确认架构后，方可继续</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">阶段四</span>
  <span><strong>冻结三件套</strong> — 架构 + 军令状 + DAG+I/O 调度方案</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">阶段五</span>
  <span><strong>分阶段执行</strong> — EP-0 → Gate → EP-1 → Gate → ...</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>

<div class="gate-row">
  <span class="gate-label">阶段六</span>
  <span><strong>汇流与回声校验</strong> — 对照军令状逐条回声</span>
</div>

</div>

---

## 各阶段详解

### 阶段一：领域识别与目标收敛

- 识别项目所属领域（Web/Mobile/AI/Infra 等）
- 裁定规模：**S 级**（单文件/模块）、**M 级**（多模块）、**L 级**（跨系统）
- 产出可指针化目标句候选

### 阶段二：联网调研（WebSearch 强制）

- 调研行业最佳实践、竞品分析、技术选型参考
- 产出领域组织架构参照报告（附 URL 来源）
- 信息等级标注 A/B/C

### 阶段三：输出可编辑组织架构方案图

- 生成 EX/MG/OP 节点树
- 标注每个节点的职责 + I/O
- **用户显式确认**后进入阶段四

### 阶段四：冻结三件套

- ① 架构图（EX/MG/OP 树 + 通信拓扑）
- ② 军令状（五要素冻结）
- ③ DAG + I/O 调度方案

### 阶段五：分阶段执行

- EP-0（基准验证）→ Gate → EP-1 → Gate → ...
- 每个节点至少一次独立 Agent 子代理
- 叶 OP 带满编蜂群（R1–R4b）

### 阶段六：汇流与回声校验

- 对照军令状逐条回声：做没做？达标没？
- 产出 ECHO-CHECK.md
- 裁决：PASS / COND_PASS / FAIL

---

## 多波次（WAVE）

大型项目可拆多波次：
- **WAVE ≥ 2**：每波须再基线阶段二～四
- **WAVE ≥ 3**：还须统帅层/军令状上下文更新 → 新架构 → 用户确认 → 冻结 → 再执行 → 阶段六输出
