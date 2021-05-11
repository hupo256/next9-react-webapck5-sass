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

  return home
}

export default homePage()
