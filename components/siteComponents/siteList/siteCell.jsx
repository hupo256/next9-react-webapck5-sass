import React from 'react'
import Router from 'next/router'
import Steps from './steps'
import styles from './siteList.module.scss'

export default function SiteCell(props) {
  const { list } = props

  return (
    <ul className={styles.listBox}>
      {list.map(item => {
        const {
          coverImg,
          gongdiTitle,
          buildingName,
          buildingArea,
          houseStyleName,
          houseType = {},
          gongdiUid,
          gongdiStage,
          dicList,
        } = item
        const { bedroom, parlor } = houseType
        return (
          <li key={gongdiUid} onClick={() => Router.push(`/sites/details?gongdiUid=${gongdiUid}`)}>
            <div className={styles.minImgBox}>
              <img src={coverImg} alt="" />
            </div>
            <div className={styles.casePicBox}>
              <h3>{gongdiTitle}</h3>
              <h5>{buildingName}</h5>
              <p>
                {buildingArea && <span>{`${buildingArea}m²`}</span>}
                {(!!bedroom || !!parlor) && <span>{`${bedroom}室${parlor}厅`}</span>}
                {houseStyleName && <span>{houseStyleName}</span>}
              </p>
              <Steps stage={gongdiStage} dicList={dicList} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
