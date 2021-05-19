import React, {useState} from 'react';

const Register = (props) => {

  const [changePage, setChangePage] = useState(props.type)
  
  const { change } = props;
  
  return (
    <div>
      
      <button onClick={change}>회원가입</button>
    </div>
  );
};

export default Register;