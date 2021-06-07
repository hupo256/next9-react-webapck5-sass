import React, { Component } from 'react';
// import { getStorageItem } from '@/utils/storage';
import styles from './styles/shopinfo.module.scss';

export default function ShopInfo (props) {
    const { shopContext = true, infoObj, recommendList, type, dispatch } = props;
    const defaultImgUrl = 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3c9b5bd3683a93e3c205e750538cc5a7c8ecc40ecff2b28df394fee5e4024667';
    const toInfoPage = (item) => {
        const newBlank = `${window.location.origin}/material/common/materialInfo?id=${item.ugcId}`;
        window.open(newBlank, '_blank');
    };
    return (
        <div className={styles.shopinfo_main}>
            <div className={styles.shopinfo_left} style={shopContext ? {} : { display: 'none' }}>
                <div className={styles.shopinfo_shopname}>
                    <img alt="" src={'/assets/ic_introduce.png'}></img>
                    <span>商品介绍</span>
                </div>
                <div className={styles.shopinfo_context}>
                    <img alt="" src={infoObj.mapImage || "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf172ceb0a19056de618bbe4850733d89a2d38d69f0e0268a820b1e5249567a09"}></img>
                </div>
            </div>
            <div className={styles.shopinfo_right}>
                <div className={styles.shopinfo_wngj}>
                    {/* <img alt="" src={require('@/assets/ic_commend.png')}></img> */}
                    <span>商品推荐</span>
                </div>
                <div className={styles.shopinfo_sp_list} style={shopContext ? {} : { display: 'flex' }}>
                    { recommendList.length > 0 && recommendList.map((item, index) => {
                        return(
                            <div key={index} onClick={()=>toInfoPage(item)}>
                                <div className={styles.shopinfo_sp_cards}>
                                    <div className={styles.shopinfo_sp_img}>
                                        <img alt="" src={item.displayImage ? item.displayImage[0] : defaultImgUrl}></img>
                                    </div>
                                    <div className={styles.shopinfo_sp_title}>
                                        <span>{item.commodityName}</span>
                                    </div>
                                </div>
                            </div>
                        
                        );
                    }) }
                    
                    {/* <div className={styles.shopinfo_sp_cards} style={shopContext ? {} : { marginLeft: '18px' }}>
                        <div className={styles.shopinfo_sp_img}>
                            <img alt="" src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd0f9924206466594d421746f897c7b637920a0c1001ae8706f1378baa1d08758"></img>
                        </div>
                        <div className={styles.shopinfo_sp_title}>
                            <span>意大利新灰地板</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}