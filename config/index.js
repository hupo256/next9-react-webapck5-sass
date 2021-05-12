// 接口host
const { NODE_ENV } = process.env

let prefix = ''
const isProd = NODE_ENV === 'production'
NODE_ENV === 'development' && (prefix = 'dev')
NODE_ENV === 'test' && (prefix = 'test')
const host = isProd ? '//gateway.ingongdi.com/' : `//${prefix}gw.ingongdi.com/`

export default { host }
