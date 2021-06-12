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
        }
        this.setState({
            ...this.state,
            galleryThumbs,
            defKey: '0',
            curImg: imgList[0]
        }, () => {
            const list = imgList ? imgList : this.state.imgList;
            this.getImg(list[this.state.defKey], this.state.defKey);
        });
    }
    componentDidUpdate() {
        this.state.galleryThumbs.update();
    }

    next = () => {
        let { defKey, imgList, galleryThumbs } = this.state;
        const list = this.props.imgList ? this.props.imgList : imgList;

        galleryThumbs.slideNext();
        if(parseInt(defKey) >= list.length - 1){
            this.showOrHideBtn();
            return;
        }else{
            defKey = parseInt(defKey) + 1;
            this.getImg(list[defKey], defKey);
        }
    }

    prev = () => {
        let { defKey, imgList, galleryThumbs } = this.state;
        const list = this.props.imgList ? this.props.imgList : imgList;

        galleryThumbs.slidePrev();
        if(parseInt(defKey) <= 0){
            this.showOrHideBtn();
            return;
        }else{
            defKey = parseInt(defKey) - 1;
            this.getImg(list[defKey], defKey);
        }
    }

    showOrHideBtn = () => {
        const { imgList, defKey } = this.state;
        const list = this.props.imgList ? this.props.imgList : imgList;
        if(list.length == 1){
            this.refs.nextBtn.style.display = 'none';
            this.refs.prevBtn.style.display = 'none';
            return;
        }
        if(parseInt(defKey) === list.length - 1){
            this.refs.nextBtn.style.display = 'none';
            this.refs.prevBtn.style.display = 'flex';
        }else if(parseInt(defKey) === 0){
            this.refs.prevBtn.style.display = 'none';
            this.refs.nextBtn.style.display = 'flex';
        }else{
            this.refs.nextBtn.style.display = 'flex';
            this.refs.prevBtn.style.display = 'flex';
        }
    }

    getImg = (img, ids) => {
        const defKey = this.state.defKey;
        if(ids === 0 && typeof(img) !== 'string'){
            this.props.getCurrentUrl(img.video);
        }else{
            this.props.getCurrentUrl(img);
        }
        if (defKey) {
            const idsStyle = document.getElementById('ID_TOP_IMG_' + defKey);
            idsStyle.style.border = 'none';
        }

        this.setState({
            ...this.state,
            curImg: img,
            defKey: ids + ''
        }, function () {
            const idsStyle = document.getElementById('ID_TOP_IMG_' + ids);
            idsStyle.style.border = '2px solid #F0061B';
            this.showOrHideBtn();
        });
    }

    render () {
        const { imgList } = this.props;
        const { curImg, defKey } = this.state;

        return (
            <div className="swiper-main">
                {
                    defKey == 0 ? 
                    typeof(imgList[0]) === 'string' ? 
                    <div className="swiper-slide swiperMaterial-t-img" style={{ backgroundImage: `url(${curImg})` }}></div> : 
                    <div className="swiper-slide swiperMaterial-t-img">
                        {
                            curImg !== null ? <video src={curImg.video} style={{width: '100%', height: '100%'}} controls></video> : null
                        }
                    </div> : 
                    <div className="swiper-slide swiperMaterial-t-img">
                        <img src={curImg} alt="" title="" style={{width: '100%', height: '100%'}} />
                    </div>    
                }
                <div className="swiper-container gallery-thumbs">
                    <div className="swiper-wrapper">
                        {imgList.length > 0 && imgList.map((item, index) => {
                            if(typeof(item) !== 'string'){
                                return (
                                    <div key={index} id={'ID_TOP_IMG_'+ index} className={'swiper-slide swiperMaterial-b-img'} onClick={this.getImg.bind(this, item, index)}>
                                        <video src={item.video} style={{width: '100%', height: '100%'}}></video>
                                    </div>
                                )
                            }else{
                                return(
                                    <div key={index} id={'ID_TOP_IMG_'+ index} className={'swiper-slide swiperMaterial-b-img'} onClick={this.getImg.bind(this, item, index)}>
                                        <img src={item} alt="" title="" style={{width: '100%', height: '100%'}} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="swiper-button-next swiper-button-white" ref="nextBtn" onClick={this.next}></div>
                    <div className="swiper-button-prev swiper-button-white" ref="prevBtn" onClick={this.prev}></div>
                </div>
            </div>
        );
    }
}

export default SwiperMaterial;
