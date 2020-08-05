import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

function Profile() {
  return (
    <div style={{ margin: '20px 5%' }}>
      <div style={{ textAlign: 'left' }}>
        <p>&#x3c; Back</p>
        <h5>Title right here</h5>

        <ContentContainer>
          <div style={{ flexBasis: '60%', marginBottom: 100 }}>
            <ImageSlider />
            <h5>Reviews(10)</h5>

            <Carousel className="review-carousel" interval={null}>
              <Carousel.Item>
                <Review />
                <Review />
                <Review />
              </Carousel.Item>
              <Carousel.Item>
                <Review />
                <Review />
                <Review />
              </Carousel.Item>
              <Carousel.Item>
                <Review />
                <Review />
                <Review />
              </Carousel.Item>
            </Carousel>

            <About />
          </div>

          <div
            style={{
              border: '1px solid #d3d3d3',
              borderRadius: 5,
              flexBasis: '35%',
              maxHeight: 400,
              position: 'sticky',
              top: 20,
              padding: 20,
            }}
          >
            <h4>Member's name</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              dicta nisi accusantium dolorem eum enim fugiat delectus
              repudiandae amet aut ipsum voluptatum natus minus maxime?
            </p>
            <span>Location</span>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}

export default Profile;

function ImageSlider() {
  return (
    <Carousel interval={null}>
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
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function Review() {
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
              borderRadius: '50%',
              background: 'pink',
            }}
          ></div>
        </div>

        <div style={{ flexBasis: '85%' }}>
          <span>Name of user</span>
          <br />
          <span>Location - Time</span>
          <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            at, eaque necessitatibus unde, vel sequi fugiat ex temporibus non
            laboriosam labore culpa itaque incidunt repudiandae nisi dolor fuga
            numquam ad earum dolorem! Odit quo doloremque aliquam delectus!
            Officiis, hic consequuntur!
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

function About() {
  return (
    <>
      <div>
        <h5>About</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          commodi voluptatum recusandae sunt et minima enim aliquid incidunt
          ipsa maiores, cupiditate tenetur itaque eos quae eveniet ullam ipsam
          ad iste sed voluptatibus nulla hic temporibus? Corrupti ipsam adipisci
          quos accusamus!
        </p>
      </div>

      <div>
        <h5>Experience</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          commodi voluptatum recusandae sunt et minima enim aliquid incidunt
          ipsa maiores, cupiditate tenetur itaque eos quae eveniet ullam ipsam
          ad iste sed voluptatibus nulla hic temporibus? Corrupti ipsam adipisci
          quos accusamus!
        </p>
      </div>

      <div>
        <h5>Availability</h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          commodi voluptatum recusandae sunt et minima enim aliquid incidunt
          ipsa maiores, cupiditate tenetur itaque eos quae eveniet ullam ipsam
          ad iste sed voluptatibus nulla hic temporibus? Corrupti ipsam adipisci
          quos accusamus!
        </p>
      </div>
    </>
  );
}
