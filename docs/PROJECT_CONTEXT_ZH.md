# Xingyue Jewelry 项目长期上下文

最后更新：2026-07-11。

这份文档是写给网站所有者看的项目总说明。以后如果开启新的 Codex / Claude Code 任务，可以让新的任务先读 `AGENTS.md` 和 `docs/CODEX_HANDOFF.md`，再读本文件了解业务背景。

## 一、项目基本信息

- 项目名称：Xingyue Jewelry / Star & Moon Jewelry。
- 网站类型：B2B 培育珠宝 / 培育宝石独立站。
- 技术栈：Next.js App Router、TypeScript、React、Tailwind CSS、Vitest。
- 部署平台：Vercel。
- GitHub 仓库：`mia09092026-cell/xingyue-jewelry`。
- 正式域名：`https://xingyuejewelry.com`。
- 网站定位：B2B 询盘站，不是普通零售商城。
- 主要客户：海外珠宝批发商、品牌商、定制客户、OEM/ODM 客户、private label 客户。

## 二、已经完成的重要功能

- 英文主站。
- 阿语 `/ar` 页面。
- 西语 `/es` 页面。
- 阿语 RTL 从右到左排版支持。
- SEO title、meta description、canonical、hreflang。
- sitemap。
- WhatsApp 联系入口。
- 企业邮箱展示和 mailto 链接。
- Google Sheets 询盘表单。
- `/api/contact/health` 健康检查接口。
- `/lab-grown-gemstones` 培育宝石英文目录页。
- Lab-Grown Gemstones by Color 页面结构。
- B2B 参考价格区间和价格免责声明。
- Payment Options 展示区。
- Header 导航已包含 `Lab-Grown Gemstones`。
- Footer 页面链接通过共享导航包含 `Lab-Grown Gemstones`。

说明：首页目前已有培育宝石相关集合内容；如果要明确增加单独的 `Lab-Grown Gemstones by Color` 首页小模块，需要以后在当前分支或正式站再次确认。

## 三、重要联系方式

- WhatsApp：`+8613324888759`
- WhatsApp 链接：`https://wa.me/8613324888759`
- 企业邮箱：`sales@xingyuejewelry.com`
- 邮件链接：`mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry`

这些联系方式不要删除。即使 Google Sheets 表单出现问题，也要保留 WhatsApp 和企业邮箱作为客户备用联系渠道。

## 四、Google Sheets 询盘表单状态

- 表单提交 API：`/api/contact`
- 健康检查接口：`/api/contact/health`
- Google Sheet tab 名称：`Inquiries`
- Google Sheets 后台表头使用中文，方便内部跟进询盘。
- 当前优先使用 V2 环境变量：
  - `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
  - `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- 继续使用原变量：
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SHEET_NAME`

重要安全要求：

- 不要在文档里写入 private key。
- 不要写完整 Service Account JSON。
- 不要写 `.env` 内容。
- 不要写客户询盘数据。
- 不要把 Google Service Account JSON 文件提交到 GitHub。

## 五、环境变量规则

Vercel 里需要这些环境变量名称，但文档和代码提交里不能出现真实值：

- `GOOGLE_SHEETS_CLIENT_EMAIL_V2`
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_SHEET_NAME`

说明：

- `GOOGLE_SHEETS_PRIVATE_KEY` 必须来自 Service Account JSON 的 `private_key` 字段。
- `GOOGLE_SHEETS_CLIENT_EMAIL_V2` 必须是 Service Account 邮箱，通常包含 `iam.gserviceaccount.com`。
- `GOOGLE_SHEETS_SPREADSHEET_ID_V2` 必须是 Google Sheet URL 里 `/d/` 和 `/edit` 中间的 ID。
- `GOOGLE_SHEETS_SHEET_NAME` 默认是 `Inquiries`。
- 修改 Vercel 环境变量后，必须重新 Redeploy Production，新的环境变量才会生效。

## 六、安全规则

以后任何任务都要遵守：

- 不要提交 `.env`。
- 不要提交 `.env.local`。
- 不要提交 `.env.production`。
- 不要提交 Google JSON key。
- 不要提交 private key。
- 不要提交客户询盘数据。
- 不要删除 WhatsApp。
- 不要删除企业邮箱。
- 不要破坏 Google Sheets 表单。
- 不要破坏多语言路由。
- 不要破坏 sitemap 和 hreflang。
- 不要随便下载第三方图片。
- 不要复制 GEMSTONESAFE.com 的图片、代码、文案、产品数据、logo 或品牌元素。

## 七、设计和内容方向

- 网站风格要高级、简洁、欧美 B2B 风格。
- 不要淘宝风。
- 不要低价零售商城风。
- 价格只作为参考区间，不作为最终承诺。
- 核心目标是让客户提交询盘。
- 产品卡片按钮优先走询盘表单、WhatsApp 或 Email。
- 先不做复杂购物车。
- Payment Options 只展示可支持的 B2B 付款方式：
  - PayPal invoice。
  - Credit card payment link。
  - Bank transfer / T/T。
  - Wise transfer。
  - Sample order payment。
  - Deposit before production。
  - Balance before shipping。
- 不直接接入真实支付网关，除非以后明确确认。

## 八、常用测试命令

每次提交前都要运行：

```bash
npm run lint
npm run build
npm test
```

如果失败，需要先修复，不能假装通过。

## 九、部署流程

建议流程：

1. 新任务先从 `main` 新建 `codex/...` 分支。
2. 修改代码或文档。
3. 运行 lint / build / test。
4. 推送分支，生成 Vercel Preview。
5. 我确认 Preview 后再合并 `main`。
6. 合并后等待 Vercel Production Ready。
7. 检查正式站链接。

不要默认直接改 `main`，除非我明确说可以直接部署正式站。

## 十、重要正式链接

- `https://xingyuejewelry.com`
- `https://xingyuejewelry.com/contact`
- `https://xingyuejewelry.com/api/contact/health`
- `https://xingyuejewelry.com/lab-grown-gemstones`
- `https://xingyuejewelry.com/sitemap.xml`
- `https://xingyuejewelry.com/ar`
- `https://xingyuejewelry.com/es`

## 十一、后续待办事项

- 检查 `/lab-grown-gemstones` 页面图片是否需要替换。
- 增加更多真实培育宝石图片。
- 给 `/lab-grown-gemstones` 增加阿语和西语版本。
- 持续检查 Add to Inquiry 是否能正确带入产品名称。
- 增加颜色分类独立页面。
- 增加更多培育宝石产品数据。
- 持续检查 Google Sheets 表单写入。
- 优化 SEO 内链和导航入口。
- 检查移动端显示。

## 十二、以后给 Codex / Claude Code 的开工提示

可以直接说：

“请先读取 `AGENTS.md` 和 `docs/CODEX_HANDOFF.md`，遵守项目安全规则，不要改 Vercel 环境变量，不要提交敏感文件，保护 Google Sheets 询盘表单、WhatsApp、企业邮箱、多语言路由、sitemap 和 hreflang。完成后运行 lint/build/test，并给我 Preview 链接。”
