import ajaxinstance from './index'

const siteCreate = () => {
  const site = {}

  // 工地参数（www网站）
  site.siteParams = params => {
    return ajaxinstance.post('api/v1/wechat/site/www/params', params)
  }

  // 工地列表（www网站）
  site.sitePageList = params => {
    return ajaxinstance.post('api/v1/wechat/site/www/pageList', params)
  }

  // 工地详情（www网站）
  site.siteDetails = params => {
    return ajaxinstance.post('api/v1/wechat/site/www/get', params)
  }

  // 动态列表（www网站）
  site.siteDiaryList = params => {
    return ajaxinstance.post('api/v1/wechat/site/diary/www/pageList', params)
  }

  // 动态树（www网站）
  site.sitePageTree = params => {
    return ajaxinstance.post('api/v1/wechat/site/diary/www/pageTree', params)
  }

  return site
}

export default siteCreate()
