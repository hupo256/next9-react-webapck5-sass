import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Tooltip, Button, Space, Typography, Tabs } from 'antd';
import BasicLayout from '@components/HomePageLayout'
import BreadBar from '@components/breadBar'
import materialApi from '@service/materialApi'
import Types from './types';
import UgcScm from './ugcScm';
import styles from './index.module.scss'

export default function Site(props) {
	const [state, setState] = useState({
		maxLiKey: -1,
		minLiKey: -1,
		keyword: "",
		keywordType: 1,
		commodityType: '1',
		commodityCategoryCode: '',
		subCommodityCategoryCode: '',
		pageIndex: 1,
		pageSize: 1,
	});
	const [shopId, setShopId] = useState('');
	const [source] = useState('4');
	const [commodityCategoryVos, setCommodityCategoryVos] = useState(null);
	const [pageResultVo, setPageResultVo] = useState(null);

	useEffect(() => {
		// 初始化获取用户信息
		materialApi.queryShopInfo({shopCode: 'ezhongs-site.ingongdi.com', source}).then(res => {
			setShopId(res.data.uid);
		})
	}, []);

	useEffect(() => {
		query();
	}, [shopId])

	const handleMaxLi = (key, item) => {
		setState({
			...state,
			maxLiKey: key,
			commodityCategoryCode: key === -1 ? '' : item.categoryCode,
			subCommodityCategoryCode: '',
			minLiKey: -1
		});
		
		query();
	}

	const handleMinLi = (key, item) => {
		setState({
			...state,
			minLiKey: key,
			subCommodityCategoryCode: key === -1 ? '' : item.categoryCode,
		});
		
		query();
	}

	// const handleChange = (value) => {
	// 	setState({
	// 		maxLiKey: -1,
	// 		minLiKey: -1,
	// 		keywordType: parseInt(value),
	// 		keyword: '',
	// 		pageIndex: 1,
	// 		pageSize: 30
	// 	});
	// 	query();
	// }

	const handleKeyword = (e) => {
		setState({
			keyword: e.target.value
		});
	}

	// const handleQuery = () => {
	// 	const { keyword, keywordType } = state;
	// 	if (keywordType === 1) {
	// 		setState({
	// 			pageIndex: 1,
	// 			pageSize: 30,
	// 			maxLiKey: -1,
	// 			minLiKey: -1,
	// 		}, () => {
	// 			// this.props.dispatch({
	// 			// 	type: 'scm/searchScm',
	// 			// 	payload: {
	// 			// 		pageIndex: 1,
	// 			// 		pageSize: 30,
	// 			// 		keywordType,
	// 			// 		keyword
	// 			// 	}
	// 			// });
	// 		});
	// 	} else {
	// 		setState({
	// 			pageIndex: 1,
	// 			pageSize: 30
	// 		}, () => {
	// 			query();
	// 		});
	// 	}
	// }

	const query = async () => {
		const { pageIndex, pageSize, commodityCategoryCode, commodityType, subCommodityCategoryCode } = state;
		const queryCommodityCategory = {
			commodityType,
			shopId,
			source: '4'
		}
		const queryMaterial = {
			commodityCategoryCode,
			subCommodityCategoryCode,
			commodityType,
			source,
			shopId,
			pageIndex,
			pageSize,
			shopType: []
		 }
		const commodityCategory = await materialApi.queryCommodityCategory(queryCommodityCategory);
		const commoditys = await materialApi.queryMaterial(queryMaterial);
		
		setCommodityCategoryVos(commodityCategory.data);
		setPageResultVo(commoditys.data);
	}

	useEffect(() => {
	}, [commodityCategoryVos])

	return (
		<BasicLayout headConfigx={{ title: '材料' }} pushType="designer">
			<div className="grayBg">
				<div className="conBox">
					<BreadBar />
					<div className={styles.scmpage_body} style={{display: 'block'}}>
						<div className={styles.scmpage_context}>
							<div className={styles.scmpage_type}>
								<Types
									commodityCategoryVos={commodityCategoryVos}
									commodityCategoryCode={state.commodityCategoryCode}
									maxLiKey={state.maxLiKey}
									minLiKey={state.minLiKey}
									handleMaxLi={handleMaxLi}
									handleMinLi={handleMinLi}
								/>
							</div>
							<div className={styles.scmpage_list}>
								<UgcScm
									pageResultVo={pageResultVo}
									shopId={state.shopId}
									keywordType={state.keywordType}
									commodityCategoryCode={state.commodityCategoryCode}
									subCommodityCategoryCode={state.subCommodityCategoryCode}
								/>
							</div>
						</div>
					</div >
				</div>
			</div>
		</BasicLayout>
	)
}