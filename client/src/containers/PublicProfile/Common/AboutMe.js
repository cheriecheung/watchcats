import React from 'react';
import { EllipsisParagraph } from '../../../components/UIComponents'

// line height, font size

function AboutMe({ aboutMe }) {
  return <EllipsisParagraph>{aboutMe}</EllipsisParagraph>;
}

export default AboutMe;
