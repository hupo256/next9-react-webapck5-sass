import ajaxinstance from './index'

const designersCreate = () => {
  const designers = {}

  // 查询设计师列表(网站)
  designers.queryDesignerListForWeb = params => {
    return ajaxinstance.post('api/v1/wechat/designer/queryDesignerListForWeb', params)
  }

  // 根据UID查询设计师(网站)
  designers.queryDesignerForWebByUid = params => {
    return ajaxinstance.post('api/v1/wechat/designer/queryDesignerForWebByUid', params)
  }

  return designers
}

export default designersCreate()
