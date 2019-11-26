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
  }else{
    isAuthenticated = true
}
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true  ? (<Component {...rest} {...props} />) : (<Redirect to="/signUp" />)
      }
    />
  )
}



export default PrivateRoute