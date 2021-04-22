import React, { useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import HomeLayout from '../../layouts/HomeLayout';
import { matchUrlToBreadCrumb, calCurrentMenu } from '../../utils/common.js';
import { connect } from 'dva';

export default connect(({ base }) => base)((props) => {
  return (
    <HomeLayout currentMenuValue={calCurrentMenu(props.match)} originalMenuList={props.routes}>
      <BreadCrumb breadCrumbList={matchUrlToBreadCrumb(props)} />
      <ul>
        <li>
          <a href="/post/00001">Post No.00001</a>
        </li>
        <li>
          <a href="/post/00002">Post No.00002</a>
        </li>
        <li>
          <a href="/post/00003">Post No.00003</a>
        </li>
      </ul>
    </HomeLayout>
  );
});
