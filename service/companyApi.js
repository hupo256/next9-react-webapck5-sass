import ajaxinstance from './index'

const companyCreate = () => {
  const company = {}

  // 首页-获取企业信息（不带TOKEN）
  company.companyPcView = params => {
    return ajaxinstance.post('api/v1/wechat/website/companyinfo/pc/view', params)
  }

  // 首页-获取企业信息带Token
  company.companyView = params => {
    return ajaxinstance.post('api/v1/wechat/website/companyinfo/view', params)
  }

  return company
}

export default companyCreate()
