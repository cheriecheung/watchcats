import React from 'react';
import styled from 'styled-components';


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
  return (
    <>
      <p>{sitterInfo.experience}</p>

      Summary:
      <br />
      <br />

      <Container>
        {sitterInfo.hasCat &&
          <LabelBox>
            <i className="fas fa-cat sitter-profile" />
            <span>Owns / owned a cat</span>
          </LabelBox>
        }
        {sitterInfo.hasVolunteered &&
          <LabelBox>
            <i className="fas fa-hand-holding-heart sitter-profile" />
            <span>Has done volunteer work</span>
          </LabelBox>
        }
        {sitterInfo.hasMedicationSkills &&
          <LabelBox>
            <i className="fas fa-pills sitter-profile" />
            <span>Able to administer medication</span>
          </LabelBox>
        }
        {sitterInfo.hasInjectionSkills &&
          <LabelBox>
            <i className="fas fa-syringe sitter-profile" />
            <span>Able to do injections</span>
          </LabelBox>
        }
        {sitterInfo.hasCertification &&
          <LabelBox>
            <i className="fas fa-award sitter-profile" />
            <span>Has pet sitting certification</span>
          </LabelBox>
        }
        {sitterInfo.hasGroomingSkills &&
          <LabelBox>
            <i className="fas fa-cut sitter-profile" />
            <span>Has pet grooming skills</span>
          </LabelBox>
        }
      </Container>
    </>
  );
}

export default Experience;
