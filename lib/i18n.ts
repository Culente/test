export type Locale = 'zh-CN' | 'en'

export const locales: Locale[] = ['zh-CN', 'en']

export const defaultLocale: Locale = 'zh-CN'

export const localeNames = {
  'zh-CN': '中文',
  'en': 'English'
}

export const translations = {
  'zh-CN': {
    nav: {
      news: '新闻列表',
      sample: '示例单页',
      home: '首页',
      create: '创建新闻'
    },
    news: {
      title: '最新新闻',
      subtitle: '基于 Strapi CMS 的新闻展示平台',
      readMore: '阅读更多',
      publishDate: '发布时间',
      createTime: '创建时间',
      updateTime: '更新时间',
      noNews: '暂无新闻',
      noNewsDesc: '当前没有可显示的新闻内容',
      loadError: '加载失败',
      loadErrorDesc: '请检查 API 连接或稍后重试'
    },
    create: {
      title: '创建新闻',
      subtitle: '提交新的新闻内容',
      form: {
        title: '新闻标题',
        titlePlaceholder: '请输入新闻标题',
        content: '新闻内容',
        contentPlaceholder: '请输入新闻内容（支持HTML标签）',
        publishDate: '发布日期',
        publishDatePlaceholder: '选择发布日期',
        compTitle: '组件标题',
        compTitlePlaceholder: '请输入组件标题',
        compDesc: '组件描述',
        compDescPlaceholder: '请输入组件描述',
        submit: '提交新闻',
        submitting: '提交中...',
        success: '新闻创建成功！',
        error: '创建失败，请重试'
      },
      validation: {
        titleRequired: '请输入新闻标题',
        contentRequired: '请输入新闻内容',
        dateRequired: '请选择发布日期',
        titleMinLength: '标题至少需要5个字符',
        contentMinLength: '内容至少需要20个字符'
      }
    },
    sample: {
      title: '示例单页',
      subtitle: '这是一个展示 Strapi 单例类型内容的示例页面',
      backToNews: '返回新闻列表',
      noContent: '暂无内容',
      noContentDesc: '当前没有可显示的示例内容',
      features: {
        title: '单例类型特点',
        items: [
          '全局唯一的内容实例',
          '适合网站设置和配置',
          '不需要列表页面',
          '直接通过 API 访问'
        ]
      },
      tech: {
        title: '技术实现',
        items: [
          'Next.js 14 App Router',
          'TypeScript 类型安全',
          'Tailwind CSS 样式',
          'Strapi CMS 集成'
        ]
      },
      apiExample: {
        title: 'API 调用示例'
      }
    },
    about: {
      title: '关于这个演示站点',
      description: '这是一个基于 Next.js 和 Strapi CMS 的新闻展示网站演示。展示了如何集成 Strapi 作为内容管理系统，并使用 Next.js 构建现代化的前端界面。'
    },
    notFound: {
      title: '页面未找到',
      description: '抱歉，您访问的页面不存在或已被移除。',
      backHome: '返回首页',
      viewSample: '或查看示例单页'
    }
  },
  'en': {
    nav: {
      news: 'News List',
      sample: 'Sample Page',
      home: 'Home',
      create: 'Create News'
    },
    news: {
      title: 'Latest News',
      subtitle: 'News display platform based on Strapi CMS',
      readMore: 'Read More',
      publishDate: 'Publish Date',
      createTime: 'Created At',
      updateTime: 'Updated At',
      noNews: 'No News',
      noNewsDesc: 'There are currently no news articles to display',
      loadError: 'Load Failed',
      loadErrorDesc: 'Please check API connection or try again later'
    },
    create: {
      title: 'Create News',
      subtitle: 'Submit new news content',
      form: {
        title: 'News Title',
        titlePlaceholder: 'Enter news title',
        content: 'News Content',
        contentPlaceholder: 'Enter news content (HTML tags supported)',
        publishDate: 'Publish Date',
        publishDatePlaceholder: 'Select publish date',
        compTitle: 'Component Title',
        compTitlePlaceholder: 'Enter component title',
        compDesc: 'Component Description',
        compDescPlaceholder: 'Enter component description',
        submit: 'Submit News',
        submitting: 'Submitting...',
        success: 'News created successfully!',
        error: 'Creation failed, please try again'
      },
      validation: {
        titleRequired: 'Please enter news title',
        contentRequired: 'Please enter news content',
        dateRequired: 'Please select publish date',
        titleMinLength: 'Title must be at least 5 characters',
        contentMinLength: 'Content must be at least 20 characters'
      }
    },
    sample: {
      title: 'Sample Page',
      subtitle: 'This is a sample page showcasing Strapi single type content',
      backToNews: 'Back to News',
      noContent: 'No Content',
      noContentDesc: 'There is currently no sample content to display',
      features: {
        title: 'Single Type Features',
        items: [
          'Globally unique content instance',
          'Suitable for website settings and configuration',
          'No list page needed',
          'Direct API access'
        ]
      },
      tech: {
        title: 'Technical Implementation',
        items: [
          'Next.js 14 App Router',
          'TypeScript type safety',
          'Tailwind CSS styling',
          'Strapi CMS integration'
        ]
      },
      apiExample: {
        title: 'API Call Example'
      }
    },
    about: {
      title: 'About This Demo Site',
      description: 'This is a news display website demo based on Next.js and Strapi CMS. It demonstrates how to integrate Strapi as a content management system and use Next.js to build a modern frontend interface.'
    },
    notFound: {
      title: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been removed.',
      backHome: 'Back to Home',
      viewSample: 'or view sample page'
    }
  }
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}
