import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import HomeLayout from '../../layouts/HomeLayout';
import { matchUrlToBreadCrumb, calCurrentMenu } from '../../utils/common.js';

export default (props) => {
  return (
    <HomeLayout currentMenuValue={calCurrentMenu(props.match)} originalMenuList={props.routes}>
      <BreadCrumb breadCrumbList={matchUrlToBreadCrumb(props)} />
      <ul>
        <li>
          <a href="/post/00001">Designer No.00001</a>
        </li>
        <li>
          <a href="/post/00002">Designer No.00002</a>
        </li>
        <li>
          <a href="/post/00003">Designer No.00003</a>
        </li>
      </ul>
    </HomeLayout>
  );
};
