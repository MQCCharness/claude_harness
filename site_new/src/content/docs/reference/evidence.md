---
title: 验收与证据分级
description: A/B/C 证据等级 + TC 编号体系 + PASS/FAIL 裁决标准
---

# 验收与证据分级

Swarm/Legion 体系要求所有结论附带可复核的证据。证据分为三个等级。

---

## 证据分级 (A/B/C)

<table class="charter">
  <tr>
    <th>等级</th>
    <th>含义</th>
    <th>示例</th>
    <th>可写入已拍板</th>
  </tr>
  <tr>
    <td><strong>A</strong></td>
    <td>可验证</td>
    <td>URL+条款、命令+退出码+输出、路径+行号、TC 编号</td>
    <td>✅ 是</td>
  </tr>
  <tr>
    <td><strong>B</strong></td>
    <td>待核实</td>
    <td>逻辑自洽但未对外复核</td>
    <td>❌ 否（须标注）</td>
  </tr>
  <tr>
    <td><strong>C</strong></td>
    <td>观点</td>
    <td>偏好、经验法则、无证据链</td>
    <td>❌ 否（仅作备选）</td>
  </tr>
</table>

---

## TC 编号体系

| 前缀 | 含义 | 示例 |
|------|------|------|
| **TC-B-** | 业务/契约类 | TC-B-001: 用户登录返回 JWT |
| **TC-E-** | 工程/构建类 | TC-E-001: `npm run build` 退出码 0 |

---

## 优先级

| 级别 | 含义 | 不通过后果 |
|------|------|----------|
| **P0** | 阻断级 | FAIL — 不得收束 |
| **P1** | 重要 | COND_PASS — 可收束但需记录 |

---

## 裁决

| 裁决 | 条件 |
|------|------|
| **PASS** | P0 全部通过 |
| **COND_PASS** | P0 通过，P1 有未闭环 |
| **FAIL** | 任一 P0 未通过 |

---

## R4a 清单示例

```markdown
# R4A-FROZEN: feature-x

## TC-B (业务/契约)

| ID | 描述 | 优先级 | 状态 |
|----|------|--------|------|
| TC-B-001 | 正常输入返回 200 + 预期 JSON | P0 | PASS |
| TC-B-002 | 空输入返回 400 + 错误信息 | P0 | PASS |
| TC-B-003 | 超长输入（>10KB）返回 413 | P1 | FAIL |

## TC-E (工程/构建)

| ID | 描述 | 优先级 | 状态 |
|----|------|--------|------|
| TC-E-001 | `npm test` 全部通过 | P0 | PASS |
| TC-E-002 | `npm run build` 无警告 | P1 | PASS |

## 裁决：COND_PASS
P0 全过，TC-B-003 (P1) 未闭环。
```
