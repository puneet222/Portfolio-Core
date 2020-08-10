import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Loader = () => {

    const loaderStyle = {
        fontSize: 24,
        color: '#FFFFFF'
    }

    const antIcon = <LoadingOutlined style={loaderStyle} spin />;
    return (
        <Spin indicator={antIcon} />
    )
}
