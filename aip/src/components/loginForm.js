import React, { useState } from 'react';
import axios from 'axios';
import {FormContainer} from './styledComponents';
import {Button, Input} from 'antd'

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
          url: "http://localhost:4000/api/register",
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
          url: "http://localhost:4000/api/login",
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
                <Input placeholder='username' onChange={e=>setRegisterUsername(e.target.value)} style={{ width: '30%' }}/>
                <br></br>
                <Input.Password placeholder='password' onChange={e=>setRegisterPassword(e.target.value)} style={{ width: '30%' }}/>
                <br></br>
                <br></br>
                <Button type="primary" onClick={register}>submit</Button>
            </div>
            <div>
            <br></br>
                <h1>Login</h1>
                <br></br>
                <Input placeholder='username' onChange={e=>setLoginUsername(e.target.value)} style={{ width: '30%' }}/>
                <br></br>
                <Input.Password placeholder='password' onChange={e=>setLoginPassword(e.target.value)} style={{ width: '30%' }}/>
                <br></br>
                <br></br>
                <Button type="primary" onClick={login}>login</Button>
                <br></br>
            </div>
        </FormContainer>
    )
}
export default LoginForm;