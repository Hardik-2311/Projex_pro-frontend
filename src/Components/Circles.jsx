import React from "react";
import styled from "styled-components";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CircleIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: 2px solid white
`;

const CircleIcon = () => {
  const color = generateRandomColor();

  return (
    <CircleIconContainer color={color}>
    </CircleIconContainer>
  );
};

export default CircleIcon;
