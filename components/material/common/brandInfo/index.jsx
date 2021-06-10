import React, { Component, useState, useEffect } from 'react';
import { message } from 'antd';
import BasicLayout from '@components/HomePageLayout'
import tools from '../../../../libs/utils';
import materialApi from '@service/materialApi'

import styles from './brandInfo.module.scss';

export default function BrandInfo (props) {
    const [data, setData] = useState({});
    useEffect(() => {
        const urlhash = tools.urlParamHash();
        const uid = urlhash.id;
        const typeVal = 2;
        const params = {
            type: typeVal,
            uid
        };
        materialApi.materialBrandGet(params).then(res => {
            if(res.code === 200) {
                setData(res.data || {});
            } else {
                message.error(res.message);
            }
        });
    }, []);
    const { brandName, brandLOGO, videoIntroduction, imageIntroductions, brandProfile } = data;
    return (
        <BasicLayout headConfigx={{ title: '材料' }} pushType="designer">
            <div className="grayBg">
                <div className="conBox"></div>
                <div className={styles.brandInfo_main}>
                    <div className={styles.brandInfo_context}>
                        <div className={styles.brandInfo_mbx}>
                            <span>当前位置：</span>
                            <span>品牌&nbsp;{'>'}&nbsp;</span>
                            <span>品牌信息 </span>
                        </div>
                        <div className={styles.brandInfo_bodys}>
                            <div className={styles.brandInfo_b_table}>
                                <div className={styles.brandInfo_b_logo}>
                                    {/* https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng9a2e26b3f100b586093af26a2514c70bb690ef63ffca5294f7939b2c94b6190b */}
                                    <img alt="" src={ brandLOGO }></img>
                                </div>
                                <span>{ brandName }</span>
                            </div>
                            <div className={styles.brandInfo_info}>
                                <div className={styles.brandInfo_title}>
                                    { brandProfile }
                                </div>
                                {
                                    imageIntroductions && imageIntroductions.map((item, index) => {
                                        return (
                                            <div className={styles.brandInfo_b_img} key={index}>
                                                <img alt="" src={item}></img>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    videoIntroduction && <div className={styles.brandInfo_b_video}>
                                        <video src={videoIntroduction} controls="controls" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}