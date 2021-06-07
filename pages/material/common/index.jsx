import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import ShopInfo from './shopInfo';
import { message, Tooltip, Button, Input } from 'antd';
import BasicLayout from '@components/HomePageLayout'
import InSwiper from '@components/Swiper';
import materialApi from '@service/materialApi'
import styles from './styles/materialInfo.module.scss';
import Modal from 'antd/lib/modal/Modal';
import tools from '../../../libs/utils';

const InputStyle = {
	width: '100%',
	height: '30px',
	border: '1px solid #E5E5E5',
	borderRadius: '4px',
	background: '#ffffff'
}

const ButtonStyle = {
	width: '100%',
	borderRadius: '4px',
	border: 'none',
	background: '#FF7300',
	color: '#ffffff'
}

class MaterialInfo extends Component {
    state = {
        imgList: [
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3c9b5bd3683a93e3c205e750538cc5a7c8ecc40ecff2b28df394fee5e4024667',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga788f64011df90c6db640f791851130c83ce90dad349a591a48ea182eb8b43d4',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngba2fcecc7343ffc18727e70f159cf9245029ae85010b09cd30d88245d30c87f8',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngba2fcecc7343ffc18727e70f159cf9245029ae85010b09cd30d88245d30c87f8'
        ],
        uid: '',
        infoObj: {}, // 接口返回
        type: 'ugc',
        recommendList: [],
        supplierList: [],
        collectFlag: false,
        visibleCollect: false,
        isApply: false, //true已申请
        urlType: 'details',
        applyVisible: false
    }
    downUrl = '';
    componentDidMount () {
        const params = tools.urlParamHash();
        const uid = params.id;
        const commodityType = params.type;
        // 根据来源判断接口调用
        const urlType = 'details'; //preview
        let type = 'ugc';
        this.setState({ ...this.state, uid, type, commodityType, urlType }, () => {
            materialApi.materialProductDetail({type: 2, uid}).then(res => {
                this.setState({
                    ...this.state,
                    infoObj: res.data,
                    downUrl: res.data.renderings !== null && res.data.renderings ? res.data.renderings[0] : this.state.imgList[0],
                    collectFlag: res.data.isFavorited,
                    isApply: res.data.isApply
                }, () => {
                    this.getCommendBrand(type);
                    this.getSupplier();
                })
            })
        }); 
    }
    previewFun = () => {
        const { urlType } = this.state;
        if(urlType === 'preview') { return }
    }
    // 供应商
    getSupplier = async () => {
        const { infoObj } = this.state;
        const params = {
            commodityId: infoObj.pgcId,
            commodityType: "1",
            keyword: "",
            pageIndex: 0,
            pageSize: 1
        }
        const res = await materialApi.materialGetSupplier(params)
        this.setState({ supplierList: res.data.items || [] });
    }

    // 申请
    applyStuff = async () => {
        const { commodityType, shopVo, ugcId } = this.state.infoObj;
        const customerName = this.refs.NameInput.state.value
        const phoneNumber = this.refs.PhoneInput.state.value
        const params = {
            applySource: "TSC042",
            commodityType,
            customerName,
            phoneNumber,
            shopId: shopVo.id,
            ugcCommodityId: ugcId
        }

        const res = await materialApi.materialCommodityApply(params);
        if(res.data){
            this.setState({
                ...this.state,
                isApply: true,
                applyVisible: false
            }, () => {
                this.refs.NameInput.state.value = '';
                this.refs.PhoneInput.state.value = '';
                message.success('申请成功')
            })
        }
    }
    
    closeMask = () => {
        this.setState({
            visibleCollect: false,
        });
    }
    jumpToBrandInfo = () => {
        const { urlType } = this.state;
        if(urlType === 'preview') { return }
        const infoObj = this.state.infoObj || {};
        const brandVo = infoObj.brandVo || {};
        const uid = brandVo.uid;
        window.location.href = `${window.location.origin}${window.location.pathname}/brandInfo?id=${uid}`;
    }
    getImageDataURL = (image) => {
        // 创建画布
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        // 以图片为背景剪裁画布
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // 获取图片后缀名
        const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
        // 某些图片 url 可能没有后缀名，默认是 png
        return canvas.toDataURL('image/' + extension, 1);
    }
    downFile = () => {
        this.previewFun();

        const tag = document.createElement('a');
        // 此属性的值就是**时图片的名称，注意，名称中不能有半角点，否则**时后缀名会错误
        tag.setAttribute('download', new Date().getTime() + '' || 'photo');
        const image = new Image();
        // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
        image.src = this.downUrl + '?time=' + new Date().getTime();
        //重要，设置 crossOrigin 属性，否则图片跨域会报错
        image.setAttribute('crossOrigin', 'Anonymous');
        // 图片未加载完成时操作会报错
        image.onload = () => {
            tag.href = this.getImageDataURL(image);
            tag.click();
        };
    }
    getCommendBrand = (type) => {
        const params = {
            commodityType: this.state.infoObj.commodityType || '1', //数据接口回来
            keyword: '',
            pageIndex: 1,
            pageSize: 6,
            shopId: this.state.infoObj.shopVo.id,
            source: '2'
        }

        materialApi.materialrecommend(params).then(res => {
            this.setState({ recommendList: res.data || [] });
        })
    }
    changeSupplier = (item) => {
        this.previewFun();
        const newBlank = `${window.location.origin}/shopinfo/${item.shopCode}`;
        window.open(newBlank, '_blank');
    }
    shareUrl = () => {
        this.previewFun();
        let path = window.location;
        copy(path);
        message.success("链接已复制成功！");
    }
    getCurrentUrl = (url) => {
        this.downUrl = url;
    }
    handleSuccess = () => {
        this.setState({
            collectFlag: true,
            visibleCollect: false,
        });
    }

