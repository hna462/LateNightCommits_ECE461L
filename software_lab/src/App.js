
import './App.css';
import MyUser from './MyUserClass';
import Forms from './Forms';
import ProjectFront from './MyProjectFront';
import Project from "./Projects";



import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import { LinkContainer } from "react-router-bootstrap";
// import About from "./components/React-Router-Hooks/About";
import { Outlet, Navigate, NavLink } from "react-router-dom";
//import { Navbar, Nav, Button } from "react-bootstrap";
//import Products from "./components/React-Router-Hooks/Products";
// import Home from "./components/React-Router-Hooks/Home";
//import PageNotFound from "./components/React-Router-Hooks/PageNotFound";
import { useParams } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/resources">Resource Mgmt</Link>
          </li>
        </ul>
      </nav>

     
        <Routes>
             <Route path="/" element={<div><MyUser/>  <Forms/>  </div>}></Route>
            <Route path="/resources" element={ <Project/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
