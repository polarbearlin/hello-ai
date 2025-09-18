# AI 热门前100榜单

一个现代化的 AI 工具榜单网站，展示最受欢迎的 AI 模型、工具、基础设施和智能体。

## 功能特性

- 智能排序：支持综合热度、最新发布、点击量、评分等多种排序方式
- 实时搜索：按名称或描述快速查找 AI 工具
- 分类筛选：模型、工具、基础设施、智能体分类
- 收藏功能：本地存储您喜欢的 AI 工具
- 对比功能：最多选择3个工具进行详细对比
- 响应式设计：完美适配手机、平板和桌面设备
- 暗色模式：支持明暗主题切换

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发环境

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 生产构建

```bash
npm run build
npm run start
```

## 环境变量

创建 `.env.local` 文件：

```env
# Google Sheets CSV URL (可选)
SHEET_CSV_URL=

# 缓存重新验证Token
REVALIDATE_TOKEN=your-secret-token

# Redis配置 (可选)
REDIS_URL=
REDIS_TOKEN=
```

## 数据源配置

### 使用 Google Sheets

1. 创建包含以下列的表格：
   - id, name, url, category, price, openSource, score, desc, logo, clicks7d, createdAt

2. 发布为 CSV：
   - 文件 → 共享 → 发布到网络
   - 选择 CSV 格式
   - 复制链接到 `SHEET_CSV_URL`

### 使用本地数据

默认使用 `src/data/sample-members.json` 中的示例数据。

## 技术栈

- [Next.js 15](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Vercel](https://vercel.com/) - 部署平台

## 项目结构

```
hello-ai/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API 路由
│   │   └── members/     # 页面组件
│   ├── data/            # 静态数据
│   ├── lib/             # 工具函数
│   └── types/           # TypeScript 类型
├── public/              # 静态资源
└── next.config.js       # Next.js 配置
```

## 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/hello-ai)

### 手动部署

1. Fork 本仓库
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

## 许可证

MIT

## 贡献

欢迎提交 Pull Request！

## 联系

如有问题，请提交 [Issue](https://github.com/YOUR_USERNAME/hello-ai/issues)。
