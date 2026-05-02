---
title: 军令状五要素
description: 军团模式的军令状制度 — 冻结目标、硬约束、非目标、成功标准
---

# 军令状五要素

军令状（Mission Brief）是军团模式的**核心约束文档**，在阶段四冻结后贯穿整个执行周期。

---

## 五要素

<table class="charter">
  <tr>
    <th>#</th>
    <th>要素</th>
    <th>说明</th>
    <th>修改权</th>
  </tr>
  <tr>
    <td>①</td>
    <td><strong>原始需求</strong></td>
    <td>用户原话，不得改写</td>
    <td>🚫 禁止</td>
  </tr>
  <tr>
    <td>②</td>
    <td><strong>冻结目标句</strong></td>
    <td>一句话描述要做成什么</td>
    <td>仅用户</td>
  </tr>
  <tr>
    <td>③</td>
    <td><strong>硬约束</strong></td>
    <td>不可逾越的技术/业务/合规底线</td>
    <td>仅用户</td>
  </tr>
  <tr>
    <td>④</td>
    <td><strong>非目标</strong></td>
    <td>明确不做什么，防止范围蔓延</td>
    <td>仅用户追加</td>
  </tr>
  <tr>
    <td>⑤</td>
    <td><strong>成功标准</strong></td>
    <td>可验证的验收条件</td>
    <td>仅用户</td>
  </tr>
</table>

---

## 穿透规则

### 军团 L3 内部

每个 L3 角色（EX/MG/OP）的 Agent 正文**必须携带军令状全文或落盘路径**。

### 蜂群 L2（末端）

蜂群 R1–R4b 至少携带 **②③⑤** 及 **`[PENETRATING]`** 原文标记。

---

## 军令状示例

```markdown
# MISSION-BRIEF: LEGION-NEWS-HUB-001

## ① 原始需求
用户原话："做一个 AI 新闻聚合站，自动抓取并分类"

## ② 冻结目标句
构建一个多源 AI 新闻聚合 Web 应用，支持自动抓取、
分类、搜索和个性化推荐。

## ③ 硬约束
- 不得存储全文（仅存摘要+链接）
- 必须支持中英文
- 部署在 Vercel 免费层限额内
- API 密钥不得暴露在前端

## ④ 非目标
- 不做评论/社交功能
- 不做原创内容发布
- 不做付费订阅

## ⑤ 成功标准
- 至少 5 个新闻源正常抓取
- 搜索响应 < 500ms
- 移动端可访问
- Lighthouse 评分 ≥ 80
```
