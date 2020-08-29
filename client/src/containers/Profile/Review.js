import React from 'react';

function Review({ name }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flexBasis: '10%' }}>
          <div
            style={{
              width: 55,
              height: 55,
              borderRadius: 10,
              background: 'pink',
            }}
          ></div>
        </div>

        <div style={{ flexBasis: '85%' }}>
          <span>{name}</span>
          <br />
          <span>Location - Time</span>
          <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates at, eaque
            necessitatibus unde, vel sequi fugiat ex temporibus non laboriosam labore culpa itaque
            incidunt repudiandae nisi dolor fuga numquam ad earum dolorem! Odit quo doloremque
            aliquam delectus! Officiis, hic consequuntur!
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #d3d3d3',
          marginTop: 15,
          marginBottom: 15,
        }}
      />
    </>
  );
}

export default Review;
