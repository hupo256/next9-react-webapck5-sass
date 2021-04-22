import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import HomeLayout from '../../layouts/HomeLayout';
import { matchUrlToBreadCrumb, calCurrentMenu } from '../../utils/common.js';

export default (props) => {
  return (
    <HomeLayout currentMenuValue={calCurrentMenu(props.match)} originalMenuList={props.routes}>
      <BreadCrumb breadCrumbList={matchUrlToBreadCrumb(props)} />
      <p>Home Page</p>
    </HomeLayout>
  );
};
