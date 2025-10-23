# Strapi 新闻演示站点

这是一个基于 Next.js 14 和 Strapi CMS 的新闻展示网站演示项目，支持中英文多语言切换。本项目用于基础演示，无其他用途

## 功能特性

- 📰 **新闻列表页面** - 展示从 Strapi 获取的新闻列表
- 📖 **新闻详情页面** - 显示单篇新闻的完整内容
- 📄 **示例单页** - 展示 Strapi 单例类型内容
- 🌐 **多语言支持** - 支持中文（zh-CN）和英文（en）切换
- 🎨 **现代化UI** - 使用 Tailwind CSS 构建的响应式界面
- ⚡ **TypeScript** - 完整的类型安全支持

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **状态管理**: React Context
- **CMS**: Strapi
- **HTTP客户端**: Axios

## 项目结构

```
nextjs-demo/
├── app/                    # Next.js App Router 页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（新闻列表）
│   ├── not-found.tsx      # 404页面
│   ├── news/[id]/         # 新闻详情页面
│   └── sample/            # 示例单页
├── components/            # React 组件
│   ├── Navigation.tsx     # 导航栏
│   ├── NewsCard.tsx       # 新闻卡片
│   └── LanguageSwitcher.tsx # 语言切换器
├── contexts/              # React Context
│   └── LocaleContext.tsx  # 多语言上下文
├── lib/                   # 工具库
│   ├── api.ts            # API 调用封装
│   └── i18n.ts           # 国际化配置
└── package.json
```

## 安装和运行

1. **安装依赖**
   ```bash
   cd nextjs-demo
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 多语言配置

项目支持中文和英文两种语言：

- **中文 (zh-CN)**: 默认语言
- **英文 (en)**: 通过语言切换器选择

语言设置会保存在浏览器的 localStorage 中，下次访问时会自动恢复。

## API 集成

项目集成了 Strapi CMS API：

- **新闻列表**: `GET /api/newses?populate=*&locale=zh`
- **新闻详情**: `GET /api/newses/{id}?populate=*&locale=zh`
- **单例类型**: `GET /api/test-single-type?populate=*&locale=zh`

## 页面说明

### 1. 新闻列表页面 (/)
- 展示从 Strapi 获取的新闻列表
- 支持分页和排序
- 响应式网格布局
- 多语言内容支持

### 2. 新闻详情页面 (/news/[id])
- 显示单篇新闻的完整内容
- 支持富文本内容渲染
- 显示发布时间和更新时间
- 多语言内容支持

### 3. 示例单页 (/sample)
- 展示 Strapi 单例类型内容
- 技术特性说明
- API 调用示例
- 多语言内容支持

## 开发说明

### 添加新语言
1. 在 `lib/i18n.ts` 中添加新的语言配置
2. 更新 `Locale` 类型定义
3. 在 `LanguageSwitcher` 组件中添加新语言选项

### 自定义样式
项目使用 Tailwind CSS，可以通过修改 `tailwind.config.js` 来自定义主题。

### API 配置
在 `lib/api.ts` 中修改 `API_BASE_URL` 来指向你的 Strapi 实例。

## 部署

### Vercel 部署
```bash
npm run build
npm run start
```

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT License
