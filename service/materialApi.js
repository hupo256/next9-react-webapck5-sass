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
  material.materialProductDetail = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/get', params)
  }
  // 材料商品推荐列表
  material.materialrecommend = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/recommend', params)
  }
  // 验证商品是否申请过
  material.materialCommodityApplyCheck = params => {
    return ajaxinstance.post('/api/v1/moyang/ugc/commodity/apply/check', params)
  }
  // 申请ugc商品
  material.materialCommodityApply = params => {
    return ajaxinstance.post('api/v1/moyang/ugc/commodity/apply', params)
  }
  // 获取供应商
  material.materialGetSupplier = params => {
    return ajaxinstance.post('api/v1/moyang/shop/get_supplier', params)
  }
  // 获取品牌详情
  material.materialBrandGet = params => {
    return ajaxinstance.post('api/v1/moyang/brand/get', params)
  }

  return material
}

export default materialCreate()
