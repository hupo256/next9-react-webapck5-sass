import React, { Component } from 'react';
import styles from './index.module.scss';

class InputSearch extends Component {
    state = {}

    handleMaxLi = (key, type) => {
        this.props.handleMaxLi(key, type);
    };

    handleMinLi = (key, type) => {
        this.props.handleMinLi(key, type);
    };

    render () {
        const { commodityCategoryVos, commodityCategoryCode, maxLiKey, minLiKey } = this.props;

        return (
            <>
                <div className={styles.scmpage_max}>
                    <div className={styles.scmpage_dl}>大类</div>
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
                <div className={styles.scmpage_min}>
                    <div className={styles.scmpage_xl_dl}>小类</div>
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
