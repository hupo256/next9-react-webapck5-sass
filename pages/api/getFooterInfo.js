const dummyData = {
  code: 200,
  message: '',
  data: {
    wechatName: '公众号名称',
    wechatQrCode: 'http://www.baidu.com/1.png',
    wechatNumber: '1111',
    storeAddress: '门店地址',
    storeCover: 'http://www.baidu.com/2.png',
    disclaimer: '免责声明',
    copyright: '版权信息',
    icp: 'icp备案号',
    email: 'wodegongdi555@in-Site.com',
    customerService: '13012345678',
    header: '111',
    footer: '2222',
  },
}

// /api/v1/wechat/website/companyinfo/pc/view
export default (req, res) => {
  res.send(dummyData)
}
