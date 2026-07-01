# Google Sheets 询盘表配置说明（中文）

这份文档用于把 Xingyue Jewelry 网站的 Inquiry / Contact 表单连接到 Google Sheets。

重要安全提醒：

- 不要把 Google Service Account JSON、`private_key`、邮箱密码或任何密钥发给别人，也不要发给 Codex。
- 不要把 JSON key 文件提交到 GitHub。
- Vercel 只需要保存环境变量；网站前台不会显示任何 Google 密钥。

官方参考：

- Google Sheets API 概览：https://developers.google.com/workspace/sheets/api/guides/concepts
- Google Sheets API Node.js Quickstart：https://developers.google.com/workspace/sheets/api/quickstart/nodejs
- Google Cloud 创建 Service Account：https://cloud.google.com/iam/docs/service-accounts-create
- Google Cloud 创建/删除 Service Account key：https://cloud.google.com/iam/docs/keys-create-delete
- Vercel Environment Variables：https://vercel.com/docs/environment-variables
- Vercel 管理环境变量：https://vercel.com/docs/environment-variables/managing-environment-variables

---

## 1. 在 Google Cloud 开启 Google Sheets API

1. 打开 Google Cloud Console：https://console.cloud.google.com/
2. 选择一个已有项目，或新建一个项目，例如 `xingyue-jewelry-inquiry`。
3. 左上角菜单进入 `APIs & Services` → `Library`。
4. 搜索 `Google Sheets API`。
5. 打开结果后点击 `Enable`。

说明：Google 官方文档要求在调用 Google APIs 前先为 Cloud 项目启用对应 API。

---

## 2. 创建 Service Account

1. 在 Google Cloud Console 左侧菜单进入 `IAM & Admin` → `Service Accounts`。
2. 点击 `Create service account`。
3. 填写名称，例如：
   - Service account name: `xingyue-sheets-inquiry`
   - Service account ID: 自动生成即可
4. 点击 `Create and continue`。
5. 如果页面要求分配角色，可以先跳过项目级角色；这个网站只需要访问你分享给它的那一个 Google Sheet。
6. 点击完成。

完成后你会看到一个 Service Account 邮箱，格式类似：

```text
xingyue-sheets-inquiry@your-project-id.iam.gserviceaccount.com
```

这个邮箱就是后面要用的 `GOOGLE_SHEETS_CLIENT_EMAIL`。

---

## 3. 下载 JSON key

1. 仍然在 `IAM & Admin` → `Service Accounts`。
2. 点击刚创建的 service account。
3. 打开 `Keys` 标签页。
4. 点击 `Add key` → `Create new key`。
5. 选择 `JSON`。
6. 点击 `Create`，浏览器会下载一个 `.json` 文件。

安全提醒：

- 这个 JSON 文件就是密钥文件，不要上传到 GitHub。
- 建议把文件临时放在本机安全位置，只用于复制环境变量。
- 如果你把文件命名成 `xingyue-service-account.json` 或 `google-credentials.json`，项目的 `.gitignore` 已经会忽略这类文件。

---

## 4. 从 JSON key 找到需要的字段

用本机文本编辑器打开下载的 JSON 文件，找到这两个字段：

```json
{
  "client_email": "...",
  "private_key": "..."
}
```

对应关系：

- `client_email` → Vercel 环境变量 `GOOGLE_SHEETS_CLIENT_EMAIL`
- `private_key` → Vercel 环境变量 `GOOGLE_SHEETS_PRIVATE_KEY`

注意：

- 不要复制整个 JSON 文件到 Vercel。
- `private_key` 一般包含 `-----BEGIN PRIVATE KEY-----` 和 `-----END PRIVATE KEY-----`。
- Vercel 里如果显示为一行，保留里面的 `\n`；代码已经兼容把 `\n` 转回真实换行。

---

## 5. 新建 Google Sheet

1. 打开 Google Sheets：https://sheets.google.com/
2. 新建一个空白表格。
3. 表格名称建议改为：`Xingyue Jewelry Inquiries`。
4. 左下角默认会有一个 tab，通常叫 `Sheet1`。
5. 双击 tab 名称，把它改成：

```text
Inquiries
```

注意：`Inquiries` 大小写要和 Vercel 环境变量里的 `GOOGLE_SHEETS_SHEET_NAME` 完全一致。

---

## 6. 把 Google Sheet 分享给 Service Account

1. 在 Google Sheet 右上角点击 `Share`。
2. 把 service account 邮箱粘贴进去，例如：

```text
xingyue-sheets-inquiry@your-project-id.iam.gserviceaccount.com
```

3. 权限选择 `Editor`。
4. 点击 `Share` 或 `Send`。

说明：Service Account 不是普通 Gmail 用户，但它有一个邮箱地址。只要把 Sheet 分享给这个邮箱，它就能写入这一个表格。

---

## 7. 找到 Spreadsheet ID

打开你的 Google Sheet，浏览器地址通常类似：

```text
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890/edit#gid=0
```

中间 `/d/` 和 `/edit` 之间的这一段就是 Spreadsheet ID：

