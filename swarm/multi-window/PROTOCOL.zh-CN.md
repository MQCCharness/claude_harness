# 多窗口人工蜂群 — 协作协议（主帅 + 多 Agent 窗口）

## 1. 目标

- 用**多个长期打开的 Claude Code 对话窗口**分别扮演 R1/R2/R3/R4（可裁量只开部分）。
- 用**仓库内公共路径**代替「口头传话」，降低组合失忆与串台。
- **主帅窗口**负责：读各角色文件 → 汇流 → 拍板 → 转化 → 写码或下发下一窗口任务。

**与 Agent 子代理 的关系**：这是**你主动选择的人工流程**；规则里「非统帅须 Task 隔离」的底线仍以 `CLAUDE.md §二` 为准。若你采用本协议，建议在主帅窗口**首条声明**：本轮使用「人工多窗口 + 文件总线」，并自行承担串台风险。

## 2. 目录结构（本工作区）

```
.claude/swarm/multi-window/
  PROTOCOL.zh-CN.md      ← 本协议
  QUICKSTART.zh-CN.md    ← 上手（含「脚本 + current」免路径粘贴）
  LAST-ROUND.pointer     ← 每轮覆盖：首行 current 相对路径，次行 round_id
  scripts/
    New-SwarmRound.ps1   ← 刷新 inbox/current/，写 META + ROUND.meta.json + 指针 + HANDOFF 壳
  templates/             ← 模板源（含 HANDOFF.template.md）
  inbox/
    current/             ← 【推荐】永远指向「当前一轮」；由脚本生成
    archive/             ← 脚本自动归档旧 current
    （或手工 round-xxx/）
```

**禁止**：各角色直接改别人的 `R*.md`（除非主帅要求修订）；**主帅**可改任意文件做合并说明，但建议在 `COMMANDER.md` 留痕。

## 3. 每轮流程

### 3A. 推荐：脚本 + `inbox/current/`（少粘贴）

1. 工作区根执行：`scripts/New-SwarmRound.ps1 -Goal "..."`（可选 `-Roles`）。
2. 将**同一条**广播消息发到 R1–R4 各窗口（脚本写入剪贴板或见 `current/PASTE-TO-ALL-ROLE-WINDOWS.txt`）。
3. 各窗先 Read `current/META.md`，再只编辑对应的 `current/Rx.md`。
4. **主帅** Read `current/R*.md`，写 **`current/COMMANDER.md`**；建议补全 **`current/HANDOFF.md`**（冻结事实 + 路径指针，供下一轮），按需追加 `../RECENT-DECISIONS.md`。机器指针见同目录 **`ROUND.meta.json`** 与上级 **`LAST-ROUND.pointer`**。

### 3B. 备选：手工 `inbox/round-xxx/`

1. **主帅** 在 `inbox/` 创建 `round-20250321-ui-auth/`（命名自定，建议含日期+主题）。
2. 从 `templates/` 复制出 `R1.md` `R2.md` `R3.md` `R4.md`（或只建需要的）。
3. 在每个文件顶部填：**轮次名、当前用户目标一句、截止条件**。
4. 在 **R1 窗口** 发消息：`请 Read 并编辑 <工作区绝对路径>/.../inbox/round-xxx/R1.md，按模板补全后保存。不要读其它 R 文件。`
5. 同理 R2/R3/R4（**最小信息**：不要塞完整聊天史）。
6. **主帅** Read 全部 `R*.md`，写 **`COMMANDER.md`**，内容至少包含：
   - 转化表（R1/R2 → R3 / R4 / 风险 / 待用户）
   - 每条「已拍板」结论的 **A/B/C**（可验证分级，见规则与技能 14）
   - 下一轮动作（开哪个窗口、改哪个路径）
7. 需要跨会话继承时：主帅把拍板摘要 **追加** 到 `../RECENT-DECISIONS.md`（与既有蜂群落盘一致）。

## 4. 防冲突

- **一角色一文件**；合并用语在 `COMMANDER.md`。
- 若用 Git：每轮开始前 `git pull`，写完 `git add` 该轮文件夹，减少并行覆盖（两人协作时尤其重要）。

## 5. 与「新 Agent」窗口

每个窗口应是 Claude Code 里**新的** chat session（你说的「新 agent」）。  
**没有** API 能代你批量创建窗口；**开场**仍靠各窗贴一次「系统角色提示词」；**每轮任务**推荐用 `New-SwarmRound.ps1` + **一条广播**（见 §3A），减少路径复制。

## 6. 路径写法

- **current 模式**：各窗只用**相对工作区根**的 `.claude/swarm/multi-window/inbox/current/META.md` 与同目录 `Rx.md`，**不必**每轮换绝对路径。
- **手工 round 模式**：发给各窗口时尽量给 **绝对路径**，避免歧义。
- 规则/技能中引用仍以 `.claude/...` 相对工作区根为准。

## 7. 仍做不到的事

- 不能由脚本**自动打开**多个 Claude Code 窗口；只能**减少**你要复制的内容（一条广播 + 脚本生成文件）。
- 若希望「零点击」，只能依赖将来平台产品能力或外部桌面自动化（易碎），本仓库不依赖。

## 8. 传递链路与常见隐患（对照 4+1 规则）

| 隐患 | 表现 | 缓解 |
|------|------|------|
| **陈旧 current** | 某窗仍按旧路径编辑，覆盖错轮 | 每轮开头跑脚本；以 **`LAST-ROUND.pointer` + `ROUND.meta.json`** 的 `round_id` 对齐 |
| **口头无指针** | 新会话把闲聊当 A 级事实 | 主帅汇流写 **`HANDOFF` / `RECENT-DECISIONS`** 或显式声明不落盘与风险 |
| **多源冲突** | `COMMANDER` 与落盘裁决矛盾 | 以 **`CLAUDE.md` + 已落盘** 为准；废止须写 **→ 新锚点** |
| **密钥误入总线** | token 写进 `R*.md` / HANDOFF | **禁止**；只写环境名或密钥管理器指引 |
| **黑盒混实现** | 把 diff/函数名塞进给 R4 的接力 | 默认只传 **契约**；白盒须用户明示 |
| **并发覆盖** | 两人同改 `current/` | Git 拉取/提交粒度到本轮目录；或单写者 |

**与 Agent 子代理**：文件总线减轻「口头传话」；规则中的 **最小信息、R4 黑盒、resume 边界**仍适用，见 `CLAUDE.md §二` 中「蜂群记忆与跨轮接力」。
