import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { Pagination, Tooltip } from 'antd'
import Router from 'next/router'
import tools from '@libs/utils'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import RoomType from '@components/roomType'
import desStyles from './designers.module.scss'

const { baseImgUrl } = tools

export default function Site(props) {
  const [desData, setdesData] = useState(null)

  useEffect(() => {
    touchList()
  }, [])

  function touchList(config = {}) {
    const param = {
      casePageNum: 1,
      casePageSize: 2,
      pageNum: 1,
      pageSize: 10,
    }
    designerApi.queryDesignerListForWeb({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      setdesData(res.data)
    })
  }

  function pageChange(num, size) {
    console.log(num, size)
    touchList({ pageNum: num, pageSize: size })
  }

  return (
    <BasicLayout headConfig={{ title: '找设计师' }}>
      <div className="grayBg">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar />

          {/* designers */}
          <ul className={desStyles.listBox}>
            {desData?.list?.map(art => {
              const { headPicUrl, workingTime, name, uid, position, designConcept, description, styles, caseList } = art
              return (
                <li key={uid}>
                  <div className={desStyles.desInfo} onClick={() => Router.push(`/designers/details?uid=${uid}`)}>
                    <div className={desStyles.headimg}>
                      <div>
                        <img src={headPicUrl || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`} />
                        <span>从业{workingTime}年</span>
                      </div>
                      <div>
                        <h3>
                          <b>{name}</b> <span>{position}</span>
                        </h3>
                        <p>{styles?.map(dic => dic.name).join(' / ') || '暂无'}</p>
                        <Tooltip title={designConcept}>
                          <p className={styles.desConcept}>{designConcept}</p>
                        </Tooltip>
                      </div>
                    </div>
                    <p>{description}</p>
                  </div>

                  <div className={desStyles.caseInfo}>
                    {caseList?.list?.map((item, ind) => {
                      const { coverPicUrl, acreage, buildingName, styleDic = {}, uid } = item
                      return (
                        <div key={ind} className={desStyles.minImgBox}>
                          <img
                            src={coverPicUrl || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`}
                          />
                          <div className={desStyles.imgCove}>
                            <p>
                              {buildingName && <span>{`${buildingName}`}</span>}
                              {acreage && <span>{` | ${acreage}m²`}</span>}
                              <RoomType {...item} />
                              {/* {(!!bedroom || !!liveroom) && <RoomType {...item} />} */}
                              {styleDic?.name && <span>{` | ${styleDic.name}`}</span>}
                            </p>
                            <a onClick={() => Router.push(`/cases/details?uid=${uid}`)}>查看详情</a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={desStyles.pageBox}>
            {desData?.recordTotal && (
              <Pagination
                hideOnSinglePage={true}
                onChange={pageChange}
                defaultCurrent={1}
                total={desData.recordTotal}
              />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
