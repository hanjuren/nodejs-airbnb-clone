import React from 'react';
import styled from 'styled-components';

const DIV = styled.div`
  width: 400px;
  height: 100%;
  border: 1px solid black;
`;
const IMG = styled.img`
  width: 100%;
  height: 100%;
  
`;

const Image = ({src}) => {
  return (
    
      <IMG src={src}/>
    
  );
};

export default Image;