import React from 'react'
import { Route, Redirect } from 'react-router-dom'




const PrivateRoute =  ({
  component: Component,
  isAuthenticated=false,
  redirect : pathname,
  ...rest
}) => {
  
  const storedToken = localStorage.getItem('jwtToken')
  if (!storedToken){
    isAuthenticated = false
    alert("You have to Login to access this page")
  }else{
    isAuthenticated = true

}
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true  ? (<Component {...rest} {...props} />) : (<Redirect to="/signIn" />)
      }
    />
  )
}



export default PrivateRoute