import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import HomeLayout from '../../layouts/HomeLayout';
import { connect } from 'dva';
import { matchUrlToBreadCrumb, calCurrentMenu } from '../../utils/common.js';
import _ from 'lodash';

export default connect(({ base }) => ({ base }))((props) => {
  const { dispatch } = props;
  const [caseList, setCaseList] = useState([]);

  // todo...
  useEffect(() => {
    dispatch({
      type: 'base/queryCaseListForWeb',
      payload: {},
    }).then((res) => {
      if (res && res.code === 200) {
        setCaseList(_.get(res, 'data.list'));
      }
    });
  });

  return (
    <HomeLayout currentMenuValue={calCurrentMenu(props.match)} originalMenuList={props.routes}>
      <BreadCrumb breadCrumbList={matchUrlToBreadCrumb(props)} />
      <p>Home Page</p>

      <div>
        <p>Case list</p>
        {_.map(
          caseList,
          (value, name) =>
            name < 6 && (
              <textarea
                key={name}
                defaultValue={JSON.stringify(value, null, 2)}
                rows={10}
              ></textarea>
            ),
        )}
      </div>
    </HomeLayout>
  );
});
