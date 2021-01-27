import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor } from '../../style/theme';
import { Typography } from 'antd';
const { Paragraph } = Typography;

const ParagraphComponent = styled(Paragraph)`
  & > a {
    color: ${themeColor.peach};
  }

  & > a:hover {
    color: ${themeColor.peach};
  }
`

function EllipsisParagraph({ children, rows }) {
  return (
    <ParagraphComponent
      ellipsis={{
        rows,
        expandable: true,
        symbol: 'Read more'
      }}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </ParagraphComponent>
  )
}

export default EllipsisParagraph

EllipsisParagraph.propTypes = {
  children: PropTypes.node,
  rows: PropTypes.number
};

EllipsisParagraph.defaultProps = {
  children: undefined,
  rows: 2
};