import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ImageSlider() {
  return (
    <Carousel interval={null} className="m-0">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/e0/3b/e0/e03be0d9ea0f716eb57f9dfe3e27c4c6.jpg"
          height="400"
          alt="First slide"
          style={{ objectFit: 'contain' }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="400"
          src="https://cdn.sortra.com/wp-content/uploads/2016/11/pumpkin-the-cat000.jpg"
          alt="Third slide"
          style={{ objectFit: 'contain' }}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="400"
          src="https://image.freepik.com/free-photo/cute-golden-british-shorthair-cat-floor_43518-12.jpg"
          alt="Third slide"
          style={{ objectFit: 'contain' }}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;
