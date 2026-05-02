# CHAIN-STATE — {CHAIN-ID}

<!-- 使用说明：复制本模板到 .claude/swarm/chains/{CHAIN-ID}/CHAIN-STATE.md 或
     .claude/swarm/legion/chains/{CHAIN-ID}/CHAIN-STATE.md（军团链）。
     前 20 行为精简下限区，统帅零 Read 外文件即可回答目标句+P0+裁决。 -->

updated: {ISO-8601}  round: {N}  mode: swarm|legion

## §A 精简下限区

- **目标句**: {一句话}
- **验收裁决**: {PASS / COND_PASS / FAIL + TC 编号，或「无（首轮）」}
- **active P0**: {TC-B-001(OPEN), TC-E-001(PASS)...}
- **三字段**: {执行者(A/B)} | {人设(A/B)} | {用途(A/B)}
- **ROUND**: {N} | **snapshot_at**: {写入时的 ROUND}
- **open_COND_count**（可选）: {n≤8} — 第 9 条 open 时须最旧 open→expired 并风险登记，见技能 `22` §10

## §B 冻结条

<!-- 生命周期：active / superseded / archived / invalidated
     - active：当前有效
     - superseded：被新条替代（填废止指针）
     - archived：compaction 时移入，仅保留 1 行墓碑；墓碑 >20 行时清理到最近 5 行
     - invalidated：BREAKING 变更推翻后标记，关联 Gate 须重验 -->

| ID | 摘要(≤40字) | 等级 | 状态 | 来源轮次 | 废止指针 |
|----|------------|------|------|----------|----------|

## §C Gate 裁决区（仅 legion）

| Gate | 裁决 | COND_ID 列表 | 理由（不可压缩）| 轮次 |
|------|------|-------------|----------------|------|

## §D COND 追踪区

<!-- 硬上限：≤8 条 open；第 9 条触发强制降级（最旧 open → expired + 风险登记）。
     expired 条目不计入 8 条配额。 -->

| COND_ID | 条件描述 | 状态(open/cleared/expired) | 关联 Gate/TC | 截止轮次 |
|---------|---------|---------------------------|-------------|----------|

## §E 军令状指针区（仅 legion）

<!-- pinned_level：full / skeleton / id-only
     降级触发：L1 > 预算 80% → skeleton；> 95% → id-only
     恢复：用户提及架构/军令状时 Read 回全文 -->

- pinned_level: full
- mission_brief: {.claude/swarm/legion/chains/{CHAIN}/MISSION-BRIEF.md}
- architecture: {.claude/swarm/legion/chains/{CHAIN}/ARCHITECTURE.md}
- dag_schedule: {.claude/swarm/legion/chains/{CHAIN}/SCHEDULE.md}

## §F EP 归档区（仅 legion）

| EP | 角色 | 状态 | 摘要(≤80字) | 落盘路径 | →§B 指针 |
|----|------|------|------------|---------|----------|

## §G 最近 delta（保留最近 2 轮）

<!-- 增量格式标记：
     [+] 新增  [~] 变更  [=] 验收进展  [!] 待决/告警
     [!CONFLICT] 矛盾  [→] 下轮指令 -->
