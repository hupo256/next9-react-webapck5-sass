import React, { Component, useState } from 'react';
import { Pagination, message } from 'antd';
// import { connect, history } from 'umi';
// import { getStorageItem } from '@/utils/storage';
// import Collect from '@/components/Collect';
// import Result from '@/components/Result';
// import { downFileImg } from '@/utils/upload';
import styles from './components.module.scss';

function createScmCols ({ key, defKey, item, index, collectKey,
    commodityCategoryCode, handleMouseover, handleoMouseout,
    seeMaterialInfo, setCollectVis, pageIndex, shopId, query }) {

    const handleSesMaterialInfo = function (parms, event) {
        event.stopPropagation();
        const tokenInspire = getStorageItem('token_inspire');
        if (!tokenInspire) {
            // dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
            return;
        }
        seeMaterialInfo(parms);
    };

    const handleCollect = function (parms, event) {
        event.stopPropagation();
        const tokenInspire = getStorageItem('token_inspire');
        if (!tokenInspire) {
            // dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
        } else {
            setCollectVis(parms.commodityCode);
        }
    };

    const handleApply = function (parms, event) {
        event.stopPropagation();
        const tokenInspire = getStorageItem('token_inspire');
        if (!tokenInspire) {
            // dispatch({ type: 'login/save', payload: { isloginModalShow: true } });
            return;
        }
        const userinfo = JSON.parse(getStorageItem('userInfo'));
        const data = Object.assign({}, {
            applySource: 'TSC042',
            customerName: userinfo.mobile || userinfo.nickName,
            phoneNumber: userinfo.mobile,
            shopId,
            ugcCommodityId: parms.pgcId
        });
        // dispatch({ type: 'scm/ugcApply', payload: data });
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

    const cancelCollection = (parms, event) => {
        event.stopPropagation();
        // dispatch({ type: 'userinfo/cancelFavorite', payload: { pgcCommodityId: parms.pgcId } }).then(result => {
        //     if (result.code === 200) {
        //         query(pageIndex, commodityCategoryCode);
        //         message.success('取消收藏成功');
        //     } else {
        //         message.error(result.message);
        //     }
        // });
    };

    const queryCollectSearch = () => {
        query(pageIndex, commodityCategoryCode);
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
                {/* <img alt="" src={item.displayImage ? item.displayImage[0] : require('@/assets/sp_def.png')} style={{ width: '205px', height: '204px' }}></img> */}
            </div>
            {
                item.isFavorited ? <div className={defKey === key ? styles.scm_heart_red : styles.scm_sc_re_display} onClick={cancelCollection.bind(this, item)}>
                    {/* <img alt="" src={require('@/assets/ic_collect_sel.png')}></img> */}
                </div> : <React.Fragment>
                    <div className={styles.scm_heart}>
                        <div className={defKey === key ? styles.scm_sc : styles.scm_sc_display} onClick={handleCollect.bind(this, item)}>
                            {/* <img alt="" src={require('@/assets/ic_collect.png')}></img> */}
                        </div>
                        {
                            item.commodityCode === collectKey ? <div onClick={handleCollectClick.bind(this)} onMouseOver={handleCollectMouseover.bind(this, key, collectKey)} onMouseOut={handleoCollectMouseout.bind(this, collectKey)} className={styles.scm_collect}>
                                <Collect
                                    shopId={shopId}
                                    type={'ugc'}
                                    querySearch={queryCollectSearch}
                                    commodityType={item.commodityType}
                                    data={item}
                                    setCollectVis={setCollectVis}
                                />
                            </div> : ""
                        }
                    </div>
                </React.Fragment>
            }
            <div id={`SCM_` + key} className={defKey === key ? styles.scm_button : styles.scm_button_display} onClick={downFile.bind(this, item)}>
                {
                    item.mapImage ? <div style={{ width: '102px' }} className={styles.scm_button_def} >
                        {/* <img alt="" src={require('@/assets/ic_dw.png')} style={{ marginRight: '5px' }}></img> */}
                        <span>下载</span>
                    </div> : ""
                }
                <div style={item.mapImage ? { width: '102px' } : { width: '204px', display: 'flex', alignItems: "center", justifyContent: 'center' }} className={styles.scm_button_active} onClick={handleApply.bind(this, item)}>
                    {/* <img alt="" src={require('@/assets/ic_.png')} style={{ marginRight: '5px' }}></img> */}
                    <span>申请</span>
                </div>
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

    query = (pageIndex, commodityCategoryCode) => {
        const { keyword, keywordType } = this.props;
        // this.props.dispatch({
        //     type: 'scm/searchScm',
        //     payload: {
        //         pageIndex,
        //         pageSize: 50,
        //         commodityCategoryCode,
        //         keyword,
        //         keywordType
        //     }
        // });
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
        const newBlank = `${window.location.origin}/renovation/common/materialInfo/${ids.pgcId}/ugc`;
        window.open(newBlank, '_blank');
    }

    setCollectVis = (collectKey) => {
        this.setState({ collectKey });
    }

    _colsArrays = (prams) => {
        const { defKey, collectKey, commodityCategoryCode, pageIndex } = this.state;
        const { shopId } = this.props;
        return createScmCols({
            index: prams.index,
            key: prams.key,
            defKey,
            item: prams.item,
            collectKey,
            // dispatch,
            pageIndex,
            shopId,
            commodityCategoryCode,
            query: this.query,
            handleMouseover: this.handleMouseover,
            handleoMouseout: this.handleoMouseout,
            seeMaterialInfo: this.seeMaterialInfo,
            setCollectVis: this.setCollectVis
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
        const { pageResultVo } = this.state;
        let rowsArrays = [];
        if (pageResultVo === null || pageResultVo.length === 0) {
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
        const { commodityCategoryCode } = this.state;
        this.query(page, commodityCategoryCode);
    }

    render () {
        const { pageResultVo } = this.props;
        const _rowsArrays = this._curRows();

        return (
            <div className={styles.scm_main}>
                {
                    pageResultVo && pageResultVo.length !== 0 ? _rowsArrays : <div className={styles.scm_zwsj}>
                        {/* <Result /> */}
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