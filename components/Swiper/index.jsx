import React, { Component } from 'react';
import Swiper from 'swiper';

class SwiperMaterial extends Component {

    state = {
        galleryThumbs: null,
        curImg: null,
        defKey: '',
        imgList: [
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3c9b5bd3683a93e3c205e750538cc5a7c8ecc40ecff2b28df394fee5e4024667',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga788f64011df90c6db640f791851130c83ce90dad349a591a48ea182eb8b43d4',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngba2fcecc7343ffc18727e70f159cf9245029ae85010b09cd30d88245d30c87f8',
            'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngba2fcecc7343ffc18727e70f159cf9245029ae85010b09cd30d88245d30c87f8'
        ],
    }

    componentDidMount () {
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 15,
            slidesPerView: 4,
            // loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        const { imgList } = this.props;
        if ( imgList.length > 0 ) {
            this.props.getCurrentUrl(imgList[0]);
            this.setState({
                curImg: imgList[0],
            });
        }
        this.setState({
            galleryThumbs,
            defKey: '0'
        });
    }
    componentDidUpdate() {
        this.state.galleryThumbs.update();
    }

    next = () => {
        const { galleryThumbs } = this.state;
        console.log(galleryThumbs.slideNext, 'qubo')
        galleryThumbs.slideNext();
    }

    prev = () => {
        const { galleryThumbs } = this.state;
        galleryThumbs.slidePrev();
    }

    getImg = (img, ids) => {
        const defKey = this.state.defKey;
        this.props.getCurrentUrl(img);
        if (defKey) {
            const idsStyle = document.getElementById('ID_TOP_IMG_' + defKey);
            idsStyle.style.border = 'none';
        }
        this.setState({
            curImg: img,
            defKey: ids + ''
        }, function () {
            const idsStyle = document.getElementById('ID_TOP_IMG_' + ids);
            idsStyle.style.border = '2px solid #F0061B';
        });
    }

    render () {
        const { imgList } = this.props;
        const { curImg } = this.state;

        return (
            <div className="swiper-main">
                <div className="swiper-slide swiperMaterial-t-img" style={{ backgroundImage: `url(${curImg})` }}></div>
                <div className="swiper-container gallery-thumbs">
                    <div className="swiper-wrapper">
                        {imgList.length > 0 && imgList.map((item, index) => {
                            return(
                                <div key={index} id={'ID_TOP_IMG_'+ index} className={'swiper-slide swiperMaterial-b-img'} onClick={this.getImg.bind(this, item, index)} style={{ backgroundImage: `url(${item})` }}></div>
                            );
                        })}
                    </div>
                    <div className="swiper-button-next swiper-button-white" onClick={this.next}></div>
                    <div className="swiper-button-prev swiper-button-white" onClick={this.prev}></div>
                </div>
            </div>
        );
    }
}

export default SwiperMaterial;
