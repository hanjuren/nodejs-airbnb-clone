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


const Input = (props) => {
  const {placeholder, type, name, value, event, inputref} = props;
    return (
      <>
        <InputCommons type={type} name={name} placeholder={placeholder} value={value}  onChange={event} ref={inputref}/>
      </>
    );
};

export default Input;