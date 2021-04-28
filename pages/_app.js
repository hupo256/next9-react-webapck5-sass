import 'antd/dist/antd.css'
import '../styles/globals.css'

import { AppWrapper } from '../libs/context'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
