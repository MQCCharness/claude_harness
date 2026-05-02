# OP 末端交付 — LEGION-NEWS-HUB-001 · ROUND 3

**角色**：叶 OP-末端静态交付实施官  
**锚点**：`CHAIN=LEGION-NEWS-HUB-001` `ROUND=3` `ROLE=OP` `PARENT_REF=EP-1`  
**状态**：静态改动已落盘；**验收裁决由军团统帅实测**，本文件**不**宣告军团/蜂群 PASS/FAIL。

---

## 变更列表

| 区域 | 变更摘要 |
|------|-----------|
| 导航 `role="tab"` 文案 | 「时政入口」「游戏入口」「文娱与社会 · 可核验来源」（与 MG 建议语义对齐）。 |
| 版块一（时政） | 三张卡片替换为：新华网 `https://www.news.cn/politics/`、人民网 `http://politics.people.com.cn/`、央视新闻 `https://news.cctv.com/china/`；区块标题改为「时政入口」；设计参考改为泛化表述并重申非排名主张。 |
| 版块二（游戏） | 三张卡片替换为：IGN、Polygon、GameSpot（URL 与任务书一致）；标题改为「游戏入口」；设计参考链接改为 IGN/Polygon。 |
| 版块三 | BBC Culture、`https://apnews.com/hub/entertainment`、Snopes 链路与机构标注保持；**可见收敛说明**加粗标题并补充「不在页内采编」「以对方原文与更新日期为准」，强化 TC-B-002 可对见的收敛叙事。 |
| Footer | 在审美/参考维度外增加**第三方站点可用性与内容不由本站担保**的短句；并与「无独立 A 级证据则不对流量/排名作主张」合并为一段。 |
| 无障碍 | 维持 `nav role="tablist"`；`aria-selected` 与 `aria-pressed` 在脚本中与当前 panel 同步切换；非活动 `tabpanel` 使用 `hidden`，与 `showPanel` 逻辑一致。 |
| 修改文件 | 仅 `news-triple-hub-legion/index.html`。 |

---

## decisions_log（OP）

1. **人民网协议**：按 MG 硬编码要求保留 `http://politics.people.com.cn/`（未擅自升级为 https），`rel="noopener noreferrer"` 仍保留。
2. **第三 Tab 按钮长度**：采用 MG 全文「文娱与社会 · 可核验来源」单行展示；窄屏下由 `flex-wrap` 自然换行，语义不缩减。
3. **时政设计参考**：外链已切至国内时政入口后，设计参考由具体 BBC 链接改为泛化「国内主流新闻门户时政频道」，避免与卡片来源表意冲突，同时保留「仅版式灵感、非排名主张」。
4. **Footer 合并**：将原「审美参考（非流量排名）」与新增第三方免责、A 级证据与流量主张约束合成为一段，避免重复冗长。

---

## 逐级主题汇流块

| 字段 | 内容 |
|------|------|
| **CHAIN** | `LEGION-NEWS-HUB-001` |
| **ROUND** | `3` |
| **本叶产出** | 单页 HTML 落地 + 本 artifact |
| **直连下级（蜂群）** | N/A（末端 OP，无再下发子代理） |
| **本叶自验（非统帅门禁）** | 本地通读 HTML：三版块各 3 卡、URL 与任务书一致；Tab 切换脚本仍更新 `aria-selected`/`aria-pressed`/`hidden`/`is-active`。 |
| **上送指针（统帅 / 回声校验）** | `news-triple-hub-legion/index.html`；本文件 `artifacts/OP-DELIVERY-ROUND3.md`；军令状与 TC 见 `../MISSION-BRIEF.md`、`../ECHO-CHECK.md`（若存在）。 |

---

## 供统帅实测（提示项，非结论）

- 浏览器打开 `news-triple-hub-legion/index.html`，逐 Tab 切换，确认仅一 panel 可见且焦点/读屏语义合理。
- 逐条点击外链，按 `ECHO-CHECK.md` / TC-E / TC-B 矩阵抽检可达性与文案契约（含第三版块可见收敛说明、Footer 免责与排名主张约束）。
