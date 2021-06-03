import React, { Component, useEffect, useState } from 'react';
import { getArticleDetail } from '@/services/strategy';
import { message } from 'antd';
import styles from './index.module.scss';

export default function TrimInfo (props) {
    const [detailData, setDetailData] = useState({});
    useEffect(() => {
        getArticleDetail({ uid: props.uid }).then((res) => {
            if(res.code === 200) {
                setDetailData(res.data || {});
            } else {
                message.error(res.message);
            }
        });
    }, []);
    const { createTime, content, title } = detailData;
    const dataTile = "<p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">近日，希尔顿酒店集团旗下精选酒店系列品牌——启缤精选Tapestry Collection的内地首店，以文安郝力克酒店的身份，在河北省廊坊市文安县的中国绿发生态城落地。相比起过去诸多酒店品牌的首店大多选择城市，内地首家启缤精选则走上了一条更令人向往的“乡村之路”。</p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">万豪、希尔顿、丽世…纷纷盯上中国乡村</p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\"></p><div class=\"media-wrap image-wrap\"><img src=\"https://test.img.inbase.in-deco.com/crm_saas/dev/20210519/74d3eaf6416546fd97c8e6fb6fa43a74/2.png.png\" width=\"821px\" height=\"578px\" style=\"width:821px;height:578px\"/></div><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\"></p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">事实上，希尔顿并非唯一找到在乡村落脚的国际酒店，若我们认真追溯，2007年或许是难以避开的重要一年。这一年，南非人高天成和朋友们以每年1万元的价格租下莫干山当地村民废弃的农舍。对于彼时的莫干山村民而言，这种“人傻钱多”的举动显然有些不可思议——谁会专程来小山村住？</p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">但裸心乡除了独具设计的精品住宿外，还提供了骑马、体验农场生活、爬山、骑行等野趣体验。很快，当时的裸心乡房价就达到了约1000元/晚，还常常一方难求，甚至带动了整个莫干山的民宿产业大爆发。“裸心乡”，或许称得上国际酒店品牌与中国乡村的初期碰撞典范。裸心也将短途乡村度假旅游市场的目光，落在了莫干山之外。</p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">裸心揭开了中国乡村的梦幻一角，近几年，诸多国际酒店也开始在乡村寻找出路。最先有所行动的，是以度假为名的酒店品牌们，譬如阿丽拉曾在安吉、阳朔的精妙选址，日本星野集团的大陆地区首店也开在了浙江天台县的某个村庄，而国内首家丽世度假村，也另辟蹊径地选在了广西崇左市大新县明仕村，兼具自然与异域风情……</p><p style=\"text-align:justify;\" size=\"0\" _root=\"undefined\" __ownerID=\"undefined\" __hash=\"undefined\" __altered=\"false\">随后，是与地域或项目因需求，对国际酒店品牌的引入。2015年，多利农庄携手LUX（丽世），致力打造中国美丽乡村酒店。历数丽世在中国的布局路线，几乎都落于乡村。其在中国的首秀“茶马古道酒店系列”的多家酒店，通过与丽江玉龙旅游股份有限公司合作，从石头城到小米地再到三谷水，一个个小众的乡村地名背后，是茶马古道沿线最美风景的串联。</p>";
    return (
        <div className={styles.trimInfo_main}>
            <div className={styles.trimInfo_context}>
                <div className={styles.trimInfo_mbx}>
                    <span>当前位置：</span>
                    <span className={styles.linkSpan} onClick={props.goBackFun}>装修攻略&nbsp;{'>'}&nbsp;</span>
                    <span>{ title }</span>
                </div>
                <div className={styles.trimInfo_info}>
                    <div className={styles.trimInfo_wz} >
                        <div className={styles.trimInfo_title}>
                            { title }
                        </div>
                        <div className={styles.trimInfo_time}>
                            <span>{ createTime }</span>
                        </div>
                        <div style={{ paddingBottom: '85px' }} dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    );
}