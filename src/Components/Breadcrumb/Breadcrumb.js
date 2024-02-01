import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';

function Breadcrumb(props) {
  const { items } = props;
  
  return (
    <div className='breadcrumb'>
      <AntdBreadcrumb>
        {items.map((item, index) => (
          <AntdBreadcrumb.Item key={index}>{item.title}</AntdBreadcrumb.Item>
        ))}
      </AntdBreadcrumb>
    </div>
  );
}

export default Breadcrumb;
