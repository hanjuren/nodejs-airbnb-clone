import React, { useState } from 'react';
import ModalType from '../modal/ModalType';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {FaSearch,FaUserAlt,FaBars} from 'react-icons/fa';

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

  .search-formdiv {
    display: flex;
    flex: 1;
    align-items: center;
    max-width: 350px;
    padding: 10px;
    height: 30px;
    border: 1px solid lightgray;
    border-radius: 999px;
  }

  .search-form {
    width: 400px;
    button {
      border: none;
      background-color: white;
      outline: none;
      cursor: pointer;
      margin-right: 10px;
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

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  margin-right: 20px;
`;

const AuthButton = styled.div`
  border: 1px solid lightgray;
  border-radius: 999px;
  width: 60px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;

  .auth_i {
    font-size: 20px;
    color: gray;
  }
  .auth_i:first-child{
    font-size: 15px;
}
`;


const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [ modalOpen, setModalOpen ] = useState(false);
  const history = useHistory();

  const searchCity = (e) => {
    setSearchValue(e.target.value);
  };
  const search = () => {
    setSearchValue('');
  }


  const openModal = () => {
      setModalOpen(!modalOpen);
  }

  return (
    <>
      <Headers>
        <a href="/">
          <img src="https://i.pinimg.com/564x/04/57/14/0457144332ce38550077355621165d24.jpg" alt=""/>
        </a>
        <form className="search-form">
          <div className="search-formdiv">
              <input type="text" placeholder="여행지 검색을 통해 빠른 예약을 해보세요" value={searchValue} onChange={searchCity}/>
              <Link onClick={search} to={`/hosts?city=${searchValue}`}>
                <button><FaSearch/></button>
              </Link>
          </div>
        </form>
        <HeaderRight>
          <AuthButton onClick={ openModal }>
            <FaUserAlt className="auth_i"/>
            <FaBars className="auth_i"/>
          </AuthButton>
        </HeaderRight>
      </Headers>
      
      {modalOpen && 
        <ModalType open={ modalOpen } close={ openModal }>
        </ModalType>
      }

    </>
  );
};

export default Header;