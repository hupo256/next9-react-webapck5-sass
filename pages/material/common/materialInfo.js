import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import ShopInfo from './shopInfo';
import { message, Tooltip } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import HeartImg from '../assets/ic_collect_sel@2x.png';
import NoHeartImg from '../assets/ic_collect@2x.png';
import materialApi from '@service/materialApi'
import styles from './styles/materialInfo.module.scss';

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
        urlType: 'details'
    }
    downUrl = '';
    componentDidMount () {
        const uid = location.href.split('?')[1].split('=')[1];
        // 根据来源判断接口调用
        const urlType = 'details'; //preview
        let type = 'ugc';
        this.setState({ uid, type, urlType }, () => {
            materialApi.materialProductDetail({type: 2, uid}).then(res => {
                this.setState({
                    ...this.state,
                    infoObj: res.data,
                    downUrl: res.data.renderings ? res.data.renderings[0] : this.state.imgList[0],
                    collectFlag: res.data.isFavorited,
                    isApply: res.data.isApply
                }, () => {
                    this.getCommendBrand(type);
                })
            })
        }); 
    }
    previewFun = () => {
        const { urlType } = this.state;
        if(urlType === 'preview') { return }
    }
    // 供应商
    getSupplier = () => {
        // request('/api/v1/moyang/shop/get_supplier', {
        //     method: 'POST',
        //     data: {
        //         commodityId: this.state.infoObj.pgcId,
        //         commodityType: this.state.infoObj.commodityType || '1',
        //         pageIndex: 1,
        //         pageSize: 4
        //     }
        // }).then((res) => {
        //     if (res.code === 200) {
        //         this.setState({ supplierList: res.data.items || [] });
        //     }
        // });
    }

    // 申请
    applyStuff = () => {
        // const tokenInspire = getStorageItem('token_inspire');
        const { infoObj, type } = this.state;
        console.log(infoObj, 'qubo');
        this.previewFun();
        if (!tokenInspire) {
            this.props.dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
        } else if (type === 'pgc') {
            this.props.dispatch({ type: 'layouts/save', payload: { applicationMaterials: true } });
            this.props.dispatch({ type: 'layouts/getSupplier', payload: { pageIndex: 1, pageSize: 20, commodityId: infoObj.pgcId, commodityType: infoObj.commodityType } });
        } else {
            let userinfoJson = localStorage.getItem('userInfo');
            let user = JSON.parse(userinfoJson);
            // request('/api/v1/moyang/ugc/commodity/apply', {
            //     method: 'POST',
            //     data: {
            //         applySource: 'TSC043',
            //         commodityType: infoObj.commodityType,
            //         customerName: user.nickName,
            //         phoneNumber: user.mobile,
            //         shopId: infoObj.shopVo.id,
            //         ugcCommodityId: infoObj.ugcId,
            //     }
            // }).then((res) => {
            //     if(res.code === 200) {
            //         this.setState({ isApply: true });
            //         message.success(res.message);
            //     }
            // });
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
        history.push({ pathname: `/brandinfo/${uid}` });
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
        // const tokenInspire = getStorageItem('token_inspire');
        if (!tokenInspire) {
            this.props.dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
        } else {
            const newBlank = `${window.location.origin}/shopinfo/${item.shopCode}`;
            window.open(newBlank, '_blank');
        }
    }
    shareUrl = () => {
        this.previewFun();
        let path = `${window.location.origin}${history.location.pathname}`;
        copy(path);
        message.success("链接已复制成功！");
    }
    getCurrentUrl = (url) => {
        this.downUrl = url;
    }
    handleCollect = () => {
        this.previewFun();
        // const tokenInspire = getStorageItem('token_inspire');
        const { collectFlag, type, infoObj } = this.state;
        if (!tokenInspire) {
            this.props.dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
        } else if(collectFlag) {
            let params = type === 'pgc' ? {
                pgcCommodityId: infoObj.pgcId,
            } : {
                shopId: infoObj.shopVo.id,
                ugcCommodityId: infoObj.ugcId,
            };
                // 已收藏，点取消
            // request('/api/v1/moyang/favorite_commodity/cancel', {
            //     method: 'POST',
            //     data: params
            // }).then((res) => {
            //     if(res.code === 200) {
            //         message.success('取消收藏');
            //         this.setState({ collectFlag: false, });
            //     }
            // });
        }else {
            this.setState({ visibleCollect: true });
        }

    }
    handleSuccess = () => {
        this.setState({
            collectFlag: true,
            visibleCollect: false,
        });
    }

    render () {
        const { infoObj, recommendList, supplierList, type, collectFlag, visibleCollect, isApply } = this.state;

        return (
            <div className={styles.materialInfo_main}>
                <div className={styles.materialInfo_context}>
                    <div className={styles.materialInfo_mbx}>
                        <span>当前位置：</span>
                        <span>{infoObj.shopVo && infoObj.shopVo.name}&nbsp;{'>'}&nbsp;</span>
                        <span>{infoObj.commodityName || ''} </span>
                    </div>
                    <div className={styles.materialInfo_theard}>
                        <div className={styles.materialInfo_t_left}>
                            {/* <InSwiper getCurrentUrl={this.getCurrentUrl} key={new Date().getTime() + ''} imgList={infoObj.renderings ? infoObj.renderings : []} /> */}
                        </div>
                        <div className={styles.materialInfo_t_right}>
                            <div className={styles.materialInfo_theader}>
                                <div className={styles.materialInfo_theader_title}>
                                    <span>{infoObj.commodityName || ''}</span>
                                </div>
                                <Tooltip
                                    color={'#fff'} trigger={'click'} placement="leftBottom" 
                                    overlayStyle={{ }}
                                    overlayClassName={styles.tooltip_wrap}
                                    visible={visibleCollect}
                                    title="1"
                                    // title={<Collect handleSuccess={this.handleSuccess} closeMask={this.closeMask} commodityType={type} data={infoObj} setCollectVis={() => {}} />}
                                    >
                                        
                                    <div className={styles.materialInfo_theader_icon}>
                                        <div onClick={this.handleCollect} style={{ cursor: 'pointer' }}>{ collectFlag ? <img style={{ width: '19px', height: '18px' }} src={HeartImg} /> : <img style={{ width: '19px', height: '18px' }} src={NoHeartImg}/>}</div>
                                        {/* <div onClick={this.handleCollect} style={{ cursor: 'pointer' }}>{ collectFlag ? <img style={{ width: '19px', height: '18px' }} src='' /> : <img style={{ width: '19px', height: '18px' }} src=''/>}</div> */}
   
                                    </div>
                                </Tooltip>
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
                                {/* <img alt="" src={require('@/assets/ic_share.png')}></img> */}
                                <span>分享</span>
                            </div>
                            <div className={styles.materialInfo_jg}>
                                {/* <span>¥</span>
                                <span>{infoObj.price}</span> */}
                            </div>
                            <div className={styles.materialInfo_btn_group}>
                                <div onClick={this.downFile} className={styles.materialInfo_btn_upload}>
                                    <span>下载素材</span>
                                </div>
                                { type === 'pgc' ? <div className={styles.materialInfo_btn_apply} onClick={this.applyStuff.bind(this)}>
                                    <span>申请材料</span>
                                </div> : (isApply ? <div className={styles.materialInfo_btn_noApply}>
                                    <span>已申请</span>
                                </div> : <div className={styles.materialInfo_btn_apply} onClick={this.applyStuff.bind(this)}>
                                    <span>{infoObj.commodityType === '1' ? (infoObj.materialsButtonValue || '小样申请') : (infoObj.productButtonValue || '商品预约')}</span>
                                </div> ) }
                                
                            </div>
                            <div style={type === 'pgc' ? { display: 'block' } : { display: 'none' }} className={styles.materialInfo_gys_group}>
                                <div className={styles.materialInfo_gys_img}>
                                    {/* <img alt="" src={require('@/assets/ic_store.png')}></img> */}
                                    <span>商品供应商</span>
                                </div>
                                <div className={styles.materialInfo_gys_list}>
                                    <div className={styles.materialInfo_gys_map}>
                                        {supplierList.length > 0 && supplierList.map((item, index) => {
                                            return (
                                                <div key={index} className={styles.materialInfo_gys_card} onClick={() => this.changeSupplier(item)}>
                                                    <div className={styles.materialInfo_os_img}>
                                                        <img
                                                            alt=""
                                                            referrerPolicy="no-referrer"
                                                            src={item.shopLOGO}
                                                        />
                                                    </div>
                                                    <div className={styles.materialInfo_os_right}>
                                                        <div className={styles.materialInfo_os_right_title}>
                                                            {item.shopName}
                                                        </div>
                                                        <div>
                                                            关注: {item.followInterestCount}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.materialInfo_shopinfo}>
                        <ShopInfo type={type} dispatch={this.props.dispatch} infoObj={infoObj} recommendList={recommendList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MaterialInfo;
