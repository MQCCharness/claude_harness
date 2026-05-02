---
title: Agent 子代理规范
description: Claude Code Agent 工具的使用规范 — 角色固化、通信规则、诚实边界
---

# Agent 子代理规范

Swarm/Legion 的强制执行依赖于 Claude Code 的 **Agent 工具**创建真隔离子代理。

---

## 创建子代理

```typescript
Agent({
  description: "<简短描述>",
  prompt: "<自包含任务描述>",
  subagent_type: "general-purpose"
})
```

---

## 角色固化 (α)(β)(γ)

派发蜂群/军团 Agent 前必须完成：

### (α) 角色 Task 定稿

该角色本轮 Task 已定稿，含 CHAIN/ROUND/ROLE 锚点 + 硬约束 + 上游指针。

### (β) 更新角色 MD

更新 `.claude/agents/runs/<CHAIN-ID>/<角色>.md`，含：
- `## 本链绑定`（链 ID、角色、轮次）
- `### 最近派发 Task 摘要`（任务摘要 + 时戳）

### (γ) 引用 ROLE_DEF

派发 Agent 时 prompt 中须含：
```
ROLE_DEF=@.claude/agents/runs/<CHAIN-ID>/<角色>.md
```

**禁止**零差异化模板副本充当已固化。

---

## 子代理通信规则

| 规则 | 说明 |
|------|------|
| 子代理禁止直接对话 | 一律经统帅中转 |
| 子代理不可见终端 | 依赖终端结果时须在 prompt 中粘贴关键摘要 |
| 同角色连续 Task | 优先 `resume` 同 Agent ID |
| 最小充分信息 | 禁止灌入完整聊天历史 |

---

## 诚实边界

若 Agent 工具不可用，统帅须首段声明，按角色**分节输出**（标题注明 R1/R2 等），**禁止**单段混扮多角。

分节等效**不得**规避已调度角色的 Agent 隔离义务。

---

## 盘稿 vs Agent

| 项目 | 盘稿（runs/） | Agent 子代理 |
|------|-------------|-------------|
| 目的 | 固化角色定义 | 真隔离执行 |
| 时机 | 派发 Agent 前 | 派发时 |
| 关系 | 提供 ROLE_DEF | 执行具体 Task |

盘稿是角色定义的落盘记录，Agent 是执行工具。两者互补但不替代。
