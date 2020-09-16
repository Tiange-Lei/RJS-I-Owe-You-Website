import React, { useState } from 'react';
import axios from 'axios';
import {FormContainer} from './styledComponents';

const LoginForm = ()=>{
    const [registerUsername, setRegisterUsername]= useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername,setLoginUsername] = useState('');
    const [loginPassword,setLoginPassword] = useState('');
    const register=()=>{
        axios({
          method:'POST',
          data:{
            username:registerUsername,
            password:registerPassword
          },
          withCredentials:true,
          url: "http://localhost:4000/register",
        }).then((res)=>{
          if(res.data==="Username already exists"){
            alert("Username alreday exists!");
          }
          else{
            alert('Successfully registered, please login with your account');
          }
        }).catch(err=>{
          console.log(err);
        })
      }
      const login=()=>{
        axios({
          method:'POST',
          data:{
            username:loginUsername,
            password:loginPassword
          },
          withCredentials:true,
          url: "http://localhost:4000/login",
        }).then((res)=>{
          if (res.data._id){
            localStorage.setItem('user_id',res.data._id);
            localStorage.setItem('username',res.data.username);
            window.location.href=`/users?${res.data.username}`;
          }
          else{
            alert("Invalid username or password")
          }
        })
      }
    return(
        <FormContainer>
            <div>
                <h1>Register</h1>
                <br></br>
                <input placeholder='username' onChange={e=>setRegisterUsername(e.target.value)}/>
                <br></br>
                <input placeholder='password' onChange={e=>setRegisterPassword(e.target.value)}type='password'/>
                <br></br>
                <br></br>
                <button onClick={register}>submit</button>
            </div>
            <div>
            <br></br>
                <h1>Login</h1>
                <br></br>
                <input placeholder='username' onChange={e=>setLoginUsername(e.target.value)}/>
                <br></br>
                <input placeholder='password' onChange={e=>setLoginPassword(e.target.value)} type='password'/>
                <br></br>
                <br></br>
                <button onClick={login}>login</button>
                <br></br>
            </div>
        </FormContainer>
    )
}
export default LoginForm;