import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import Navbar from './Navbar'
import auth, { AuthContext } from './auth'
import jwtDecode from 'jwt-decode'
import './App.css'

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    console.log(auth.getJWT())
    if(auth.isLoggedIn()) setUser(
      jwtDecode(auth.getJWT())
    )
  }, [])

  return (
    <Router>
      <AuthContext.Provider value={{user, setUser}}>
        <Navbar />
        <MainRouter />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
