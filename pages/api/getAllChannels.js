export default (req, res) => {
  res.send({
    code: 200,
    message: '',
    data: {
      servicePhone: '13012345678',
      list: [
        {
          linkDisplayName: '首页',
          linkUrl: '/',
          uid: '969543dd76cf44f3b89a4f24fd75d500',
          websiteName: '网站首页',
          brief: '简要介绍',
          description: '我的备注aaaaaaaa',
          seq: 1,
        },
        {
          linkDisplayName: '看案例',
          linkUrl: '/cases',
          uid: '86bd54ef68a542e680f188ca79cf980f',
          websiteName: 'home',
          brief: '简要介绍',
          description: '我的备注aaaaaaaa哒哒哒哒哒哒大多所付',
          seq: 2,
        },
        {
          linkDisplayName: '找设计师',
          linkUrl: '/designers',
          uid: '7cc84cf8043d492f86441cef59fddedb',
          websiteName: '网站首页',
          brief: '简要介绍',
          description: '我的备注aaaaaaaa哒哒哒哒哒哒大多所付',
          seq: 3,
        },
        {
          linkDisplayName: '装修攻略',
          linkUrl: '/posts',
          uid: 'd4508d1c006e42be807a406c93d8bca5',
          websiteName: '网站首页',
          brief: '简要介绍',
          description: '我的备注aaaaaaaa哒哒哒哒哒哒大多所付',
          seq: 5,
        },
        {
          linkDisplayName: '装修技巧',
          linkUrl: '/posts/brand-point',
          uid: '97f957cbf5ec44bbae85caf36935ec49',
          websiteName: 'gr',
          brief: '简要介绍',
          description: '我的备注aaaaaaaa哒哒哒哒哒哒大多所付',
          seq: 6,
        },
      ],
    },
  })
  // await axios.get('/api/v1/wechat/menu/preview/list')
}
