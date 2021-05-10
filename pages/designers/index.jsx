import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import Router from 'next/router'
import { useAppContext } from '@store/index'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import Footer from '@components/footer'
import desStyles from './designers.module.scss'

export default function Site(props) {
  const { companyData, touchCompanyInfor } = useAppContext()
  const [desData, setdesData] = useState(null)

  useEffect(() => {
    touchCompanyInfor()
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
    <>
      <div className={desStyles.grayBg}>
        <div className={desStyles.conBox}>
          {/* breadBar */}
          <BreadBar />

          {/* designers */}
          <ul className={desStyles.listBox}>
            {desData?.list?.map(art => {
              const { headPicUrl, workingTime, name, uid, position, designConcept, description, styles, caseList } = art
              return (
                <li key={uid}>
                  <div className={desStyles.desInfo} onClick={() => Router.push(`/designers/detail?uid=${uid}`)}>
                    <div className={desStyles.headimg}>
                      <div>
                        <img src={headPicUrl} alt="" />
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

                  <div className={desStyles.caseInfo} onClick={() => Router.push(`/cases/detail?uid=${uid}`)}>
                    {caseList?.list?.map((cs, ind) => {
                      const { url, acreage, buildingName, liveroom, bedroom, styleDic = {} } = cs
                      return (
                        <div key={ind} className={desStyles.minImgBox}>
                          <img src={headPicUrl} alt="" />
                          {/* <img src={url} alt="" /> */}
                          <div className={desStyles.imgCove}>
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
            <Pagination
              hideOnSinglePage={true}
              onChange={pageChange}
              defaultCurrent={1}
              total={desData?.recordTotal}
              defaultCurrent={1}
            />
          </div>
        </div>
      </div>
      <Footer {...companyData} />
    </>
  )
}
