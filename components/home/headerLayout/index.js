import { Layout } from 'antd'
import styles from './index.module.css'

const HeaderLayout = ({ left, middle, right }) => (
  <Layout.Header className={styles.headerWrapper}>
    <span className={styles.headerLeft}>{left}</span>
    <span className={styles.headerRight}>{middle}</span>
    <span className={styles.contactHeader}>{right}</span>
  </Layout.Header>
)

export default HeaderLayout