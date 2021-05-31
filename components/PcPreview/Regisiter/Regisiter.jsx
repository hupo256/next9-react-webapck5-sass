import styles from './Regisiter.module.scss'
import React, { useState } from 'react'
import { Button, Input } from 'antd'
import service from '@service/pcPreview'
import { pushMsgMap } from '@libs/constants.js'

const Regisiter = ({ setRegisiterFromVisiable, type = 'home' }) => {
  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)

  const handleSubmit = async e => {
    console.log(type)
    await service.trackWebPush({ trackName: name || '', trackPhone: phone || '', trackSource: pushMsgMap[type] })
    setName(null)
    setPhone(null)
  }

  const handleClose = e => {
    setName(null)
    setPhone(null)
    setRegisiterFromVisiable(false)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.widthLimit}>
        <img src="/img/regisiter_pic.png" alt="" className={styles.first_pic} />
        <div className={styles.textWrapper}>
          <img src="/img/regisiter_title.png" alt="" className={styles.title_pic} />
          <div className={styles.count}>目前已有386人获取免费报价</div>
        </div>
        <form className={styles.formWrapper} onSubmit={e => e.preventDefault()}>
          <div className={styles.group}>
            <div className={styles.title}>姓名</div>
            <div className={styles.input}>
              <Input type="text" placeholder="请输入您的姓名" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>联系方式</div>
            <div className={styles.input}>
              <Input
                type="text"
                placeholder="请输入您的电话号码"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button className={styles.submitBtn} onClick={handleSubmit}>
              立即获取
            </Button>
          </div>
        </form>
      </div>
      <div className={styles.closeBtn} onClick={handleClose}></div>
    </div>
  )
}

export default Regisiter
