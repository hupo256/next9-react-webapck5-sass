import React, { Component, useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import debounce from 'lodash/debounce';
import styles from './index.module.less';

const { Option } = Select;

export function InputSearch ({ keyword, handleKeyword, dispatch }) {
    return (
        <div className={styles.scmpage_search}>
            <Input
                value={keyword}
                onChange={(event) => handleKeyword(event)}
                placeholder='请输入关键词，搜索'
                className={styles.scmpage_input}
                bordered={false}
            />
        </div>
    );
}


export function SelectSearch ({ keywordType, handleShopId, dispatch }) {


    const [data, setData] = useState([]);
    const [value, setValue] = useState(undefined);

    useEffect(() => {

    }, []);

    function handleSearch (value) {
        dispatch({ type: 'scm/autoComplete', payload: { keyword: value, keywordType } }).then(result => {
            if (result.code === 200) {
                setData(result.data);
            }
        });
    }

    const options = data.map(item => {
        if ( item.id !== "") {
            return <Option key={item.id} value={item.id}>{item.name}</Option>;
        }
    });

    function handleChange (params) {
        handleShopId(params);
        setValue(params);
    }

    return (
        <div className={styles.scmpage_search}>
            <Select
                showSearch
                value={value}
                placeholder={'请输入关键词，搜索'}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                bordered={false}
                className={styles.scmpage_select}
            >
                {options}
            </Select>
        </div>
    );
}


export default {
    InputSearch,
    SelectSearch
};