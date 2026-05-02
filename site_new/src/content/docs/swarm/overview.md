---
title: 蜂群模式 (L2)
description: 4+1 对抗式开发 — R1/R2/R3/R4a/R4b + 统帅
---

# 蜂群模式 (L2 · 4+1 对抗)

蜂群模式是 Swarm/Legion 的**核心执行层**。它将一个开发任务拆解为五个固定角色的对抗式协作，由统帅（+1）统一调度。

---

## 固定角色

<div class="role-grid">

<div class="role-card">
  <span class="role-tag">R1</span>
  <h3>需求撕裂者</h3>
  边缘场景、矛盾需求、极限输入、安全性质询。
</div>

<div class="role-card">
  <span class="role-tag">R2</span>
  <h3>技术调研员</h3>
  选型、官方文档/事实核对、外部最佳实践。
</div>

<div class="role-card">
  <span class="role-tag">R3</span>
  <h3>核心开发者</h3>
  架构与实现方案、代码级改动。
</div>

<div class="role-card">
  <span class="role-tag">R4a</span>
  <h3>独立测试员（清单）</h3>
  黑盒验收表、DoD、误操作与回归。
</div>

<div class="role-card">
  <span class="role-tag">R4b</span>
  <h3>独立测试员（核验）</h3>
  对照清单做事实核对、漏项指出。
</div>

<div class="role-card">
  <span class="role-tag">+1</span>
  <h3>统帅</h3>
  目标锚定、分发、汇流、拍板、实测。
</div>

</div>

---

## 强制隔离

**R1/R2/R3/R4a/R4b 必须通过 Claude Code Agent 工具创建子代理**（`subagent_type: "general-purpose"`），**禁止**在主对话中换口吻分节扮演替代。

---

## 激活条件

满足以下任一条件即触发蜂群：

1. 用户显式要求：`蜂群` / `4+1` / `R1-R4` / `对抗模式` / `满编蜂群`
2. **写码回合**触发（对仓库做实质性代码改动）
3. 高风险回合（安全、鉴权、数据迁移等）
4. 连续碰壁 3 轮无解

---

## 写码回合最低底线

每次写码回合强制：

- R3（实现）+ R4a（验收清单）+ R4b（关门核验）各至少 1 次 Agent 子代理
- 满足时序闸门（R1+R2 关门 → R3；R4a∥R3；R4b 后置）
- 统帅按 R4a 表亲自实测后裁决 PASS/COND_PASS/FAIL

---

## 退出

说 `退出蜂群` / `不用对抗模式` / `免子代理` 即可降回 L1。
