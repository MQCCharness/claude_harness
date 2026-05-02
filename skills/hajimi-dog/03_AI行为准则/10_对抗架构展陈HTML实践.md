---
name: adversarial-showcase-html
description: HajimiDog 对抗架构静态展陈页（Tailwind CDN、Modal、区块级 CSS、80 轮双卡错步与 Round 翻牌动画）的合并与迭代经验。在用户维护 HajimiDog_Adversarial_Architecture_Showcase*.html、单页叙事展陈、或把四角色/博弈记录做成可点击 HTML 时使用。
---

# 对抗架构展陈 HTML 实践（HajimiDog Showcase）

本文固化 **`HajimiDog_Adversarial_Architecture_Showcase.html`** 系列迭代中的可复用模式，便于后续改同一套页面或复制到新静态展陈。

---

## 1. 技术选型与约束

* **单文件 HTML**：无构建步骤；**Tailwind CSS** 用 `cdn.tailwindcss.com`，**图标**用 Font Awesome 6（`all.min.css`）。
* **字体**：Google Fonts `Inter` + `@import` 放在 `<style>` 前或首段 style。
* **原则**：**按区块改、按区块加样式**，避免全局选择器污染；与用户确认「只动哪一块」后严格缩窄 diff。

---

## 2. 多版本合并策略（美术 x 交互）

常见情况：一个文件偏**视觉**（如 `Showcase_single.html`：更完整的 bento、Phase 徽章、光晕），另一个偏**交互**（Modal、`modalData`、`openModal(key)`、外链卡片）。

* **做法**：以交互版为骨架，把「单文件里已验证的 HTML 片段」**整段移植**过来，再补上 `onclick="openModal('...')"`。
* **物理隔离区块**：底图（Unsplash 低透明度 + `mask`）+ 可选 SVG 蓝图平铺（`data:image/svg+xml`）来自「美术版」；三张卡的**展开正文**放在 `modalData` 的独立 key（如 `isolation-brain`），**表面文案**保持示意图/文档一致。
* **4+1 区块**：统帅 + Phase 1–4 的 markup 可与 `single` 对齐；子栅格内 hover 可保留；**整张卡**绑定一个 `openModal`，不必给子卡单独点击（避免与「整卡深入」叙事冲突）。

---

## 3. 样式隔离（必做）

凡只服务某一节的动画或布局，用 **section 根 id** 挂所有新增选择器，避免影响 Hero、外链 bento、Modal：

```css
#section-record-80 .record80-panel { ... }
```

旧的全局类名（如 `.bento-card`）尽量**不**改定义，只在区块内加修饰类或子选择器。

---

## 4. Modal 数据驱动

* 单一对象 `modalData[key] = { title, content }`，`title`/`content` 可用反引号 HTML 字符串（含 Tailwind 工具类）。
* `openModal` / `closeModal` + 点击遮罩关闭 + `Escape`；`body.modal-open { overflow: hidden }`。
* **外链区块**（如 LangGraph、CrewAI）保持 `<a target="_blank">`，不要用 Modal 替代，除非用户明确要求。

---

## 5. Hero 区与示意图对齐

* **大标题**两行：第一行可用 `text-gradient`，第二行 `text-gradient-accent`（与现有 class 一致即可）。
* **副标题**、**CTA 文案与样式**以用户提供的截图/文案为准单独替换；**不要**顺带改徽章（如 `Interactive V3.0`）除非用户要求。
* CTA：`rounded-full`、`font-bold`、白色按钮 + 轻 `shadow-[0_0_30px_rgba(255,255,255,0.2)]`，`href="#architecture"`。

---

## 6. 「80 轮实录」动态模拟器（核心模式）

### 6.1 数据

* 使用 **成对** 步骤：`{ kind:'q'|'a', round, track, tone, text }`，每对占两行；`pairIndex` 步进，`pairCount = steps.length / 2`。
* `tone`：`red` / `blue` / `emerald`，映射到赛道标题色与卡片顶边 `border-t-*`，与下方三张可点卡一致。

### 6.2 布局

* **上方**：`模拟回合` + **大号 Round** + 彩色 `track` 标题。
* **下方**：**左出题 / 右应答** 两列（`md:grid-cols-2`），窄屏纵向堆叠。

### 6.3 时间顺序（错步入场）

* 内容写入后：先给 **左卡** 加 `record80-panel--shown`（opacity + translateY 过渡），**约 400ms 后**再给右卡，体现「先问后答」。
* 切换下一组前：两卡去掉 `shown`，短延迟（如 320ms）再写入新内容并重复错步，避免与 Round 动画叠在一起难以辨认。

### 6.4 Round「翻牌」切换

* 外层容器设 **`perspective`**（如 720px），内层 Round 元素加 **`transform-style: preserve-3d`**。
* **轮次数字变化**时：`animationend` 监听两段 keyframes——先 **`rotateX` 翻出**（out），换 `textContent`，再 **`rotateX` 翻入**（in）；结束移除 class 以便下次可再次触发。
* **首次展示**或 **round 数字与上一组相同**（如不同赛道同为 Round 2）可**跳过**翻牌，减少噪音。
* 注意：`e.animationName` 需与 `@keyframes` 名称一致（如 `record80RoundOut`）；若浏览器前缀导致不匹配，可改为 `includes('record80Round')` 兜底。

### 6.5 性能与可用性

* 用 **`IntersectionObserver`**：区块离开视口 **clearInterval**，进入再 **setInterval**，避免后台空转。
* 轮播间隔需大于「收起 + 错步 + Round 翻牌」总时长（实践中约 **4s+** 较稳）。
* 模拟器容器加 **`aria-live="polite"`**，方便读屏感知内容更替（不必过度播报）。

---

## 7. 多副本同步

若存在 **`Showcase.html`、`Showcase -2.html`、`1.html`** 等副本，用户期望一致行为时：**同一套 CSS + HTML 片段 + 脚本** 应同步 patch，避免一份已双卡翻牌、另一份仍单条 ticker。合并前先 `grep record80` / `section-record-80` 确认结构版本。

---

## 8. 与体系内文档的关系

* **叙事与术语**以 `09_任务驱动型四角色对抗开发工作流.md`、`07_四角色混沌对抗架构.md` 为准；HTML 只负责**展陈与跳转**，不替代技能正文。
* 修改本技能目录下任意 `.md` 后，在**仓库根**执行：`python .claude/skills/hajimi-dog/skills_linter.py`。

---

## 9. 检查清单（改完自查）

* [ ] 是否只改了约定区块？Hero / 4+1 / 隔离 / 2026 外链 / Modal 是否无意中被全局样式影响？
* [ ] 三张「实录」底卡是否仍 **`openModal('record-*')`**？
* [ ] 新开 CSS 是否都挂在 **`#section-...`** 下？
* [ ] 80 轮脚本是否在 **DOMContentLoaded** 内取元素，且 **null** 时安全退出？
* [ ] 多副本文件是否已对齐？
