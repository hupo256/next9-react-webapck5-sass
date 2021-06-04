import getCofnig from 'next/config'
const { publicRuntimeConfig } = getCofnig()
const { NEXT_PUBLIC_ENV } = process.env

// console.log('process.env.WEBPACK_ENV ===>', process.env.WEBPACK_ENV)

const { IS_ENV } = publicRuntimeConfig // 全局配置文件中暴露出来的环境变量

let host = '//devgw.ingongdi.com/'
let env = 'DEV';

if (NEXT_PUBLIC_ENV === 'DEV') {
  host = `//devgw.ingongdi.com/`
  env = 'DEV'
}

if (NEXT_PUBLIC_ENV === 'TEST') {
  host = `//testgw.ingongdi.com/`
  env = 'TEST'
}

if (NEXT_PUBLIC_ENV === 'PROD') {
  host = '//gateway.ingongdi.com/'
  env = 'PROD'
}

console.log('host = ', host)

export default { host, env }
