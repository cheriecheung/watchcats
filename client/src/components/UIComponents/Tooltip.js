import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

function Tooltip({ children, content }) {
  return (
    <AntTooltip title={content}>
      {children} <i className="fas fa-info-circle ml-1" />
    </AntTooltip>
  )
}

export default Tooltip