import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  @media (max-width: 450px) {
    ${({ isResponsive }) => isResponsive && `
      & > div {
        height: 13px; 
      }

      & > div > span {
        font-size: 1.3rem;
      }

      & > span {
        font-size: 0.8rem;
      }
    `}
  }
`

const RateContainer = styled.div`
  display: flex;
  height: 20px;
`

const RateNumber = styled.span`
  margin: -8px 0 0 5px;
  font-size: 1.6rem;

`

const RateType = styled.span`
  margin-top: -10px;
  font-size: 0.9rem;
`

function PriceDisplay({ rate, rateType, isResponsive }) {
  const { t } = useTranslation();

  return (
    <Container isResponsive={isResponsive}>
      <RateContainer>
        <h6>&euro;</h6>
        <RateNumber>
          {rate}
        </RateNumber>
      </RateContainer>
      <RateType>
        {rateType === 'hourly' ? t('find_sitter.per_hour') : t('find_sitter.per_night')}
      </RateType>
    </Container>
  )
}

export default PriceDisplay

PriceDisplay.propTypes = {
  rateType: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  isResponsive: PropTypes.bool,
};

PriceDisplay.defaultProps = {
  isResponsive: undefined,
};