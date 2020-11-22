import React from 'react';
import styled from 'styled-components';
import { EllipsisParagraph } from '../../../components/UIComponents'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
`

const LabelBox = styled.div`
  display: flex;
  flex: 0 49%;
  margin-bottom: 15px;
`

function Experience({ sitterInfo }) {
  const { experience, hasCat, hasVolunteered, hasMedicationSkills, hasInjectionSkills, hasCertification, hasGroomingSkills } = sitterInfo;

  const skillSet = [
    {
      value: hasCat,
      icon: <i className="fas fa-cat sitter-profile" />,
      title: 'Owns / owned a cat'
    },
    {
      value: hasVolunteered,
      icon: <i className="fas fa-hand-holding-heart sitter-profile" />,
      title: 'Has done volunteer work'
    },
    {
      value: hasMedicationSkills,
      icon: <i className="fas fa-pills sitter-profile" />,
      title: 'Able to administer medication'
    },
    {
      value: hasInjectionSkills,
      icon: <i className="fas fa-syringe sitter-profile" />,
      title: 'Able to do injections'
    },
    {
      value: hasCertification,
      icon: <i className="fas fa-award sitter-profile" />,
      title: 'Has pet sitting certification'
    },
    {
      value: hasGroomingSkills,
      icon: <i className="fas fa-cut sitter-profile" />,
      title: 'Has pet grooming skills'
    },
  ]

  const hasSkills = hasCat || hasVolunteered || hasMedicationSkills || hasInjectionSkills || hasCertification || hasGroomingSkills

  return (
    <>
      <EllipsisParagraph>{experience}</EllipsisParagraph>

      {hasSkills &&
        <>
          <span>Summary:</span>
          <br />
          <br />

          <Container>
            {skillSet.map(({ value, icon, title }) => {
              return (
                value &&
                <LabelBox>
                  {icon}
                  <span>{title}</span>
                </LabelBox>
              )
            })}
          </Container>
        </>
      }
    </>
  );
}

export default Experience;
