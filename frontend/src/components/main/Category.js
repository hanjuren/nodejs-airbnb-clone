import React, {useState} from 'react';
import styled from 'styled-components';

const SearchCategory = styled.div`
  width: 90%;
  height: 450px;

  img {
    width: 100%;
    height: 80%;
    border-radius: 10px;
  }

  p {
    font-weight: 700;
    font-size: 18px;
  }
`;


const Category = (props) => {
  const [cityName, setCityName] = useState(`${props.id}`);
  const [src, setSrc] = useState(`${props.img}`);
  const [info, setText] = useState(`${props.text}`);

  return (
    <>
    <SearchCategory id={cityName}>
      <img src={src} />
      <p>{info}</p>
    </SearchCategory>
    </>
  );
};

export default Category;