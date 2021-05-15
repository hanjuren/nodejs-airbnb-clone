import React, { useEffect, useState } from 'react';
import HostGrid from '../hosts/HostGrid';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';

// 스타일 컴포넌트
const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  width: 100%;

  img{
    object-fit: contain;
    height: 100px;
    margin-left: 80px;
  }

  div{
    display: flex;
    flex: 1;
    align-items: center;
    max-width: 350px;
    padding: 10px;
    height: 30px;
    border: 1px solid lightgray;
    border-radius: 999px;
  }

  form {
    width: 400px;
    margin-left: 100px;

    button {
      border: none;
      background-color: white;
      outline: none;
      cursor: pointer;
    }
    input {
      border: none;
      padding: 10px;
      outline-width: 0;
      width: 100%;
      color: black;
    }
  }
`;

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const searchCity = (e) => {
    setSearchValue(e.target.value);
  };
  const search = () => {
    setSearchValue('');
  }
  return (
      <Headers>
        <a href="/">
          <img src="https://i.pinimg.com/564x/04/57/14/0457144332ce38550077355621165d24.jpg" alt=""/>
        </a>
        <form>
          <div>
              <input type="text" placeholder="여행지 검색을 통해 빠른 예약을 해보세요" value={searchValue} onChange={searchCity}/>
              <Link onClick={search} to={`/hosts?city=${searchValue}`}>
                <button ><FaSearch/></button>
              </Link>
          </div>
      
        </form>
      </Headers>
  );
};

export default Header;