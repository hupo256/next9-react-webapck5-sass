import styles from './500.module.scss'

const ExpiredPage = ({ text = '抱歉，服务已到期，快去续费吧！', contactText = '优惠续费热线：400-056-6800' }) => {
  return (
    <div className={styles.wrapper}>
      <img src={'/img/500.png'} className={styles.pic} />
      <div className={styles.textWrapper}>
        <p className={styles.code}>500</p>
        <p className={styles.text}>{text}</p>
        <p className={styles.contactText}>{contactText}</p>
      </div>
    </div>
  )
}

export default ExpiredPage
