const { ENV } = process.env

let host = '//devgw.ingongdi.com/'
if (ENV === 'DEV') {
  host = `//devgw.ingongdi.com/`
}

if (ENV === 'PROD') {
  host = '//gateway.ingongdi.com/'
}

console.log('host = ', host)

export default { host }
