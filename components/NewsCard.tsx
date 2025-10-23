import Link from 'next/link'
import { getTranslations, Locale } from '@/lib/i18n'

interface NewsCardProps {
  news: {
    id: number
    documentId: string
    title?: string
    publishDate?: string
    content?: any[]
    comp?: any[]
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    locale?: string
    cover?: any
    localizations?: any[]
  }
  locale: Locale
}

export default function NewsCard({ news, locale }: NewsCardProps) {
  const t = getTranslations(locale)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '未知日期'
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getContentPreview = (content: any[]) => {
    if (!content || content.length === 0) return '暂无内容'
    
    // 处理新的数据结构 - 查找第一个段落或标题
    for (const item of content) {
      if (item.type === 'paragraph' && item.children) {
        const text = item.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.text)
          .join('')
        if (text.trim()) {
          return text.length > 100 ? text.substring(0, 100) + '...' : text
        }
      } else if (item.type === 'heading' && item.children) {
        const text = item.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.text)
          .join('')
        if (text.trim()) {
          return text.length > 100 ? text.substring(0, 100) + '...' : text
        }
      }
    }
    
    return '暂无内容预览'
  }

  return (
    <Link href={`/${locale}/news/${news.documentId}`} className="block">
      <article className="card hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          <div className="mb-3">
            <time className="text-sm text-gray-500">
              {formatDate(news.publishDate)}
            </time>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {news.title || '无标题'}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {getContentPreview(news.content || [])}
          </p>
          
          {news.comp && news.comp.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {news.comp.slice(0, 2).map((item: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-primary-600 font-medium text-sm">
              {t.news.readMore} →
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(news.publishedAt)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
