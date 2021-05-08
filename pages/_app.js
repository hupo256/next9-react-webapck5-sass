import 'antd/dist/antd.css'
import '../styles/globals.css'

import { AuthWrapper } from '@libs/context' //ximing: 暂时留存 @libs 吧，全部完成了再统一整合一下。 谢谢。
import { AppWrapper } from '@store/index'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </AppWrapper>
  )
}

export default MyApp
