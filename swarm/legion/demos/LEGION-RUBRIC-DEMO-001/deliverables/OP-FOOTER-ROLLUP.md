# OP-FOOTER 逐级汇流

**TIER**：OP（叶）  
**CHAIN**：`LEGION-RUBRIC-DEMO-001`

---

## 蜂群 4+1 摘要

| 角色 | 核心结论 |
|------|----------|
| R1 | 空/极长/多行/Unicode/RTL、CLI vs 配置优先级、与正文 HTML 策略解耦 |
| R2 | OWASP XSS 速查：HTML body 实体编码、Safe Sinks（textContent 等），A 级链接 |
| R3 | `--footer` 与 `--copyright-file` 互斥 fast-fail；UTF-8 默认；分错误码 |
| R4 | **R4_VERDICT: COND_PASS**（契约级）；P0 XSS 与默认行为已表列 |

---

## 《逐级主题汇流块》

| 字段 | 内容 |
|------|------|
| 本层职责 | 可配置版权行、转义与安全、CLI 配置面 |
| 直连下级 | 蜂群 R1–R4（已收口） |
| 下级到齐状态 | 齐 |
| 主题摘要 | `#export-footer` 纯文本+转义；互斥双源；错误语义分类型 |
| 矛盾与风险 | 若产品要强优先级而非互斥，须回升 EX/MG 改契约 |
| 上送指针 | `swarm-traces/OP-FOOTER-R4-VERDICT.md` |

---

## decisions_log（OP 收口）

| 决策 | 排除 | 理由 |
|------|------|------|
| 采纳互斥双源 | 隐式覆盖 | R3/R1 审计与复现 |
| 默认禁止页脚原始 HTML | 默认富文本 | MG P0 与 OWASP 惯例 |
| R4 COND_PASS | 无运行实现 | 与军令状非目标一致 |
