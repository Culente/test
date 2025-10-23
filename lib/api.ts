import axios from 'axios'

const API_BASE_URL = 'https://amazing-connection-0a51388771.strapiapp.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 638c1b3e9506b6e13ffd31407b0adba00a187315fae0e1b91107171d649da1652701f0414459058f6bcab3783fd914349680f8242750f6b7c035a71cba89dea7e6a7c485b5148b1a7d77b3481fa7335830644b47eb33b390a93cdfebc57629da115a95811cf72a7f0ec5bdda9c5cdf3c3f8fb2d9c06758cac4cd13c768b53a92`,
  },
})

// 新闻相关API
export const newsApi = {
  // 获取新闻列表
  getNewsList: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: any
    locale?: string
  }) => {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) queryParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.locale) queryParams.append('locale', params.locale)
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}]`, value as string)
      })
    }
    
    queryParams.append('populate', '*')
    
    const url = `/newses?${queryParams.toString()}`
    console.log('API URL:', url)
    console.log('Locale parameter:', params?.locale)
    
    const response = await api.get(url)
    return response.data
  },

  // 获取新闻详情
  getNewsById: async (documentId: string, locale?: string) => {
    const queryParams = new URLSearchParams()
    if (locale) queryParams.append('locale', locale)
    queryParams.append('populate', '*')
    
    // 使用documentId进行查询
    const url = `/newses?filters[documentId][$eq]=${documentId}&${queryParams.toString()}`
    console.log('News detail API URL:', url)
    console.log('News detail locale parameter:', locale)
    
    const response = await api.get(url)
    return response.data
  },

  // 创建新闻
  createNews: async (newsData: {
    title: string
    content: any[]
    publishDate: string
    comp?: any[]
    publishedAt?: string
  }) => {
    const response = await api.post('/newses', {
      data: newsData
    })
    return response.data
  },
}

// 测试单例类型API
export const testSingleTypeApi = {
  // 获取测试单例类型
  getTestSingleType: async (locale?: string) => {
    const queryParams = new URLSearchParams()
    if (locale) queryParams.append('locale', locale)
    queryParams.append('populate', '*')
    
    const response = await api.get(`/test-single-type?${queryParams.toString()}`)
    return response.data
  },
}

export default api
