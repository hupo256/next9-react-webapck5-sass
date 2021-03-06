import ajaxinstance from './index'

const homePage = () => {
  const home = {}

  home.getMenuList = params => {
    return ajaxinstance.post('api/v1/wechat/menu/preview/list', params)
  }

  home.getFooter = params => {
    return ajaxinstance.post('api/v1/wechat/website/companyinfo/pc/view', params)
  }

  home.getPublishedData = params => {
    return ajaxinstance.post('api/v1/wechat/homePage/pc/getHomePagePublishedData', params)
  }

  home.trackWebPush = params => {
    return ajaxinstance.post('api/v1/wechat/track/www/push', params)
  }

  home.trackCount = params => {
    return ajaxinstance.post('api/v1/wechat/track/www/count', params)
  }

  return home
}

export default homePage()
