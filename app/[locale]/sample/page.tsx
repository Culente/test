'use client'

import { testSingleTypeApi } from '@/lib/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTranslations, Locale } from '@/lib/i18n'

interface LocaleSamplePageProps {
  params: {
    locale: Locale
  }
}

export default function LocaleSamplePage({ params }: LocaleSamplePageProps) {
  const [sampleData, setSampleData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  const t = getTranslations(params.locale)

  useEffect(() => {
    const fetchSampleData = async () => {
      setLoading(true)
      try {
        const response = await testSingleTypeApi.getTestSingleType(params.locale)
        setSampleData(response.data)
        setError(null)
      } catch (err) {
        setError(t.sample.noContent)
        console.error('Error fetching sample data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSampleData()
  }, [params.locale, t.sample.noContent])

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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href={`/${params.locale}`} 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6"
          >
            ← {t.sample.backToNews}
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.sample.title}</h1>
          <p className="text-gray-600 text-lg">{t.sample.subtitle}</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-medium mb-2">{t.news.loadError}</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">
              {t.news.loadErrorDesc}
            </p>
          </div>
        ) : sampleData ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {sampleData.attributes?.title || '测试单例类型'}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                这是从 Strapi 的测试单例类型获取的内容。单例类型是 Strapi 中用于存储全局内容的一种内容类型，
                通常用于网站设置、关于我们页面、首页横幅等不需要多个实例的内容。
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <h3 className="text-gray-600 font-medium mb-2">{t.sample.noContent}</h3>
            <p className="text-gray-500">{t.sample.noContentDesc}</p>
          </div>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary-800 mb-3">
              {t.sample.features.title}
            </h3>
            <ul className="space-y-2 text-primary-700">
              {t.sample.features.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {t.sample.tech.title}
            </h3>
            <ul className="space-y-2 text-gray-700">
              {t.sample.tech.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-3">
            {t.sample.apiExample.title}
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`// 获取单例类型数据
const response = await fetch('/api/test-single-type?populate=*')
const data = await response.json()

// 数据结构
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "示例标题",
      "content": "...",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
