'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getTranslations, Locale } from '@/lib/i18n'

interface LocaleNavigationProps {
  locale: Locale
}

export default function LocaleNavigation({ locale }: LocaleNavigationProps) {
  const pathname = usePathname()
  const t = getTranslations(locale)

  const navItems = [
    { href: `/${locale}`, label: t.nav.news },
    { href: `/${locale}/sample`, label: t.nav.sample },
  ]

  const otherLocale = locale === 'zh-CN' ? 'en' : 'zh-CN'
  const currentPath = pathname.replace(`/${locale}`, '') || '/'
  const otherLocalePath = `/${otherLocale}${currentPath}`

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-xl font-bold text-primary-600">
            Strapi 新闻站
          </Link>
          
          <div className="flex items-center space-x-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">语言:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Link
                  href={`/${locale}${currentPath}`}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    locale === 'zh-CN'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  中文
                </Link>
                <Link
                  href={otherLocalePath}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    locale === 'en'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  English
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