```text
1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

这个值填到：

```text
GOOGLE_SHEETS_SPREADSHEET_ID
```

---

## 8. 在 Vercel 添加环境变量

1. 打开 Vercel Dashboard。
2. 进入项目 `xingyue-jewelry`。
3. 进入 `Settings` → `Environment Variables`。
4. 添加下面 4 个必填变量：

```env
GOOGLE_SHEETS_CLIENT_EMAIL=你的 service account client_email
GOOGLE_SHEETS_PRIVATE_KEY=你的 service account private_key
GOOGLE_SHEETS_SPREADSHEET_ID=你的 Google Sheet ID
GOOGLE_SHEETS_SHEET_NAME=Inquiries
```

建议环境选择：

- `Production`：正式域名表单写入 Google Sheets 必须添加。
- `Preview`：如果你想在 Vercel Preview 上测试，也添加。
- `Development`：如果你用 Vercel CLI 本地同步环境变量，可添加；普通本地开发也可以使用 `.env.local`。

可选测试变量：

```env
INQUIRY_TEST_TOKEN=你自己设置的一串随机字符
```

这个变量只用于保护 Vercel 上的测试写入接口。不要把这个 token 发给别人。

---

## 9. Redeploy Production

Vercel 环境变量改完后，不会自动影响已经部署过的旧版本。需要重新部署。

做法：

1. Vercel 项目页进入 `Deployments`。
2. 找到最新的 Production 部署。
3. 点击右侧菜单，选择 `Redeploy`。
4. 等状态变成 `Ready`。

也可以在合并到 main 后，由 GitHub 自动触发新的 Production Deployment。

---

## 10. 检查环境变量是否已经被网站识别

网站新增了一个只返回 true / false 的检查接口，不会显示任何密钥内容：

```text
https://xingyuejewelry.com/api/inquiry-config
```

正常配置完成后应该类似：

```json
{
  "ok": true,
  "ready": true,
  "variables": {
    "GOOGLE_SHEETS_CLIENT_EMAIL": true,
    "GOOGLE_SHEETS_PRIVATE_KEY": true,
    "GOOGLE_SHEETS_SPREADSHEET_ID": true,
    "GOOGLE_SHEETS_SHEET_NAME": true
  }
}
```

如果 `ready` 是 `false`，看哪个变量是 `false`，回到 Vercel 补齐后重新部署。

---

## 11. 测试 Google Sheets 是否能写入

### 本地 development 测试

1. 在 `.env.local` 中填入 4 个 Google Sheets 环境变量。
2. 启动本地网站：

```powershell
npm run dev
```

3. 新开一个 PowerShell，执行：

```powershell
Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/inquiry-config/test-write"
```

如果成功，会返回：

```json
{
  "ok": true,
  "success": true
}
```

然后打开 Google Sheet 的 `Inquiries` tab，应该看到一条测试数据。

### Vercel Preview / Production 受保护测试

1. 在 Vercel 环境变量中添加 `INQUIRY_TEST_TOKEN`。
2. Redeploy 对应环境。
3. 执行：

```powershell
Invoke-RestMethod `
  -Method POST `
  -Uri "https://你的域名或preview域名/api/inquiry-config/test-write" `
  -Headers @{ "x-inquiry-test-token" = "你设置的 INQUIRY_TEST_TOKEN" }
```

成功后会返回：

```json
{
  "ok": true,
  "success": true
}
```

测试完成后，可以在 Google Sheet 里删除这条测试行。

---

## 12. 测试真实询盘表单

1. 打开网站 Contact 页面：

```text
https://xingyuejewelry.com/contact
```

2. 填写测试询盘，例如：
   - Name: `Test Buyer`
   - Company: `Test Company`
   - Email: `buyer@example.com`
   - WhatsApp / Phone: `+1 555 0000`
   - Country: `United States`
   - Product Interest: `Lab grown diamond rings`
   - Quantity: `100 pieces`
   - Custom Requirement: `14K gold, private label packaging`
   - Message: `Testing inquiry form integration`
3. 点击提交。
4. 如果显示 24 小时内联系你的成功提示，去 Google Sheet 检查是否新增了一行。

如果环境变量还没配置好，前台会显示友好提示：

```text
Inquiry service is being configured. Please contact us by WhatsApp or email.
```

阿语和西语页面也会显示对应语言的提示。

---

## 13. 常见问题

### Q: 表单提示配置中，Google Sheet 没有数据

检查：

1. `/api/inquiry-config` 里 4 个变量是否全部为 `true`。
2. Vercel 添加变量后是否已经 Redeploy。
3. Google Sheet 是否已经分享给 service account 邮箱。
4. Share 权限是否为 `Editor`。
5. tab 名称是否准确等于 `Inquiries`。
6. `GOOGLE_SHEETS_SPREADSHEET_ID` 是否只复制了 `/d/` 和 `/edit` 之间的 ID。

### Q: 我应该把 JSON key 文件放到项目里吗？

不要。只需要从 JSON 里复制 `client_email` 和 `private_key` 到 Vercel 环境变量。JSON key 文件不要提交到 GitHub。

### Q: Google Sheets 里的表头为什么是中文？

这是为了后台查看方便。前台客户看到的英文、阿语、西语表单不会变成中文。

### Q: 正式站客户询盘会写到本地文件吗？

不会。Production 环境必须写入 Google Sheets。如果 Google Sheets 环境变量缺失，表单会提示客户用 WhatsApp 或 Email 联系，不会把正式询盘长期写到本地文件。
