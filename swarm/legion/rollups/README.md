# 军团逐级汇流落盘（ROLLUP）

本目录用于存放各 L3 角色 **《逐级主题汇流块》** 的可选落盘稿（便于审计与跨会话对账）。

## 何时写入

- 架构含 **EX / MG / OP** 且执行 **中间层发包**（含统帅代发）时：**推荐**每个参与汇流的角色一份 `ROLLUP-<CHAIN>-<TIER>-<角色slug>.md`。  
- **OP** 下级为蜂群时：块内 **主题摘要** 须为蜂群 +1 收口结果，不把 R1–R4 原文堆进 MG。

## 字段与约束

权威定义见 **`CLAUDE.md §三`**「逐级主题汇流块」专节。Phase Gate **GR1–GR4** 见技能 **`.claude/skills/hajimi-dog/03_AI行为准则/20_军团模式回声校验与规模裁量.md`** §0.2。

## 与渐进闭环的关系

使用 **`PORTING-PROMPT-PROGRESSIVE-CHARTER-LOOP.zh-CN.md`** 时，波次收口包 **§4.2 G** 须与此目录或任务链子目录 **可对账**（指针或 `N/A`）。

## 演练样例

见 **`../rollup-verify-demo/rollups/`**（虚拟 CHAIN，非生产）。
