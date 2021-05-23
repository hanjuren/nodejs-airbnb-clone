import React from 'react';
import styled, {css} from 'styled-components';

const InputCommons = styled.input`
  width: 90% !important;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid lightgray;
  outline: none;
  margin-bottom: 20px;
  font-size: 17px;
`;

const NumInput = css`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid lightgray;
  outline: none;
  text-align: center;
`;

const NumberInput = styled.input`
  width: 100px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid lightgray;
  outline: none;
  text-align: center;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;


const Input = (props) => {
  const {placeholder, type, name, value, event} = props;

  if(type === "tel") {
    return (
      <>
        {name === "firstNum" ? (
          <NumberInput type={type} name={name} onChange={event}/>
        ) : <NumberInput type={type} name={name} placeholder="- - - -"  onChange={event}/>}
        
      </>
    );
  }
  else {
    return (
      <>
        <InputCommons type={type} name={name} placeholder={placeholder} value={value}  onChange={event}/>
      </>
    );
  }
  
};

export default Input;