---
title: 编队时序闸门
description: 蜂群模式的严格执行顺序 — R1+R2 关门 → R3∥R4a → R4b → 统帅裁决
---

# 编队时序闸门

蜂群模式的执行顺序由**时序闸门**严格控制。违反顺序即为不合格交付。

---

## 闸门流程

<div class="gate-flow">

<div class="gate-row">
  <span class="gate-label">Gate 0</span>
  <span><strong>EXEC_CFG_GATE</strong> — 执行配置关门</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>
<div class="gate-row">
  <span class="gate-label">并行</span>
  <span><strong>R1</strong> (需求撕裂) + <strong>R2</strong> (技术调研) — 可同时派发</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>
<div class="gate-row">
  <span class="gate-label">Gate 1</span>
  <span><strong>R1+R2 关门</strong> — 两者均完成后，方可启动 R3</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>
<div class="gate-row">
  <span class="gate-label">并行</span>
  <span><strong>R3</strong> (实现) ∥ <strong>R4a</strong> (验收清单) — R4a 仅基于契约级输入</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>
<div class="gate-row">
  <span class="gate-label">后置</span>
  <span><strong>R3 关门 + 统帅实测证据回灌 → R4b</strong> (关门核验)</span>
</div>
<div style="text-align:center;color:var(--sl-color-accent);">↓</div>
<div class="gate-row">
  <span class="gate-label">裁决</span>
  <span><strong>统帅按 R4a 冻结表亲测</strong> → PASS / COND_PASS / FAIL</span>
</div>

</div>

---

## 关键规则

### R1 + R2 可并行

需求撕裂和技术调研互相独立，可以同时派发 Agent 子代理。

### Gate 1 强制等待

R3 必须在 R1 和 R2 都关门（完成并产出）之后才能启动。

### R4a 黑盒纪律

R4a 仅基于**契约级输入**（REQ、冻结目标、环境矩阵）制定验收清单，**禁止**纳入 R3 实现细节。

### R3 关门后才有 R4b

R4b 需要 R3 的产出 + 统帅的实测证据才能进行事实核对。

---

## 裁决标准

| 裁决 | 条件 |
|------|------|
| **PASS** | P0 全部通过 |
| **COND_PASS** | P0 通过，但有 P1 未闭环 |
| **FAIL** | 任一 P0 未过，不得收束 |
