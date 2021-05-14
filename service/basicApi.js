import ajaxinstance from './index'

const basicCreate = () => {
  const basic = {}

  // 查询导航栏信息
  basic.getMenuList = params => {
    return ajaxinstance.post('api/v1/wechat/menu/preview/list', params)
  }

  // 查询企业信息
  basic.companyinfoView = params => {
    return ajaxinstance.post('api/v1/wechat/website/companyinfo/pc/view', params)
  }

  return basic
}

export default basicCreate()
