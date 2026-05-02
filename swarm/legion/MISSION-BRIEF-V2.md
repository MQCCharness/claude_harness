# 军令状 (Mission Brief) — LEGION-SHOWCASE-V2

> CHAIN=LEGION-SHOWCASE-V2 WAVE=1 冻结时间=2026-03-29

## ① 原始需求（禁改）

采用军团模式给我们的蜂群对抗体系输出一个非常精美的HTML网页(对标业内顶尖)去介绍它的实现思路以及对于agent协同工作有何好处网页介绍可以参考行业内相关类似工作的行业精美质量要比他们高内容要比他们丰富同时也要输出一段可以用于AI数字人进行讲解的口播稿。假设你是美术公司，以及文案公司。强制军团模式启动这个任务。

## ② 冻结目标句

为 HajimiDog 蜂群 4+1 对抗体系与军团 L3 编排，输出一份**业内顶尖品质**的静态 HTML 展陈单页（深色沉浸式主题 + 动效 + 交互式叙事）+ 配套 AI 数字人口播稿；内容丰富度与视觉品质**超越** LangGraph / CrewAI / AutoGen 等同类竞品的官方展示页。

## ③ 硬约束

- 静态单 HTML 文件，允许 CDN 依赖（Tailwind CSS / Font Awesome / Google Fonts），无需编译工具链
- 无后端、无密钥、无隐私数据展示
- A/B/C 事实分级纪律贯穿展陈与口播全文
- **[PENETRATING]** 无 A 级来源时不得将市场份额、性能排名、未经核验的统计数字写成已证实事实
- 离线可阅（CDN 不可用时降级但不崩溃）
- 简体中文为主，技术术语可附英文
- 交付路径：`docs/hajimidog-swarm-legion-showcase.html` + `docs/hajimidog-swarm-legion-narration.md`

## ④ 非目标（明确不做）

- 不修改 `CLAUDE.md` 规则文件语义
- 不虚构本仓库未定义的 API 或接口
- 不暗示与任何商业框架的官方合作关系
- 不对 LangGraph / AutoGen / CrewAI 做贬损性拉踩
- 不引入需编译的前端工程（Vite / Webpack 等）
- 不上线后端服务

## ⑤ 成功标准

| SC-ID | 标准 | 验收方式 |
|-------|------|----------|
| SC-1 | HTML 视觉品质达到 Linear.app / Vercel / Stripe 级暗黑科技风 | 统帅 + 用户主观评审 |
| SC-2 | 内容覆盖 ≥12 个 section（痛点 → 体系总览 → 四角色 → 物理隔离 → 时序闸门 → R4 三段式 → 军团 L3 → DAG 与 Phase Gate → 行业对照 → 收益与 ROI → 使用场景 → 参考免责） | 统帅计数 |
| SC-3 | 交互元素：模态框 ≥4、滚动触发动画、hover 效果、Tab/手风琴 | 统帅实测 |
| SC-4 | 口播稿覆盖全部 section 主题，总时长 8–12 分钟（约 3000–4500 字） | 字数统计 + 时长估算 |
| SC-5 | 响应式适配（桌面 / 平板 / 手机） | 浏览器 DevTools 验证 |
| SC-6 | 无障碍基础合规：语义化 HTML、ARIA、键盘导航、对比度 ≥4.5:1 | 统帅抽查 |
| SC-7 | 单文件可直接浏览器打开、无控制台报错 | 统帅实测 |
