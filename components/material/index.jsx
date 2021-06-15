import React, { useEffect, useState, useRef } from 'react'
import { Input, Modal, Button, Carousel, message } from 'antd'
import BasicLayout from '@components/HomePageLayout'
import materialApi from '@service/materialApi'
import NoData from '@components/noData'
import ExpiredPage from '@components/500/500.jsx'
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
    const url = window.location.origin.split('://')[1];
    const shopCode = window.location.host === 'localhost:3000' ? 'test1-site.ingongdi.com' : url;
    materialApi.queryShopInfo({ shopCode, source }).then(res => {
      const commodityType = props.type ? props.type : state.commodityType;
      setState({
        ...state,
        ...res.data,
        shopId: res.data.uid,
        commodityType,
        shopClassification: res.data.shopClassification.map(item => {
          return (parseInt(item) + 1).toString();
        })
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
      pageIndex: 1
    })
  }

  const handleMinLi = (key, item) => {
    setState({
      ...state,
      minLiKey: key,
      subCommodityCategoryCode: key === -1 ? '' : item.categoryCode,
      pageIndex: 1
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
    console.log(shopId, 'qubo')

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
    const length = name ? name.split('').length : 0;
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
	        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    const str = state.commodityType === '1' ? '申请' : '预约';
    if(!phone){
      message.error('请输入正确的手机号码', 3);
      return false;
    }
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
      message.error('请输入正确的手机号码', 3);
      return false;
    }
    if(!name){
      message.error('请输入您的称呼', 3);
      return false;
    }
    if(length < 2 || length > 10){
      message.error('请输入大于2个字或少于10个字的名字', 3);
      return false;
    }
    if(regEn.test(name) || regCn.test(name)) {
      message.error('不允许输入特殊字符', 3);
      return false;
    }
    const params = {
      applySource: 'TSC042',
      commodityType: state.commodityType,
      customerName: name,
      phoneNumber: phone,
      shopId: state.uid,
      ugcCommodityId: state.ugcId,
    }
    const result = await materialApi.materialCommodityApplyCheck(params);
    if(result.data){
      message.error(`您已经${str}过了，请勿重复${str}`, 3);
      return ;
    }else{
      const res = await materialApi.materialCommodityApply(params)
      if (res.data) {
        setApplyVisible(false)
        PhoneInput.current.state.value = ''
        NameInput.current.state.value = ''
        state.commodityType === 
        message.success(`${str}成功`, 3)
      }else{
        message.success(`${str}}失败`, 3)
      }
    }
  }

  const onCloseApply = () => {
    PhoneInput.current.state.value = ''
    NameInput.current.state.value = ''
    setApplyVisible(false)
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
    <BasicLayout headConfig={{ title: state.commodityType === '1' ? '看材料' : '看装修' }} pushType="material">
      {
        state.serviceStatus == 1 && state.shopClassification && state.shopClassification.indexOf(state.commodityType) >= 0 ? (
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
                      shopSettingVo={state.shopSettingVo}
                      commodityType={state.commodityType}
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
                      commodityType={state.commodityType}
                      pageResultVo={pageResultVo}
                      shopId={state.shopId}
                      keywordType={state.keywordType}
                      commodityCategoryCode={state.commodityCategoryCode}
                      subCommodityCategoryCode={state.subCommodityCategoryCode}
                      shopSettingVo={state.shopSettingVo}
                      showApplyUgc={item => {
                        applyVisibleShow(item)
                      }}
                      pageChange={pageChange}
                    />
                  </div>
                  <div className="apply_pgc">
                    <Modal
                      title={`${state.commodityType === '1' ? '申请' : '预约'}人信息`}
                      visible={applyVisible}
                      width={289}
                      onCancel={() => {
                        onCloseApply()
                      }}
                      footer={
                        <div>
                          <Button danger={true} style={ButtonStyle} onClick={applyUgc}>
                            {state.commodityType === '1' ? '申请' : '预约'}
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
        ) : <NoData tips="数据" />
      }
    </BasicLayout>
  )
}
