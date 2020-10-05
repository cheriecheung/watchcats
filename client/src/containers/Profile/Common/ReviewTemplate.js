import React from 'react';

function ReviewTemplate({ name }) {
  return (
    <div style={{ margin: '20px 0' }}>
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
    </div>
  );
}

export default ReviewTemplate;
