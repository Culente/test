import { newsApi } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, Locale } from '@/lib/i18n'

interface NewsDetailPageProps {
  params: {
    locale: Locale
    id: string // 这里实际上是documentId
  }
}

// 为静态导出生成所有可能的路径
export async function generateStaticParams() {
  // 获取所有语言的新闻数据来生成静态路径
  const locales = ['zh-CN', 'en']
  const allParams = []
  
  for (const locale of locales) {
    try {
      const response = await newsApi.getNewsList({
        page: 1,
        pageSize: 100, // 获取更多新闻
        sort: 'publishDate:desc',
        locale: locale
      })
      
      if (response.data) {
        for (const news of response.data) {
          allParams.push({
            locale: locale,
            id: news.documentId
          })
        }
      }
    } catch (error) {
      console.error(`Error fetching news for locale ${locale}:`, error)
    }
  }
  
  return allParams
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const t = getTranslations(params.locale)
  
  let newsData: any = null
  let error: string | null = null

  try {
    console.log('Fetching news detail with locale:', params.locale)
    const response = await newsApi.getNewsById(params.id, params.locale)
    console.log('News detail API response:', response)
    // 从数组中获取第一个匹配的新闻
    newsData = response.data && response.data.length > 0 ? response.data[0] : null
  } catch (err) {
    error = 'Failed to fetch news'
    console.error('Error fetching news:', err)
  }

  if (error || !newsData) {
    notFound()
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '未知日期'
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderContent = (content: any[]) => {
    if (!content || content.length === 0) return null

    return content.map((item, index) => {
      if (item.type === 'paragraph' && item.children) {
        return (
          <p key={index} className="mb-4">
            {item.children
              .filter((child: any) => child.type === 'text')
              .map((child: any, childIndex: number) => (
                <span key={childIndex}>{child.text}</span>
              ))}
          </p>
        )
      } else if (item.type === 'heading' && item.children) {
        const HeadingTag = `h${item.level || 1}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={index} className="mb-4 font-bold">
            {item.children
              .filter((child: any) => child.type === 'text')
              .map((child: any, childIndex: number) => (
                <span key={childIndex}>{child.text}</span>
              ))}
          </HeadingTag>
        )
      } else if (item.type === 'image' && item.image) {
        return (
          <div key={index} className="mb-4">
            <img 
              src={item.image.url} 
              alt={item.image.alternativeText || '图片'} 
              className="max-w-full h-auto rounded-lg"
            />
            {item.image.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">{item.image.caption}</p>
            )}
          </div>
        )
      }
      return null
    })
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link 
          href={`/${params.locale}`} 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          ← {t.nav.news}
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="mb-4">
            <time className="text-sm text-gray-500">
              {t.news.publishDate}: {formatDate(newsData.publishDate)}
            </time>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {newsData.title || '无标题'}
          </h1>
          
          {newsData.comp && newsData.comp.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {newsData.comp.map((item: any, index: number) => (
                <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h3 className="font-semibold text-primary-800 mb-1">{item.title}</h3>
                  <p className="text-primary-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            {renderContent(newsData.content || [])}
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{t.news.createTime}: {formatDate(newsData.createdAt)}</span>
            <span>{t.news.updateTime}: {formatDate(newsData.updatedAt)}</span>
          </div>
        </footer>
      </article>
    </div>
  )
}
