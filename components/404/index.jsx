import styles from './404.module.scss'

const ExpiredPage = ({ text = '您访问的页面已经停用' }) => {
  return (
    <div className={styles.wrapper}>
      <img src={'/img/404.png'} className={styles.pic} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default ExpiredPage
