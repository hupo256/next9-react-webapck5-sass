const fs = require('fs')

fs.writeFileSync('./.env', `NEXT_PUBLIC_ENV=${process.argv.splice(2)[0]}`)
