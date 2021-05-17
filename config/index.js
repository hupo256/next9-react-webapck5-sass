const { NEXT_PUBLIC_ENV } = process.env

let host = '//devgw.ingongdi.com/'
if (NEXT_PUBLIC_ENV === 'DEV') {
  host = `//devgw.ingongdi.com/`
}

if (NEXT_PUBLIC_ENV === 'TEST') {
  host = `//testgw.ingongdi.com/`
}

if (NEXT_PUBLIC_ENV === 'PROD') {
  host = '//gateway.ingongdi.com/'
}

// console.log('host = ', host)

export default { host }
