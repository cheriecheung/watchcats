import React from 'react';
import { EllipsisParagraph, WrapLayout } from '../../../components/UIComponents'

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
          <br />
          <span>Summary of skills:</span>
          <br />
          <br />

          {skillSet.map(({ value, icon, title }) => {
            return (
              value &&
              <div style={{ marginBottom: 15 }}>
                {icon}
                <span>{title}</span>
              </div>
            )
          })}
        </>
      }
    </>
  );
}

export default Experience;
