import axios from 'axios'

let apiDomain = ''
let headers = {}

if (process.env.NODE_ENV === 'development') {
  apiDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN
  headers = { origin: apiDomain }
}

export const Services = {
  findAllChannels: () => axios.get(apiDomain + '/api/v1/wechat/menu/preview/list', { headers }),
  findAllFooters: () =>
    axios.get(apiDomain + '/api/v1/wechat/website/companyinfo/pc/view', { headers }),
  findAllData: params =>
    axios.post(
      apiDomain + '/wechatapi/api/v1/wechat/homePage/pc/getHomePagePublishedData',
      params,
      { headers },
    ),
}
