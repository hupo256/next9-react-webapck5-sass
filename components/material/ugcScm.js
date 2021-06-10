import React, { Component, useState } from 'react';
import { Pagination, message } from 'antd';
import tools from '../../libs/utils';
import Result from './details/Result';
import styles from './components.module.scss';
import materialApi from '../../service/materialApi';

function createScmCols ({ key, defKey, item, index, collectKey,
    commodityCategoryCode, handleMouseover, handleoMouseout,
    seeMaterialInfo, setCollectVis, pageIndex, shopId, query, showApplyUgc, pageChange }) {
    let downUrl = '';
    const handleSesMaterialInfo = function (parms, event) {
        event.stopPropagation();
        seeMaterialInfo(parms);
    };

    const handleCollect = function (parms, event) {
        event.stopPropagation();
        setCollectVis(parms.commodityCode);
    };

    const handleApply = async function (parms, event) {
        event.stopPropagation();
        showApplyUgc(parms);
    };

    const handleCollectMouseover = (key, collectKey, event) => {
        event.stopPropagation();
        handleMouseover(key);
        setCollectVis(collectKey);
    };

    const handleoCollectMouseout = (collectKey, event) => {
        event.stopPropagation();
    };

    const handleCollectClick = (event) => {
        event.stopPropagation();
    };

    const getImageDataURL = (image) => {
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

    const downFileImg = (url) => {
        const tag = document.createElement('a');
        // 此属性的值就是**时图片的名称，注意，名称中不能有半角点，否则**时后缀名会错误
        tag.setAttribute('download', new Date().getTime() + '' || 'photo');
        const image = new Image();
        // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
        image.src = url + '?time=' + new Date().getTime();
        //重要，设置 crossOrigin 属性，否则图片跨域会报错
        image.setAttribute('crossOrigin', 'Anonymous');
        // 图片未加载完成时操作会报错
        image.onload = () => {
            tag.href = getImageDataURL(image);
            tag.click();
            message.success('下载成功');
        };
    };

    const downFile = (parms, event) => {
        event.stopPropagation();
        if (!parms.mapImage) {
            return;
        }
        downFileImg(parms.mapImage);
    };

    return (
        <div key={`key_cols` + key} style={index === 0 ? {} : { marginLeft: '20px' }} className={styles.scm_rows} onClick={handleSesMaterialInfo.bind(this, item)} onMouseOver={() => handleMouseover(key)} onMouseOut={() => handleoMouseout(key)}>
            <div className={styles.scm_cols_top}>
                <img alt="" src={item.displayImage ? item.displayImage[0] : ''} style={{ width: '205px', height: '204px' }}></img>
            </div>
            <div id={`SCM_` + key} className={defKey === key ? styles.scm_button : styles.scm_button_display} onClick={downFile.bind(this, item)}>
                {
                    item.mapImage ? <div style={{ width: '102px' }} className={styles.scm_button_def} >
                        <img alt="" src={'/assets/ic_download_small@2x.png'} style={{ marginRight: '5px' }}></img>
                        <span>下载</span>
                    </div> : ""
                }
                {
                    !item.isApply ? (
                        <div style={item.mapImage ? { width: '102px' } : { width: '204px', display: 'flex', alignItems: "center", justifyContent: 'center' }} className={styles.scm_button_active} onClick={handleApply.bind(this, item)}>
                            <img alt="" src={'/assets/ic_apply_small@2x.png'} style={{ marginRight: '5px' }}></img>
                            <span>申请</span>
                        </div>
                    ) : (
                        <div style={{background: 'rgba(0, 0, 0, 0.85)'}}>
                            <span>已申请</span>
                        </div>
                    )
                }
            </div>
            <div className={styles.scm_cols_bottom}>
                {item.commodityName}
            </div>
        </div>
    );
}

class PgcScm extends Component {

    static SCM_ROWS_NUM = 5;

    state = {
        defValue: -1,
        defKey: -1, // 当前移入的key,
        pageIndex: 1,
        commodityCategoryCode: '',
        collectKey: '',
        pageResultVo: null,
        commodityCategoryVos: null
    }

    handleDefValue = (uid, items) => {
        const { pageIndex } = this.state;
        this.query(pageIndex, items.uid);
        this.setState({ defValue: uid, commodityCategoryCode: items.commodityCategoryCode });
    }

    handleMouseover = (key, event) => {
        this.setState({
            defKey: key,
        });
    }

    handleoMouseout = (key, event) => {
        const { defKey } = this.state;
        if (defKey === key) {
            this.setState({
                defKey: -1,
            });
        };
    }

    seeMaterialInfo = (ids, event) => {
        const params = tools.urlParamHash();
        const newBlank = `${window.location.origin}/material/details?id=${ids.ugcId}&type=${this.props.type}`;
        window.open(newBlank, '_blank');
    }

    setCollectVis = (collectKey) => {
        this.setState({ collectKey });
    }

    _colsArrays = (prams) => {
        const { defKey, collectKey, commodityCategoryCode, pageIndex } = this.state;
        const { shopId, showApplyUgc, pageChange } = this.props;
        return createScmCols({
            index: prams.index,
            key: prams.key,
            defKey,
            item: prams.item,
            collectKey,
            pageIndex,
            shopId,
            commodityCategoryCode,
            query: this.query,
            handleMouseover: this.handleMouseover,
            handleoMouseout: this.handleoMouseout,
            seeMaterialInfo: this.seeMaterialInfo,
            setCollectVis: this.setCollectVis,
            showApplyUgc: showApplyUgc,
            pageChange
        });
    }

    _rowsArrays = (parms, key) => {
        return (
            <div key={'Rows_' + key} className={styles.scm_list}>
                <div className={styles.scm_list_context}>
                    {parms}
                </div>
            </div>
        );
    }

    _curRows = () => {
        const { pageResultVo } = this.props;
        let rowsArrays = [];
        if (pageResultVo === null || pageResultVo.length === 0 || pageResultVo['items'] === null) {
            return;
        }
        const total = pageResultVo['items'].length; // 总数
        const surplus = total % PgcScm.SCM_ROWS_NUM; // 取余
        const rows = Math.floor(total / PgcScm.SCM_ROWS_NUM) + 1; // 行数
        let curNum = 0;
        for (let i = 1; i <= rows; i++) {
            let dataIndex = i * PgcScm.SCM_ROWS_NUM;
            let colsArrays = [];
            if (dataIndex <= total) {
                for (let m = 0; m < PgcScm.SCM_ROWS_NUM; m++) {
                    curNum = (i === 1 ? m : (m === 0 ? (curNum + m + 1) : (1 + curNum)));
                    colsArrays.push(this._colsArrays({ index: m, key: curNum, item: pageResultVo['items'][curNum] }));
                }
                rowsArrays.push(this._rowsArrays(colsArrays, i));
            } else {
                for (let x = 0; x < surplus; x++) {
                    if (x === 0 && curNum === 0) {
                        curNum = 0;
                    } else {
                        curNum = curNum + 1;
                    }
                    colsArrays.push(this._colsArrays({ index: x, key: curNum, item: pageResultVo['items'][curNum] }));
                }
                rowsArrays.push(this._rowsArrays(colsArrays, rows));
            }
        }
        return rowsArrays;
    }

    handlePageSize = (page, pageSize) => {
        this.props.pageChange(page, pageSize);
    }

    render () {
        const { pageResultVo } = this.props;
        const _rowsArrays = this._curRows();

        return (
            <div className={styles.scm_main}>
                {
                    pageResultVo && pageResultVo.length !== 0 ? _rowsArrays : <div className={styles.scm_zwsj}>
                        <Result />
                    </div>
                }
                {
                    pageResultVo && pageResultVo.length !== 0 ? <div className={styles.scm_pagination}>
                        <Pagination
                            size="small"
                            showSizeChanger={false}
                            total={pageResultVo && pageResultVo.length !== 0 ? pageResultVo.totalCount : 0}
                            pageSize={pageResultVo && pageResultVo.length !== 0 ? pageResultVo.pageSize : 50}
                            current={pageResultVo && pageResultVo.length !== 0 ? pageResultVo.pageIndex : 0}
                            onChange={this.handlePageSize.bind(this)}
                        />
                    </div> : ''
                }
            </div>
        );
    }
}

export default PgcScm;