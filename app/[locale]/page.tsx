'use client'

import { newsApi } from '@/lib/api'
import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTranslations, Locale } from '@/lib/i18n'

interface NewsItem {
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

interface LocalePageProps {
  params: {
    locale: Locale
  }
}

export default function LocalePage({ params }: LocalePageProps) {
  const [newsData, setNewsData] = useState<NewsItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const t = getTranslations(params.locale)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        console.log('Fetching news with locale:', params.locale)
        const response = await newsApi.getNewsList({
          page: 1,
          pageSize: 10,
          sort: 'publishDate:desc',
          locale: params.locale
        })
        console.log('API response:', response)
        setNewsData(response.data)
        setError(null)
      } catch (err) {
        setError(t.news.loadError)
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [params.locale, t.news.loadError])

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.news.title}</h1>
        <p className="text-gray-600">{t.news.subtitle}</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium mb-2">{t.news.loadError}</h3>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-2">
            {t.news.loadErrorDesc}
          </p>
        </div>
      ) : newsData && newsData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news: NewsItem) => (
            <NewsCard key={news.id} news={news} locale={params.locale} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-gray-600 font-medium mb-2">{t.news.noNews}</h3>
          <p className="text-gray-500">{t.news.noNewsDesc}</p>
        </div>
      )}

      <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-3">
          {t.about.title}
        </h2>
        <p className="text-primary-700 mb-4">
          {t.about.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
            Next.js 14
          </span>
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
            Strapi CMS
          </span>
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
            TypeScript
          </span>
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
            Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  )
}
