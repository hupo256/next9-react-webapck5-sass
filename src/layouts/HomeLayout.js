import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';

const { Header, Content, Footer } = Layout;

//todo... remove it
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVMjEwNDEzMDAwMDAxIiwiY29tcGFueUNvZGUiOiJDMjAxMjEwMDAxMDAyIiwidWlkIjoiODc5YzQyMTg3OGEyNGY2Y2FlYWFmNGE1Zjc2OWRkYWYiLCJ6aWQiOjQ5MSwidXNlckNvZGUiOiJVMjEwNDEzMDAwMDAxIiwiaWF0IjoxNjE4MzkyNTc1LCJleHAiOjU1OTg3MjE2MTgzOTI1NzV9.j2XyZZbJijSqrtMss77LoKBklfPUgDRqwXHFQnMpmPNckCOU6Eusivw0wEwIK5FyoNWplDI9l2hzADePDQLibw';

export default connect(({ base }) => base)(
  ({ children, route, currentMenuValue, originalMenuList, dispatch }) => {
    const [footerInfo, setFooterInfo] = useState(null);

    const selectedMenuIndex =
      '' + originalMenuList.findIndex((item, index) => item.path === currentMenuValue && index);

    // todo...
    useEffect(() => {
      dispatch({
        type: 'base/getCompanyInfoOnFooter',
        payload: { token },
      }).then((res) => {
        if (res && res.code === 200) {
          setFooterInfo(res.data);
        }
      });
    });

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={[selectedMenuIndex]}>
            {originalMenuList.map(
              (menu, index) =>
                menu.hide || (
                  <Menu.Item key={index}>
                    <a href={menu.path}>{menu.name}</a>
                  </Menu.Item>
                ),
            )}
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>{children}</Content>

        <Footer style={{ textAlign: 'center' }}>
          {footerInfo &&
            _.map(footerInfo, (value, name) => {
              return (
                <p key={name}>
                  {name}:{value}
                </p>
              );
            })}
        </Footer>
      </Layout>
    );
  },
);
