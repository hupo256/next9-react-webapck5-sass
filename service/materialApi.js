import ajaxinstance from './index'

const materialCreate = () => {
  const material = {}

  // 查询商店详情
  material.queryShopInfo = params => {
    return ajaxinstance.post('api/v1/moyang/shop/get', params)
  }
  // 查询分类
  material.queryCommodityCategory = params => {
    return ajaxinstance.post('api/v1/moyang/shop/get_commodity_category', params)
  }
  // 发送短信
  material.sendMsg = params => {
    return ajaxinstance.post('api/v1/moyang/msg/sendMsg', params)
  }
  // 搜索装修商品
  material.searchRenovation = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/decoration/search', params)
  }
  // 搜索ugc商品
  material.queryMaterial = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/query', params)
  }
  // 材料商品详情
  material.materialProductDetail  = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/get', params)
  }
  // 材料商品推荐列表
  material.materialrecommend  = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/recommend', params)
  }

  return material
}

export default materialCreate()
