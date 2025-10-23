'use client'

import { newsApi } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTranslations, Locale } from '@/lib/i18n'

interface NewsDetailPageProps {
  params: {
    locale: Locale
    id: string // 这里实际上是documentId
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [newsData, setNewsData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const t = getTranslations(params.locale)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        console.log('Fetching news detail with locale:', params.locale)
        const response = await newsApi.getNewsById(params.id, params.locale)
        console.log('News detail API response:', response)
        // 从数组中获取第一个匹配的新闻
        const newsItem = response.data && response.data.length > 0 ? response.data[0] : null
        setNewsData(newsItem)
        setError(null)
      } catch (err) {
        setError('Failed to fetch news')
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [params.id, params.locale])

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
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