    render () {
        const { infoObj, recommendList, supplierList, type, applyVisible, isApply } = this.state;

        return (
            <BasicLayout headConfigx={{ title: '材料' }} pushType="designer">
                <div className="grayBg">
                    <div className="conBox">
                        <div className={styles.scmpage_body} style={{display: 'block'}}>
                            <div className={styles.materialInfo_main}>
                                <div className={styles.materialInfo_context}>
                                    <div className={styles.materialInfo_mbx}>
                                        <span>当前位置：</span>
                                        <span>{infoObj.shopVo && infoObj.shopVo.name}&nbsp;{'>'}&nbsp;</span>
                                        <span>{infoObj.commodityName || ''} </span>
                                    </div>
                                    <div className={styles.materialInfo_theard}>
                                        <div className={styles.materialInfo_t_left}>
                                            <InSwiper getCurrentUrl={this.getCurrentUrl} key={new Date().getTime() + ''} imgList={infoObj.renderings !== null && infoObj.renderings ? infoObj.renderings : this.state.imgList} />
                                        </div>
                                        <div className={styles.materialInfo_t_right}>
                                            <div className={styles.materialInfo_theader}>
                                                <div className={styles.materialInfo_theader_title}>
                                                    <span>{infoObj.commodityName || ''}</span>
                                                </div>
                                            </div>
                                            <div className={styles.materialInfo_pp}>
                                                <span>品牌：</span>
                                                <span onClick={this.jumpToBrandInfo} className={styles.hoverSpan}>{infoObj.brandVo && infoObj.brandVo.brandName}</span>
                                            </div>
                                            <div className={styles.materialInfo_xs}>
                                                <span>
                                                    {infoObj.description}
                                                </span>
                                            </div>
                                            <div className={styles.materialInfo_fx} onClick={this.shareUrl}>
                                                <img alt="" src='/assets/ic_share.png'></img>
                                                <span>分享</span>
                                            </div>
                                            <div className={styles.materialInfo_jg}>
                                                <span>¥</span>
                                                <span>{infoObj.price}</span>
                                            </div>
                                            <div className={styles.materialInfo_btn_group}>
                                                <div onClick={this.downFile} className={styles.materialInfo_btn_upload}>
                                                    <img alt="" src={'/assets/ic_download_small@2x.png'} style={{ marginRight: '10px', width: '18px', height: '18px' }}></img>
                                                    <span>下载素材</span>
                                                </div>
                                                {
                                                    (isApply ? <div className={styles.materialInfo_btn_noApply}>
                                                        <span>已申请</span>
                                                    </div> : 
                                                    <div className={styles.materialInfo_btn_apply} onClick={() => { this.setState({...this.state, applyVisible: true}) }}>
                                                        <img style={{width: '18px', height: '18px', marginRight: '10px'}} src="/assets/ic_apply_small@2x.png" alt="" />
                                                        <span>{infoObj.commodityType === '1' ? (infoObj.materialsButtonValue || '小样申请') : (infoObj.productButtonValue || '商品预约')}</span>
                                                    </div>)
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.materialInfo_shopinfo}>
                                        <ShopInfo type={type} dispatch={this.props.dispatch} infoObj={infoObj} recommendList={recommendList} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apply_pgc">
                    <Modal
                    title="申请人信息"
                    visible={applyVisible}
                    width={289}
                    onCancel={() => { this.setState({...this.state, applyVisible: false}) }}
                    footer={
                        <div>
                            <Button danger={true} style={ButtonStyle} onClick={this.applyStuff.bind(this)}>申请</Button>
                        </div>
                    }
                    >
                        <div style={{...InputStyle, marginBottom: '12px'}}>
                            <Input
                            placeholder="请输入联系电话"
                            ref='PhoneInput'
                            />
                        </div>
                        <div style={InputStyle}>
                            <Input
                            placeholder="请输入您的称呼"
                            ref='NameInput'
                            />
                        </div>
                    </Modal>
                </div>
            </BasicLayout>
        );
    }
}

export default MaterialInfo;
