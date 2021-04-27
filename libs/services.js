import axios from 'axios'

let apiDomain = ''

if (process.env.NODE_ENV === 'development') {
  apiDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN
}

export const Services = {
  findAllChannels: () => axios.get(apiDomain + '/api/v1/wechat/menu/preview/list'),
  findAllFooters: () => axios.get(apiDomain + '/api/v1/wechat/website/companyinfo/pc/view'),
  findAllData: params =>
    axios.post(apiDomain + '/wechatapi/api/v1/wechat/homePage/pc/getHomePagePublishedData', params),
}
