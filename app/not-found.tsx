import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">页面未找到</h2>
          <p className="text-gray-600 mb-8">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/zh-CN" 
            className="btn-primary inline-block"
          >
            返回首页
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link href="/zh-CN/sample" className="hover:text-primary-600">
              或查看示例单页 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
