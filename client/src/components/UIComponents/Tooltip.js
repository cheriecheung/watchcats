import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as AntTooltip } from 'antd';

function Tooltip({ content }) {
  return (
    <AntTooltip title={content}>
      <i className="fas fa-info-circle ml-1" />
    </AntTooltip>
  )
}

export default Tooltip;

Tooltip.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired
};

Tooltip.defaultProps = {
  content: undefined
};