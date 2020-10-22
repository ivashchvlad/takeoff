import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import Navbar from './Navbar'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <MainRouter />
  </Router>
  );
}

export default App;
