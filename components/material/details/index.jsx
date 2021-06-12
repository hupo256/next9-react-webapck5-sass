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
        ugcId: '',
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
                if(res.data !== null){
                    this.setState({
                        ...this.state,
                        infoObj: res.data,
                        downUrl: res.data.renderings !== null && res.data.renderings ? res.data.renderings[0] : this.state.imgList[0],
                        collectFlag: res.data.isFavorited,
                        isApply: res.data.isApply,
                        videoIntroduction: res.data.videoIntroduction
                    }, () => {
                        this.getImgList();
                        this.getCommendBrand(type);
                        this.getSupplier();
                    })   
                }
            })
        }); 
    }
    getImgList = () => {
        const renderings = [...this.state.infoObj.renderings];
        const video = this.state.infoObj.videoIntroduction;
        if(video){
            renderings.unshift({
                type: 'video',
                video
            });
        }

        this.setState({
            ...this.state,
            infoObj: {
                ...this.state.infoObj,
                renderings
            }
        })
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
        const params = tools.urlParamHash();
        const commodityType = params.type;
        const url = `${window.location.origin}/${commodityType === '1' ? 'material' : 'trim'}/brandInfo?id=${uid}`;
        window.open(url);
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
        image.src = this.state.infoObj.mapImage + '?time=' + new Date().getTime();
        //重要，设置 crossOrigin 属性，否则图片跨域会报错
        image.setAttribute('crossOrigin', 'Anonymous');
        // 图片未加载完成时操作会报错
        image.onload = () => {
            tag.href = this.getImageDataURL(image);
            tag.click();
        };
    }
    getCommendBrand = (type) => {
        const urlKeys = tools.urlParamHash();
        const commodityId = urlKeys.id;
        const params = {
            commodityId,
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

    applyStuff = async e => {
        const name = this.refs.NameInput.state.value
        const phone = this.refs.PhoneInput.state.value
        const length = name ? name.split('').length : 0;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if(!phone){
            message.error('请输入正确的手机号码');
            return false;
        }
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            message.error('请输入正确的手机号码');
            return false;
        }
        if(!name){
            message.error('请输入您的称呼');
            return false;
        }
        if(length < 2 || length > 10){
            message.error('请输入大于2个字或少于10个字的名字');
            return false;
        }
        if(regEn.test(name) || regCn.test(name)) {
            message.error('不允许输入特殊字符');
            return false;
        }
        const params = {
            applySource: 'TSC000',
            commodityType: this.state.infoObj.commodityType,
            customerName: name,
            phoneNumber: phone,
            shopId: this.state.infoObj.uid,
            ugcCommodityId: this.state.infoObj.ugcId,
        }
        const result = await materialApi.materialCommodityApplyCheck(params);

        if(result.data){
            message.error('您已经申请过了，请勿重复申请');
            return ;
        }else{
            const res = await materialApi.materialCommodityApply(params)
            if (res.data) {
                this.setState({
                    ...this.state,
                    isApply: true,
                    applyVisible: false
                })
                this.refs.PhoneInput.state.value = ''
                this.refs.NameInput.state.value = ''
                message.success('申请成功', 3)
            }else{
                message.error('申请失败', 3)
            }
        }
    }
  
    onCloseApply = () => {
        this.refs.PhoneInput.state.value = ''
        this.refs.NameInput.state.value = ''
        
        this.setState({
            ...this.state,
            applyVisible: false
        })
    }
  
    applyVisibleShow = item => {
      this.setState({
        ...this.state,
        ugcId: item.ugcId,
        applyVisible: true
      })
    }

    jumpCommodityAddress = () => {
        const { infoObj } = this.state;
        if(infoObj.commodityAddress.indexOf('http:') < 0 && infoObj.commodityAddress.indexOf('https:') < 0){
            window.open(`${window.location.protocol}//${infoObj.commodityAddress}`);
        } else {
            window.open(infoObj.commodityAddress);
        }
    }

    render () {
        const { infoObj, recommendList, type, applyVisible, isApply } = this.state;

        return (
            <BasicLayout headConfig={{ title: '详情' }} pushType="designer">
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
                                            {
                                                // console.log(infoObj.renderings, 'qubo')
                                            }
                                            <InSwiper getCurrentUrl={this.getCurrentUrl} key={new Date().getTime() + ''} imgList={infoObj.renderings !== null && infoObj.renderings ? infoObj.renderings : this.state.imgList} />
                                        </div>
                                        <div className={styles.materialInfo_t_right}>
                                            <div className={styles.materialInfo_theader}>
                                                <div className={styles.materialInfo_theader_title}>
                                                    <span>{infoObj.commodityName || ''}</span>
                                                </div>
                                            </div>
                                            {
                                                !infoObj.brandVo || !infoObj.brandVo.brandName ? null : (
                                                    <div className={styles.materialInfo_pp}>
                                                        <span>品牌：</span>
                                                        <span onClick={this.jumpToBrandInfo} className={styles.hoverSpan}>{infoObj.brandVo && infoObj.brandVo.brandName}</span>
                                                    </div>
                                                )
                                            }
                                            <div className={styles.materialInfo_fx} onClick={this.shareUrl}>
                                                <img alt="" src='/assets/ic_share.png'></img>
                                                <span>分享</span>
                                            </div>
                                            <div className={styles.materialInfo_btn_group}>
                                                {
                                                    this.state.commodityType === '1' && this.state.infoObj.mapImage ? (
                                                        <div onClick={this.downFile} className={styles.materialInfo_btn_upload}>
                                                            <img alt="" src={'/assets/ic_download_small@2x.png'} style={{ marginRight: '10px', width: '18px', height: '18px' }}></img>
                                                            <span>下载素材</span>
                                                        </div>
                                                    ) : null
                                                }
                                                {
                                                    infoObj.commodityAddress ? (
                                                        <div onClick={this.jumpCommodityAddress} className={styles.materialInfo_btn_noApply}>
                                                            <span>查看更多</span>
                                                        </div>
                                                    ) : null
                                                }
                                                {
                                                    (isApply ? <div className={styles.materialInfo_btn_noApply}>
                                                        <span>已{this.state.commodityType === '1' ? '申请' : '预约'}</span>
                                                    </div> : 
                                                    <div className={styles.materialInfo_btn_apply} onClick={() => { this.setState({...this.state, applyVisible: true}) }} style={{marginLeft: infoObj.commodityAddress ? '0' : '10px'}}>
                                                        <img style={{width: '18px', height: '18px', marginRight: '10px'}} src="/assets/ic_apply_small@2x.png" alt="" />
                                                        <span>{infoObj.commodityType === '1' ? (infoObj.materialsButtonValue || '小样申请') : (infoObj.productButtonValue || '商品预约')}</span>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.materialInfo_shopinfo}>
                                        <ShopInfo type={type} infoObj={infoObj} recommendList={recommendList} type={this.state.commodityType} />
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
                    onCancel={this.onCloseApply}
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
