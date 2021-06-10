import React, { useEffect, useState, useRef } from 'react'
import { Input, Modal, Button, Carousel } from 'antd'
import BasicLayout from '@components/HomePageLayout'
import materialApi from '@service/materialApi'
import Types from './types'
import UgcScm from './ugcScm'
import styles from './index.module.scss'

const InputStyle = {
  width: '100%',
  height: '30px',
  border: '1px solid #E5E5E5',
  borderRadius: '4px',
  background: '#ffffff',
}

const ButtonStyle = {
  width: '100%',
  borderRadius: '4px',
  border: 'none',
  background: '#FF7300',
  color: '#ffffff',
}

export default function Site(props) {
  const [state, setState] = useState({
    maxLiKey: -1,
    minLiKey: -1,
    keyword: '',
    keywordType: 1,
    commodityType: '1',
    commodityCategoryCode: '',
    subCommodityCategoryCode: '',
    carouselImages: [],
    pageIndex: 1,
    pageSize: 30,
  })
  const [applyVisible, setApplyVisible] = useState(false)
  const [shopId, setShopId] = useState('')
  const [source] = useState('4')
  const [commodityCategoryVos, setCommodityCategoryVos] = useState(null)
  const [pageResultVo, setPageResultVo] = useState(null)

  const PhoneInput = useRef()
  const NameInput = useRef()

  useEffect(() => {
    // 初始化获取用户信息
    materialApi.queryShopInfo({ shopCode: 'test1-site.ingongdi.com', source }).then(res => {
      const commodityType = props.type ? props.type : state.commodityType;
      setState({
        ...state,
        ...res.data,
        commodityType,
      })
      setShopId(res.data.uid)
      queryCategory(res.data.uid, props.type)
      query(res.data.uid, props.type)
    })
  }, [])

  useEffect(() => {
    query()
  }, [state.pageIndex, state.pageSize, state.commodityCategoryCode, state.subCommodityCategoryCode])

  const handleMaxLi = (key, item) => {
    setState({
      ...state,
      maxLiKey: key,
      commodityCategoryCode: key < 0 ? '' : item.categoryCode,
      subCommodityCategoryCode: '',
      minLiKey: -1,
    })
  }

  const handleMinLi = (key, item) => {
    setState({
      ...state,
      minLiKey: key,
      subCommodityCategoryCode: key === -1 ? '' : item.categoryCode,
    })
  }

  const queryCategory = async (shopIds, commodityTypes) => {
    const { commodityType } = state
    const queryCommodityCategory = {
      commodityType: commodityTypes ? commodityTypes : commodityType,
      shopId: shopIds ? shopIds : shopId,
      source: '4',
    }
    const commodityCategory = await materialApi.queryCommodityCategory(queryCommodityCategory)
    setCommodityCategoryVos(commodityCategory.data)
  }

  const query = async (shopIds, commodityTypes) => {
    const { pageIndex, pageSize, commodityCategoryCode, commodityType, subCommodityCategoryCode } = state

    const queryMaterial = {
      commodityCategoryCode,
      subCommodityCategoryCode,
      commodityType: commodityTypes ? commodityTypes : commodityType,
      source,
      shopId: shopIds ? shopIds : shopId,
      pageIndex,
      pageSize,
      shopType: [],
    }
    const commoditys = await materialApi.queryMaterial(queryMaterial)
    setPageResultVo(commoditys.data)
  }

  const applyUgc = async e => {
    const name = NameInput.current.state.value
    const phone = PhoneInput.current.state.value
    const params = {
      applySource: 2,
      commodityType: '1',
      customerName: name,
      phoneNumber: phone,
      shopId: state.uid,
      ugcCommodityId: state.ugcId,
    }

    const res = await materialApi.materialCommodityApply(params)
    if (res.data) {
      setApplyVisible(false)
      PhoneInput.current.state.value = ''
      NameInput.current.state.value = ''
      query()
      message.success('申请成功')
    }
  }

  const applyVisibleShow = item => {
    setState({
      ...state,
      ugcId: item.ugcId,
    })
    setApplyVisible(true)
  }

  const pageChange = (pageIndex, pageSize) => {
    setState({
      ...state,
      pageIndex,
      pageSize,
    })
  }

  return (
    <BasicLayout headConfig={{ title: '材料' }} pushType="material">
      <div className="grayBg">
        <Carousel autoplay style={{height: '100%'}}>
          {_.map(state.carouselImages, (item, index) => (
            <div className={`banner-${index}`} key={`banner-${index}`} style={{height: '100%'}}>
              <img src={item} alt="" style={{width: '100%', height: '560px'}} />
              {/* <h3 className={styles.banner} style={{ backgroundImage: `url(${item})`, height: '100%' }}></h3> */}
            </div>
          ))}
        </Carousel>
        <div className="conBox">
          <div className={styles.scmpage_body} style={{ display: 'block' }}>
            <div className={styles.scmpage_context}>
              <div className={styles.scmpage_type}>
                <Types
                  commodityCategoryVos={commodityCategoryVos}
                  commodityCategoryCode={state.commodityCategoryCode}
                  maxLiKey={state.maxLiKey}
                  minLiKey={state.minLiKey}
                  handleMaxLi={handleMaxLi}
                  handleMinLi={handleMinLi}
                />
              </div>
              <div className={styles.scmpage_list}>
                <UgcScm
                  type={state.commodityType}
                  pageResultVo={pageResultVo}
                  shopId={state.shopId}
                  keywordType={state.keywordType}
                  commodityCategoryCode={state.commodityCategoryCode}
                  subCommodityCategoryCode={state.subCommodityCategoryCode}
                  showApplyUgc={item => {
                    applyVisibleShow(item)
                  }}
                  pageChange={pageChange}
                />
              </div>
              <div className="apply_pgc">
                <Modal
                  title="申请人信息"
                  visible={applyVisible}
                  width={289}
                  onCancel={() => {
                    setApplyVisible(false)
                  }}
                  footer={
                    <div>
                      <Button danger={true} style={ButtonStyle} onClick={applyUgc}>
                        申请
                      </Button>
                    </div>
                  }
                >
                  <div style={{ ...InputStyle, marginBottom: '12px' }}>
                    <Input placeholder="请输入联系电话" ref={PhoneInput} />
                  </div>
                  <div style={InputStyle}>
                    <Input placeholder="请输入您的称呼" ref={NameInput} />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
