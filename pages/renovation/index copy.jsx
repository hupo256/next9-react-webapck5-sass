import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';
import BasicLayout from '@components/HomePageLayout'
import BreadBar from '@components/breadBar'
import Types from './types';
import UgcScm from './ugcScm';
import PgcScm from './pgcScm';

import styles from './index.module.scss'

const Option = Select.Option;

export default function Site(props) {
	const [state, setState] = useState({
		maxLiKey: -1,
		minLiKey: -1,
		keyword: "",
		keywordType: 1,
		commodityCategoryCode: '',
		subCommodityCategoryCode: '',
		pageIndex: 1,
		pageSize: 30,
	});
	const [searchVisible, setSearchVisible] = useState(null);
	const [commodityCategoryVos, setCommodityCategoryVos] = useState(null);
	const [pageResultVo, setPageResultVo] = useState(null);
	const [keywordType, setKeywordType] = useState(null);
	const [materialMap, setMaterialMap] = useState(null);
	const curRef = React.createRef();

	

	const handleMaxLi = (key, item) => {
		const { keywordType, keyword, pageIndex, pageSize } = state;
		const data = { pageIndex, pageSize, keywordType, commodityCategoryCode: item.categoryCode };
		if (keywordType === 1) {
			Object.assign(data, { keyword });
			// this.props.dispatch({ type: 'scm/searchScm', payload: data });
		} else {
			query();
		}
		setState({
			maxLiKey: key,
			commodityCategoryCode: key === -1 ? '' : item.categoryCode,
			subCommodityCategoryCode: '',
			minLiKey: -1
		});
		// props.dispatch({ type: 'scm/save', payload: { keywordType } }); // 重新加载材料列表页
	}

	const handleMinLi = (key, item) => {
		const { keywordType, keyword, commodityCategoryCode, pageIndex, pageSize } = state;
		if (keywordType === 1) {
			// props.dispatch({
			// 	type: 'scm/searchScm',
			// 	payload: {
			// 		pageIndex: pageIndex,
			// 		pageSize: pageSize,
			// 		keywordType,
			// 		keyword,
			// 		commodityCategoryCode,
			// 		subCommodityCategoryCode: item.categoryCode
			// 	}
			// });
		} else {
			query();
		}
		setState({
			minLiKey: key,
			subCommodityCategoryCode: key === -1 ? '' : item.categoryCode,
		});
		// props.dispatch({ type: 'scm/save', payload: { keywordType } }); // 重新加载材料列表页
	}

	const handleChange = (value) => {
		setState({
			maxLiKey: -1,
			minLiKey: -1,
			keywordType: parseInt(value),
			keyword: '',
			pageIndex: 1,
			pageSize: 30
		});
		// this.props.dispatch({ type: 'scm/save', payload: { keywordType: -1 } }); // 重新加载材料列表页
	}

	const handleKeyword = (e) => {
		setState({
			keyword: e.target.value
		});
	}

	const handleQuery = () => {
		const { keyword, keywordType } = state;
		if (keywordType === 1) {
			setState({
				pageIndex: 1,
				pageSize: 30,
				maxLiKey: -1,
				minLiKey: -1,
			}, () => {
				// this.props.dispatch({
				// 	type: 'scm/searchScm',
				// 	payload: {
				// 		pageIndex: 1,
				// 		pageSize: 30,
				// 		keywordType,
				// 		keyword
				// 	}
				// });
			});
		} else {
			setState({
				pageIndex: 1,
				pageSize: 30
			}, () => {
				query();
			});
		}
	}

	const query = () => {
		const { keywordType, shopId, pageIndex, pageSize } = state;
		// this.props.dispatch({
		// 	type: 'scm/searchScm',
		// 	payload: {
		// 		businessCode: shopId,
		// 		pageIndex,
		// 		pageSize,
		// 		keywordType
		// 	}
		// });
	}

	const handleShopId = (shopId) => {
		setState({ shopId });
	}

	return (
		<BasicLayout headConfigx={{ title: '找设计师' }} pushType="designer">
			<div className="grayBg">
				<div className="conBox">
					<BreadBar />
					<div className={styles.scmpage_body} style={{display: 'block'}}>
						<div className={styles.scmpage_context}>
							<div className={styles.scmpage_query} style={searchVisible ? {} : { display: 'none' }}>
								<div className={styles.scmpage_select}>
									<Select onChange={handleChange} value={keywordType + ''} bordered={false} style={{ height: '46px', width: '80px' }}>
										<Option value='1'>材料</Option>
										<Option value='2'>店商</Option>
										<Option value='3'>品牌</Option>
									</Select>
								</div>
								<div className={styles.scmpage_search}>
									{
										keywordType === 1 ? <InputSearch
											keyword={keyword}
											handleKeyword={handleKeyword}
										/> : ""
									}
									{
										keywordType === 2 || keywordType === 3 ? <SelectSearch
											handleShopId={handleShopId}
											dispatch={dispatch}
											keywordType={keywordType}
										/> : ""
									}
								</div>
								<div ref={curRef} className={styles.scmpage_img} onClick={handleQuery}>
									{/* <img alt="" src={require('@/assets/ic_search.png')}></img> */}
								</div>
							</div>
							<div className={styles.scmpage_type}>
								<Types
									commodityCategoryVos={state.commodityCategoryVos}
									commodityCategoryCode={state.commodityCategoryCode}
									maxLiKey={state.maxLiKey}
									minLiKey={state.minLiKey}
									handleMaxLi={handleMaxLi}
									handleMinLi={handleMinLi}
								/>
							</div>
							<div className={styles.scmpage_list}>
								{
									keywordType === 1 ? <PgcScm
										keywordType={state.keywordType}
										keyword={state.keyword}
										commodityCategoryCode={state.commodityCategoryCode}
										subCommodityCategoryCode={state.subCommodityCategoryCode}
									/> : <UgcScm
										shopId={state.shopId}
										keywordType={state.keywordType}
										commodityCategoryCode={state.commodityCategoryCode}
										subCommodityCategoryCode={state.subCommodityCategoryCode}
									/>
								}
							</div>
						</div>
					</div >
				</div>
			</div>
		</BasicLayout>
	)
}