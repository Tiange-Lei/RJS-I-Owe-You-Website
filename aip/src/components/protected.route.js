import React from 'react';
import {Route, Redirect } from 'react-router-dom';
// ----------------------------------------------------------------------------------------------------------------------

const ProtectedRoute = ({component:Component,...rest})=>{
    return(

        <Route
            {...rest}
            render={props=>{
                if(localStorage.user_id){
                    return <Component {...props}/>
                }
                else{
                alert("Please login first");
                   return (
                    <Redirect to={
                        {pathname: "/login",
                        state:{
                            from:props.location
                        }}
                     } />
                   ) 
                }
        }}/>)
}
export default ProtectedRoute;