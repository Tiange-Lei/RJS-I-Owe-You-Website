import React from "react";
import axios from 'axios';
import { NavLogout } from "./styledComponents";
// ----------------------------------------------------------------------------------------------------------------------

const LogoutButton = () => {
  const logout = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/logout",
    }).then((res) => {
      localStorage.removeItem('user_id')
      console.log(res);
      window.location.href = `/`;
    })
  }
  return (
    <NavLogout onClick={() => {
      logout();
      localStorage.username = '';
    }}>
      Logout
    </NavLogout>
  );
};

export default LogoutButton;