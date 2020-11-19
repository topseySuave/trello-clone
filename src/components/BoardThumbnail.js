import React from "react";
import styled from "styled-components";
import Bg from '../assets/bg.jpg';

export const BoardStyle = styled.div`
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  color: #172b4d;
  display: table-cell;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  width: 160px;
  border-radius: 5px;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
`;

const Title = styled.h4`
  color: white;
  text-transform: capitalize;
`;

const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <BoardStyle>
      <Title>{title}</Title>
    </BoardStyle>
  );
};

export default BoardThumbnail;
