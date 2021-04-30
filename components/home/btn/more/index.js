import styles from './index.module.css'

const BtnMore = ({ text = '更多案例', url = '/', solid = false }) => {
  if (solid) {
    return (
      <div className={styles.moreBtnSolid}>
        <a href={url}>{text}</a>
      </div>
    )
  }
  return (
    <div className={styles.moreBtn}>
      <a href={url}>{text}</a>
    </div>
  )
}
export default BtnMore
