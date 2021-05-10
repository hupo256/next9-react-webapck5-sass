import ajaxinstance from './index'

const articleCreate = () => {
  const article = {}

  // 文章列表
  article.articlePageList = params => {
    return ajaxinstance.post('api/v1/wechat/article/www/pageList', params)
  }

  // 文章详情
  article.articleGet = params => {
    return ajaxinstance.post('api/v1/wechat/article/www/get', params)
  }

  // 文章列表
  article.queryArticleDic = params => {
    return ajaxinstance.get('api/v1/wechat/dic/queryArticleDic', { params })
  }

  return article
}

export default articleCreate()
