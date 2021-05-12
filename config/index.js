// 接口host
const { NODE_ENV } = process.env

// todo... 暂时版， 提测前 请 修改为真实逻辑
// let prefix = ''
// const isProd = NODE_ENV === 'production'
// NODE_ENV === 'development' && (prefix = 'dev')
// NODE_ENV === 'test' && (prefix = 'test')
// const host = isProd ? '//gateway.ingongdi.com/' : `//${prefix}gw.ingongdi.com/`

const host = 'http://devgw.ingongdi.com/'

export default { host }
