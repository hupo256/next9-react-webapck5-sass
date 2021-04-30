import styles from './index.module.css'

const BtnMore = ({ text = '更多案例', url = '/' }) => (
  <div className={styles.moreBtn}>
    <a href={url}>{text}</a>
  </div>
)
export default BtnMore
