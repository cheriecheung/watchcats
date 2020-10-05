import React from 'react';

function Experience({ sitterInfo }) {
  return (
    <>
      <p>{sitterInfo.experience}</p>

      {sitterInfo.hasCat && <h5>Owns / owned a cat</h5>}
      {sitterInfo.hasVolunteered && <h5>Has done volunteer work</h5>}
      {sitterInfo.hasMedicationSkills && <h5>Able to administer medication</h5>}
      {sitterInfo.hasInjectionSkills && <h5>Able to do injections</h5>}
      {sitterInfo.hasCertification && <h5>Has pet sitting certification</h5>}
      {sitterInfo.hasGroomingSkills && <h5>Has pet grooming skills</h5>}
    </>
  );
}

export default Experience;
