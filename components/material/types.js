import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './index.module.scss';

class InputSearch extends Component {
    state = {
        show: true
    }

    handleMaxLi = (key, type) => {
        this.props.handleMaxLi(key, type);
    };

    handleMinLi = (key, type) => {
        this.props.handleMinLi(key, type);
    };

    componentWillReceiveProps(nextProps) {
        let show = true;
        const { shopSettingVo, commodityType } = nextProps;
        if(!shopSettingVo)
            return;
        if(commodityType === '1'){
            show = shopSettingVo.materialGrading == 1 ? false : true;
        }else{
            show = shopSettingVo.productGrading == 1 ? false : true;
        }

        this.setState({
            ...this.state,
            show
        })
    }

    render () {
        const { commodityCategoryVos, commodityCategoryCode, maxLiKey, minLiKey } = this.props;

        return (
            <>
                <div className={styles.scmpage_max}>
                    <div className={styles.scmpage_dl}>一级分类</div>
                    <ul className={styles.scmpage_ul} style={{ width: '1028px' }}>
                        <li className={maxLiKey === -1 ? styles.scmpage_ul_def : ""} onClick={this.handleMaxLi.bind(this, -1, '')}>全部</li>
                        {
                            commodityCategoryVos?.map((item, index) => {
                                return (
                                    <li key={item.categoryCode} className={maxLiKey === index ? styles.scmpage_ul_def : ""} onClick={this.handleMaxLi.bind(this, index, item)}>{item.categoryName}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <Divider dashed={true} />
                <div className={styles.scmpage_min} style={{display: this.state.show ? 'flex' : 'none'}}>
                    <div className={styles.scmpage_xl_dl}>二级分类</div>
                    <ul className={styles.scmpage_xl_ul} style={{ width: '1028px' }}>
                        <li className={minLiKey === -1 ? styles.scmpage_ul_xl_def : ""} onClick={this.handleMinLi.bind(this, -1, '')}>全部</li>
                        {
                            commodityCategoryVos?.map(item => {
                                return item.subCommodityCategoryVos && item.subCommodityCategoryVos.map((chiItem, indexs) => {
                                    return commodityCategoryCode === '' ? (
                                        <li key={chiItem.categoryCode} className={minLiKey === chiItem.uid ? styles.scmpage_ul_xl_def : ""} onClick={this.handleMinLi.bind(this, chiItem.uid, chiItem)}>{chiItem.categoryName}</li>
                                    ) : (
                                        commodityCategoryCode === item.categoryCode ? (
                                            <li key={chiItem.categoryCode} className={minLiKey === chiItem.uid ? styles.scmpage_ul_xl_def : ""} onClick={this.handleMinLi.bind(this, chiItem.uid, chiItem)}>{chiItem.categoryName}</li>
                                        ) : ""
                                    );
                                });
                            })
                        }
                    </ul>
                </div>
            </>
        );
    }
}

export default InputSearch;
