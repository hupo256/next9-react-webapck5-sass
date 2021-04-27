import axios from 'axios'

let apiDomain = ''

if (process.env.NODE_ENV === 'development') {
  apiDomain = process.env.NEXT_PUBLIC_DEV_API_DOMAIN
} else if (process.env.NODE_ENV === 'production') {
  apiDomain = process.env.NEXT_PUBLIC_PROD_API_DOMAIN //因为服务器未发布接口，所以暂时使用swagger的域名
}
export const Services = {
  findAllChannels: () => axios.get(apiDomain + '/api/v1/wechat/menu/preview/list'),
  findAllFooters: () => axios.get(apiDomain + '/api/v1/wechat/website/companyinfo/pc/view'),
  findAllData: params =>
    axios.post(apiDomain + '/wechatapi/api/v1/wechat/homePage/pc/getHomePagePublishedData', params),
}
