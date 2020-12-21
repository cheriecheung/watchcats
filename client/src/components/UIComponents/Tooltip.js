import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

function Tooltip({ children, content }) {
  return (
    <AntTooltip title={content}>
      {children}
    </AntTooltip>
  )
}

export default Tooltip