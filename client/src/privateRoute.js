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
    console.log("token not found")
  }else{
    isAuthenticated = true
    console.log("token found")

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