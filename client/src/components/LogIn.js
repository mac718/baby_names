import React, {useState} from 'react';
import styled from "styled-components";

const SignUpForm = styled.form`
  width: 25%;
  height: 35%;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 10px;
`

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center" >
      <SignUpForm>
        <div className="fs-2 text-center">
          Log In
        </div>
        <label htmlFor="email">Email</label>
        <input className="form-control" type="text" id="email" onChange={e => {
          let value = e.target.value;
          setEmail(value);
          setDisabled(false);
        }}/>
        <div className="d-flex justify-content-center align-items-center" style={{width: '100%'}}>
          <button className="btn btn-primary mt-2" disabled={disabled} onClick={
            e => {
              e.preventDefault();
              fetch('http://localhost:3001/createUser', {
                method: 'POST',
                body: JSON.stringify({email}),
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .catch(err => {
                console.log(err);
              })
            }
          }>Log In</button>
        </div>
      </SignUpForm>
    </div>
  );
}

export default LogIn;