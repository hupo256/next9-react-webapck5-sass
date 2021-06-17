import React, { Component, useEffect, useState } from 'react';
import Swiper from 'swiper';
import { Carousel } from 'antd';

import './swiperShopBanner.scss';

class SwiperShopBanner extends Component {
    state = {
        galleryThumbs: null,
        imgList: this.props.swiperImgList || []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            imgList: props.swiperImgList || []
        };
    }

    componentDidMount () {
        var galleryThumbs = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: true,
            paginationClickable: true,
        });
        this.setState({
            galleryThumbs
        });
    }

    render () {
        const contentStyle = {
            height: '321px',
            lineHeight: '321px',
            textAlign: 'center',
        };
        const { imgList } = this.state;
        return (
            <div className="swiperShopBanner-main">
                <Carousel autoplay>
                    {imgList.length > 0 && imgList.map((item, index) => {
                        return(
                            <div key={index}>
                                <img
                                    style={{ height: '321px', width: '1100px' }}
                                    alt=""
                                    referrerPolicy="no-referrer"
                                    src={item}
                                />
                            </div>
                        );
                    })}
                    
                </Carousel>
            </div>
        );
    }
}

export default SwiperShopBanner;
