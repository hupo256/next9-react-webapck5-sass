export const dummyDomain = 'http://localhost:3000' //todo... store it in .env later
export const dummyDevDomain = 'http://devgw.ingongdi.com' //todo... store it in .env later

export const Services = {
  findAllChannels: dummyDomain + '/api/getAllChannels',
  findAllFooters: dummyDomain + '/api/getFooterInfo',
  findAllData: dummyDevDomain + '/wechatapi/api/v1/wechat/homePage/pc/getHomePagePublishedData',
}
