import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import Navbar from './Navbar'
import auth, { AuthContext } from './auth'

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    if(auth.isLoggedIn()) setUser(auth.getJWT())
  }, [])

  return (
    <Router className="App">
      <AuthContext.Provider value={{user, setUser}}>
        <Navbar />
        <MainRouter />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
