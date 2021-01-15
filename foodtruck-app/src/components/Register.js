import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const FormGroup = styled.div`
	width: 100%;
	max-width: 350px;
	padding: 15px;
	margin: 10% auto;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  `;

  const Button = styled.button`
  width: 100%;
  cursor: pointer;
	border: none;
	padding: 15px;
	font-size: 14px;
	border-radius: 3px;
	background-color: #0077CC;
	color: white;
  appearance: none;
  margin-top: 10%;
  &:hover {
    background-color: #006dcc;
  }
  `;

  const Input = styled.input`
	box-sizing: border-box;
	font-size: 14px;
	padding: 15px;
	border-radius: 3px;
	border: none;
	box-shadow: inset 0 0 0 1px #dee1e3;
	width: 100%;
	outline: none;
  transition: all 200ms;
  margin-top: 10%;
`;

const Select = styled.select`
height: 30px;
font-size: 14px;
width: 100%;
color: black;
background-color: white;
margin-top: 10%;
`;

const Register = () => {

  const [ credentials, setCredentials ] = useState({
    username: "",
    password: "", 
    role: ""
  });

  const [ isLoading, setIsLoading ] = useState(false);

  const loading = () => {
    setIsLoading(true);
  }

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
  };

  const register = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", credentials)
      .then(res => {
          console.log(res);
        // localStorage.setItem("authorization", res.data.payload);
        // props.history.push("/#");
          setIsLoading(false);
      })
      .catch(err => {
        // localStorage.removeItem("authorization");
        console.log("invalid login: ", err);
      });
  };


  return (
    <FormGroup>
      {isLoading && (
          <div>
            <Loader type="Puff" color="#204963" height={60} width={60} />
            <p>Registering you now...</p>
          </div>
        )}
      <h1>Sign up as a customer or operator</h1>  
      <form onSubmit={register} >
        <Input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="username"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <Select name="role" value={credentials.role} onChange={handleChange}>
            <option defaultValue="Customer">Customer</option>
            <option value="Operator">Operator</option>
        </Select>
        <Button onClick={loading}>Sign Up</Button>
      </form>
    </FormGroup>
  )
};

export default Register;
