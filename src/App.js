import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function test(totalProjects){
  for(let i = 0; i < totalProjects.length;i++){
     //print(totalProjects[i])
  }
}

function Form(props) {
  const [inputValue, setInputValue] = useState('');
  const [value, getValue] = useState("")


  /**
   * Event handler for input change.
   * Updates the input value state with the new value entered by the user.
   * @param {object} event - The event object.
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  }
  
  const onClick = async(e) => {

    console.log("Button was clicked")

    const requestOptions = {
        method: "POST"
    }



    await fetch("/checkIn/", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      //mode: "cors",
      body: JSON.stringify({'qty':inputValue, 'projectid': props.projectid})
  })
  .then(response => response.json())
  .then(data => getValue(data.qty))
  .then(value ? alert(value + " hardware checked in") : console.log("nothing"));


 
}

const onClick2 = async(e) => {

console.log("Button was clicked")

const requestOptions = {
    method: "POST"
}


await fetch("/checkOut/", {
method: "POST",
headers: {"Content-Type" : "application/json"},
//mode: "cors",
body: JSON.stringify({'qty':inputValue, 'projectid': props.projectid})
})
.then(response => response.json())
.then(data => getValue(data.qty))
.then(value ? alert(value + " hardware checked out") : console.log("nothing"));
}
  return(
    <div class= "info2">
      <form>
        <label>    

          <input type="number" min="0" value={inputValue} onChange={handleInputChange}/>
          <Button  onClick={onClick} style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                          Check in
                      </Button>
          <Button onClick={onClick2} style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                          Check out
          </Button>                        
     
        
        </label>

      </form>
      
    </div>
  )
}

function Buttons(props){
  const [value, getValue] = useState("")
  const [value2, getValue2] = useState("")
  const onClick = async(e) => {

    console.log("Button was clicked")

    const requestOptions = {
        method: "POST"
    }



    await fetch("/join/", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      //mode: "cors",
      body: JSON.stringify({'projectid': props.projectid})
  })
  .then(response => response.json())
  .then(data => getValue(data.projectid))
  .then(data => getValue2("Leave"))
  .then(value ? alert("Joined "+value) : console.log("nothing"));

  
 
    await fetch("/left/", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      //mode: "cors",
      body: JSON.stringify({'projectid': props.projectid})
  })
  .then(response => response.json())
  .then(data => getValue(data.projectid))
  .then(data => getValue2("Join"))
  .then(value ? alert("Left "+value) : console.log("nothing"));
   
    
  
}
  return(
    <Button onClick={onClick} style={{ color: 'black' , backgroundColor:"gainsboro"}}>
    {value2 === "Join" ? "Join" : "Leave"}
 </Button>
  )
}



function Table(projectId) {
  var currentName = "test"
  alert("alerts are working")
  const getProjects = async() =>{
      try{
        const response = await axios.post('http://localhost:5000/home/getProject', {projectId});
        currentName(response.data.Name)
        
        }catch(error){
          alert("error")
        }
      }
  return (
    <div>
      <script>getProjects();</script>
        <Box class = "table"
            sx={{ p: 2, border: '1px dashed grey' }}>
                <div class = "info" >
                    <h2> {currentName}</h2>
                    <p> list of authorized users</p>
                    <div class = "forms" >
                          <h3> HWSet1: 100/100</h3>
                          <h3> HWSet2: 100/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  projectid= "1"/>
                        <Form  projectid= "1"/>
                    </div>
                    
                    <div>
                      <Buttons projectid = "1"/>
                    </div>
                </div>
          
        </Box>
        </div>
);
}


function Login({onLoginSuccess}){
  /* Login Fields */
  const [username, setUsername] = useState('');
  const [userid, setUserID] = useState('');
  const [password, setPassword] = useState('');
  /* Login Error Message Return */
  const [message, setMessage] = useState('');
  const [otherMessage, setOtherMessage] = useState('');
  /* Create Account Error Message Return */
  const [enterUsername, setEnterUsername] = useState('');
  const [enterUserid, setEnterUserid] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, userid, password });
      setMessage(response.data.message);
      onLoginSuccess(userid, username);
      
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Server could be broken.');
      }
    }
  };

  const handleCreateNewAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/createaccount', { enterUsername, enterUserid, enterPassword, reEnterPassword });
      setOtherMessage(response.data.otherMessage);
      onLoginSuccess(enterUserid ,enterUsername);
      
    } catch (error) {
      if (error.response) {
        setOtherMessage(error.response.data.otherMessage);
      } else {
        setOtherMessage('Login failed. Server could be broken.');
      }
    }
  };

  return(
    <div style={{alignItems: "center", display: "flex"}}>
      <div className="box-container">
        
          
            <form onSubmit={handleLogin}>
              <h2>Hardware Checkout Login</h2>
              <div>
                <label>Username: </label>
                <input
                  type="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
              </div>
              
              
              <div> 
                <label>UserID: </label>
                  <input
                    type="userid"
                    placeholder="Enter UserID"
                    value={userid}
                    onChange={(e) => setUserID(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
              </div>

              <div>
                <label>Password: </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
              {message && <p style={{color: 'red'}}>{message}</p>}
            </form>
          
 
        
          
            <form onSubmit={handleCreateNewAccount}>
              <div><h2>Create New Account</h2>
                <i style={{color: 'blue'}}>*Note*: Only letters and numbers are allowed for username, userid, and password.</i>
                <div>
                  <label>Enter Username: </label>
                  <input
                    type = "enterUsername"
                    value = {enterUsername}
                    onChange={(e) => setEnterUsername(e.target.value)}
                    />
                </div>
                <div>
                  <label>Enter Unique UserID: </label>
                  <input
                    type = "enterUsername"
                    value = {enterUserid}
                    onChange={(e) => setEnterUserid(e.target.value)}
                    />
                </div>
                <div>
                  <label>Enter Password: </label>
                  <input
                    type = "enterPassword"
                    value = {enterPassword}
                    onChange={(e) => setEnterPassword(e.target.value)}
                    />
                </div>
              </div>
              <div>
                <label>Re-enter Password: </label>
                <input
                  type = "reEnterPassword"
                  value = {reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  />
              </div>
              <button type="submit">Create Account</button>
              {otherMessage && <p style={{color: 'red'}}>{otherMessage}</p>}
            </form>

          
        
      </div>
    </div>
  );


}


function Home( {userid, username,  onLogOut}) {
  const[message, setMessage] = useState('');
  const[joinProjectMessage, setJoinProjectMessage] = useState('');



  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [hwSet1, setHwSet1] = useState('');
  const [hwSet2, setHwSet2] = useState('');

  const[findProjectid, setFindProjectid] = useState('')

  

  
  const handleJoinExistingProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/home/joinProject', { userid, projectId });

      setMessage(response.data.message)

    }catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Server could be broken.');
      }
    }
  }

  const handleCreateNewProject = async(e) => {
    
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/createProject' , {projectName, projectId, projectDescription, hwSet1, hwSet2, userid});
      //alert("handle Create New project was called");
      setMessage(response.data.message);
    }catch (error){
      if (error.response) {
        alert("response present")
        setMessage(error.response.data.message);
      } else {
        alert("response not present")
        setMessage('Login failed. Server could be broken.');
      }
    }
  }
