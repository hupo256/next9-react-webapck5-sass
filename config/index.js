// let prefix = ''

// if (!process.env) return false

// const isDev = process.env.npm_package_scripts_dev_build.indexOf('developmentEnv') !== -1
// const isTest = process.env.npm_package_scripts_dev_build.indexOf('testingEnv') !== -1
// const isProd = process.env.npm_package_scripts_dev_build.indexOf('ProdEnv') !== -1

// if (isDev) prefix = 'dev'
// if (isTest) prefix = 'test'

// const host = isProd ? '//gateway.ingongdi.com/' : `//${prefix}gw.ingongdi.com/`
// console.log(host)
export default { host: `//devgw.ingongdi.com/` }
