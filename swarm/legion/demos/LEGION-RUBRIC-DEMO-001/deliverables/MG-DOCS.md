# MG-文档产物线 — HTML 规范与验收口径

**CHAIN**：`LEGION-RUBRIC-DEMO-001`  
**TIER**：MG  
**锚点**：`TIER=MG CHAIN=LEGION-RUBRIC-DEMO-001 ROUND=1`

---

## 上游（EX）摘要 ≤200 字

EX 要求：默认 CLI 行为与数据路径不变；暗色主题为可选；页脚仅 HTML 插槽且安全处理；禁止新外部服务。主题作用在根/body 类名，不破坏正文 DOM。

---

## 单文件 HTML 约束

1. **自包含**：所有样式仍内联或可内联（与现有工具一致）；不新增外链依赖。  
2. **根节点约定**：预留 `html.theme-dark` 或 `body.data-theme="dark"`（最终实现二选一，由 OP-THEME 提案，MG 冻结后写入工具）。  
3. **页脚插槽**：`<footer id="export-footer" class="md-export-footer">` 内为**纯文本或经转义的富文本策略二选一**——默认 **纯文本 + HTML 转义**（P0）。

---

## 插槽与类名（冻结供 OP 消费）

| 插槽 / 区域 | 语义 |
|-------------|------|
| `#export-footer` | 版权行；仅 OP-FOOTER 写入 |
| `html` / `body` | 主题类/属性仅 OP-THEME 写入 |

---

## 验收口径（军团层）

- **TC-B**：默认导出与旧版视觉一致（人工快照或 diff 规范由项目自定）。  
- **TC-B**：`--dark`（示例名）导出含暗色 CSS 变量且对比度见 OP-THEME R4 表。  
- **TC-B**：`--footer "..."` 正确转义，`"><script>` 类负载无害化。  

---

## 《逐级主题汇流块》

| 字段 | 内容 |
|------|------|
| 本层职责 | 定 HTML 壳、插槽、跨 OP 边界 |
| 直连下级 | OP-THEME、OP-FOOTER |
| 下级到齐状态 | 待两叶 OP 蜂群收口 |
| 主题摘要 | 根/body 主题钩子 + footer 插槽 |
| 矛盾与风险 | 若 Markdown 允许原始 HTML，与页脚转义策略需统一为「页脚永远转义」 |
| 上送指针 | `deliverables/MG-DOCS.md` |

---

## decisions_log

| 决策 | 排除项 | 理由 |
|------|--------|------|
| 页脚默认纯文本 + HTML 转义 | 默认允许页脚内联 HTML | 降低 XSS；与内部工具风险匹配 |
| 主题钩子挂在 html/body | 每段加 class | 改动面过大，易与 markdown 样式冲突 |
| 示例 flag 名 `--dark` / `--footer` | 强制采用长短名 | 真名由仓库实现定；MG 仅给示例 |
