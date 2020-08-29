import React from 'react';
import styled from 'styled-components';

const ListItemContainer = styled.div`
  display: flex;
  min-height: 65px;
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  background: pink;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 15px;
`;

const TextContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function List() {
  const allChats = [
    {
      id: 1,
      name: 'Marsha B',
      image: '',
      message: 'Hi id like you to look after my cat',
      isSelected: true,
    },
    { id: 2, name: 'Allie K', image: '', message: 'Hi id like you to look after my cat' },
    { id: 3, name: 'Liana D', image: '', message: 'Hi id like you to look after my cat' },
    { id: 4, name: 'Charlie J', image: '', message: 'Hi id like you to look after my cat' },
    { id: 5, name: 'Amber W', image: '', message: 'Hi id like you to look after my cat' },
    { id: 6, name: 'Marsha B', image: '', message: 'Hi id like you to look after my cat' },
    { id: 7, name: 'Allie K', image: '', message: 'Hi id like you to look after my cat' },
    { id: 8, name: 'Allie K', image: '', message: 'Hi id like you to look after my cat' },
  ];

  return allChats.map((item, index) => {
    const { id, name, image, message, isSelected } = item;

    return (
      <ListItemContainer style={{ background: isSelected ? '#f3f3f3' : '#fff' }}>
        <ImageContainer>
          <img
            src="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="pic"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </ImageContainer>
        <TextContainer>
          <h6>{name}</h6>
          <span>{message}</span>
        </TextContainer>
      </ListItemContainer>
    );
  });
}

export default List;
