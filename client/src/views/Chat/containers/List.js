import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import { ListItemContainer, TextContainer } from '../components/styledComponents'

const allChats = [];
for (let i = 0; i < 8; i++) {
  allChats.push({
    id: i,
    name: `Person 00${i}`,
    image: '',
    message: 'Hi id like you to look after my cat',
    isSelected: i === 2,
  });
}

function List({ chatList }) {
  return allChats && allChats.map((item, index) => {
    const { id, name, image, message, isSelected } = item;

    return (
      <ListItemContainer style={{ background: isSelected ? '#f3f3f3' : '#fff' }} key={id}>
        <ImageContainer>
          <Image url="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
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
