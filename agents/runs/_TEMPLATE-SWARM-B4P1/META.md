# 链元数据（模板 · 勿改目录名为生产链）

| 字段 | 填写 |
|------|------|
| CHAIN-ID | 复制整夹到 `runs/<你的链ID>/` 后，**全文替换** `_TEMPLATE-SWARM-B4P1` → 真实 ID |
| 模式 | 蜂群（4+1） |
| WAVE | 1（多波次递增） |
| 冻结目标句 | 见 `.claude/swarm/chains/<CHAIN>/CHAIN-STATE.md` 或本轮用户冻结原句 |
| 三字段指针 | 执行者身份 / 人设 / 下游用途（A/B/C） |

**派发 Task**：正文须含 **`ROLE_DEF=@.claude/agents/runs/<CHAIN-ID>/swarm-<角色>.md`**（路径与目录名一致）。若同步到 `.claude/agents/` 根目录，各文件 frontmatter **`name`** 须**全局唯一**。

**完整 frontmatter 字段说明**：`../_ROLE-MD-FULL-TEMPLATE.md`。
