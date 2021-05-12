import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/PcPreview/HomePageLayout'
import { Pagination } from 'antd'
import Router from 'next/router'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import desStyles from './designers.module.scss'

export default function Site(props) {
  const [desData, setdesData] = useState(null)

  useEffect(() => {
    // touchCompanyInfor()
    touchList()
    // touchDetails()
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
    <BasicLayout title="设计师">
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
                        <img
                          src={
                            headPicUrl ||
                            'https://img.inbase.in-deco.com/crm_saas/release/20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png'
                          }
                          alt=""
                        />
                        <span>从业{workingTime}年</span>
                      </div>
                      <div>
                        <h3>
                          <b>{name}</b> <span>{position}</span>
                        </h3>
                        <p>{styles?.map(dic => dic.name).join(' / ') || '暂无'}</p>
                        <p>{designConcept}</p>
                      </div>
                    </div>
                    <p>{description}</p>
                  </div>

                  <div className={desStyles.caseInfo}>
                    {caseList?.list?.map((cs, ind) => {
                      const { url, acreage, buildingName, liveroom, bedroom, styleDic = {}, uid } = cs
                      return (
                        <div key={ind} className={desStyles.minImgBox}>
                          <img
                            src={
                              url ||
                              'https://img.inbase.in-deco.com/crm_saas/release/20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png'
                            }
                            alt=""
                          />
                          <div className={desStyles.imgCove} onClick={() => Router.push(`/cases/details?uid=${uid}`)}>
                            <p>
                              {buildingName && <span>{`${buildingName} | `}</span>}
                              {acreage && <span>{`${acreage}m² | `}</span>}
                              {(!!bedroom || !!liveroom) && <span>{`${bedroom}室${liveroom}厅 | `}</span>}
                              {styleDic?.name && <span>{styleDic.name}</span>}
                            </p>
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
