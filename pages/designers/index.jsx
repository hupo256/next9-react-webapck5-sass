import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { Pagination } from 'antd'
import Router from 'next/router'
import tools from '@libs/utils'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import NoData from '@components/noData'
import RoomType from '@components/roomType'
import TextTip from '@components/textTip'
import desStyles from './designers.module.scss'
import { useAppContext } from '@store/index'

const { baseImgUrl } = tools

export default function Site(props) {
  const [desData, setdesData] = useState(null)
  const { menuFetched } = useAppContext()

  useEffect(() => {
    menuFetched && touchList()
  }, [menuFetched])

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
    <BasicLayout headConfig={{ title: '找设计师' }} pushType="designer">
      <div className="grayBg">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar />

          {/* designers */}
          {desData?.list?.length > 0 ? (
            <ul className={desStyles.listBox}>
              {desData?.list?.map(art => {
                const { headPicUrl, workingTime, name, uid, position, designConcept, profile, styles, caseList } = art
                return (
                  <li key={uid}>
                    <div className={desStyles.desInfo} onClick={() => Router.push(`/designers/details?uid=${uid}`)}>
                      <div className={desStyles.headimg}>
                        <div>
                          <img
                            src={headPicUrl || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`}
                          />
                          <span>从业{workingTime}年</span>
                        </div>
                        <div>
                          <h3>
                            <TextTip content={name} />
                            <span>{position}</span>
                          </h3>
                          {/* <TextTip content={styles?.map(dic => dic.name).join(' / ') || '暂无'} /> */}
                          <p>{styles?.map(dic => dic.name).join(' / ') || '暂无'}</p>
                          <TextTip content={designConcept} />
                        </div>
                      </div>
                      <p>{profile}</p>
                    </div>

                    <div className={desStyles.caseInfo}>
                      {caseList?.list?.map((item, ind) => {
                        const { coverPicUrl, acreage, buildingName, bedroom, liveroom, styleDic = {}, uid } = item
                        return (
                          <div key={ind} className={desStyles.minImgBox}>
                            <img
                              src={coverPicUrl || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`}
                            />
                            <div className={desStyles.imgCove}>
                              <p>
                                {buildingName && <b>{`${buildingName}`}</b>}
                                {acreage && <span>{`${acreage}m² | `}</span>}
                                <RoomType {...item} />
                                {!!bedroom ? ` | ` : ''}
                                {styleDic?.name && <span>{`${styleDic.name}`}</span>}
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
          ) : (
            <NoData tips="设计师" />
          )}

          {!!desData?.recordTotal && (
            <div className={desStyles.pageBox}>
              <Pagination
                hideOnSinglePage={true}
                onChange={pageChange}
                defaultCurrent={1}
                total={desData.recordTotal}
              />
            </div>
          )}
        </div>
      </div>
    </BasicLayout>
  )
}
