import React from 'react';
import { Breadcrumb } from 'antd';

export default ({ breadCrumbList }) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadCrumbList.map((item, index) =>
        item.src ? (
          <Breadcrumb.Item key={`custom-breadcrumb-${index}`}>
            <a href={item.src}>{item.displayName}</a>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={`custom-breadcrumb-${index}`}>{item.displayName}</Breadcrumb.Item>
        ),
      )}
    </Breadcrumb>
  );
};
