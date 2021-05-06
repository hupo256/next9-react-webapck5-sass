import ajaxinstance from './index'

const articleCreate = () => {
  const article = {}

  // 文章列表
  article.articlePageList = params => {
    return ajaxinstance.post('api/v1/wechat/article/pageList', params)
  }

  // 文章详情
  article.articleGet = params => {
    return ajaxinstance.post('api/v1/wechat/article/get', params)
  }

  return article
}

export default articleCreate()
