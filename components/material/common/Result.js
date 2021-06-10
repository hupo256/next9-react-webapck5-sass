import React, { Component } from 'react';

import styles from './index.module.scss';

export default () => {
    return(
        <div className={styles.result_main}>
            {/* <img alt="" src={require('@/assets/ic_nodate.png')}></img> */}
            <span>未查询到数据</span>
        </div>
    );
};