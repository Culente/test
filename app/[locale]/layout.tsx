import LocaleNavigation from '@/components/LocaleNavigation'
import { Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <>
      <LocaleNavigation locale={params.locale} />
      {children}
    </>
  )
}