//Use a python function to get the username from userid
  return (
    
    <div>
      <h1>Welcome to Hardware Resource Manager, {username}</h1> 
      <button onClick={onLogOut}>Log Out</button>
      <div>
      <h4>Create A New Project Below:</h4>
      <label>Project Name:</label>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        marginRight = '10 px' 
      />
      
      
      <label>Unique Project ID:</label>
      <input
        type="text"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      
      <div>
        <label>Project Description:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
      <div>
        <label>HWSet1 Quantity: {hwSet1}</label>
        <input
          type="number"
          value={hwSet1}
          onChange={(e) => setHwSet1(e.target.value)}
        />
        <label>HWSet2: {hwSet2}</label>
        <input
          type="number"
          value={hwSet2}
          onChange={(e) => setHwSet2(e.target.value)}
        />
      </div>
      <button onClick={handleCreateNewProject}>Create New Project</button>
    </div>
    <div>
      <h4>Or join an existing project by entering the projectid below and pressing "Join Project"</h4>
      <label>Join Existing Project: </label>
      <input 
        type="text"
        value ={findProjectid}
        onChange={(e) => setFindProjectid(e.target.value)}
        />
        <button onSubmit={handleJoinExistingProject}>Join Projectid</button>
    </div>
    <div><Table projectId = "testid"/></div>
    </div>
  );
}

function App() {
  
  /* Logged In Status */
  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState('Guest');
  const [username, setUsername] = useState('');
  const handleLogout =() => setLoggedIn(false)
  
  const handleLoginSuccess = (userid, username) => {{
    setLoggedIn(true)
    setUserid(userid)
    setUsername(username)
  }}


  return (
    <Router>
      <Routes>
        <Route path="/" element={!loggedIn ? <Login onLoginSuccess = {handleLoginSuccess} /> : <Navigate replace to ="/Home" />} />
        <Route path="/Home" element={loggedIn ? <Home userid ={userid} username={username} onLogOut={handleLogout}/> : <Navigate replace to="/" />} />

      
        

      </Routes>
    </Router>
    
  );
}

export default App;