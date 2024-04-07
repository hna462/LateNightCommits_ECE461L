import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';


function test(totalProjects){
  for(let i = 0; i < totalProjects.length;i++){
     //print(totalProjects[i])
  }
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
        
            <div></div>
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
          
 
        
            <hr class="solid"></hr>
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
  const[hwset1Message, setHWSet1Message] = useState('')
  const[hwset2Message, setHWSet2Message] = useState('')

  //Create New Project Fields
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [hwSet1, setHwSet1] = useState('');
  const [hwSet2, setHwSet2] = useState('');
  //Join Project Field
  const[findProjectid, setFindProjectid] = useState('');
<<<<<<< HEAD
  //User's projectids
  const[projectIDs, setProjectIDs] = useState([]);
=======
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
  //Display Project
  const [displayProjectName, setDisplayProjectName] = useState('No Project Joined');
  const [displayProjectId, setDisplayProjectId] = useState('no id');
  const [displayProjectDescription, setDisplayProjectDescription] = useState('Join Project Above');
  const [displayHWSet1Capacity, setDisplayHWSet1Capacity] = useState('0');
  const [displayHWSet2Capacity, setDisplayHWSet2Capacity] = useState('0');
  const [displayHWSet1Available, setDisplayHWSet1Available] = useState('0');
  const [displayHWSet2Available, setDisplayHWSet2Available] = useState('0');
  const [displayUserList, setDisplayUserList] = useState('list of users');
  //Checkin Checkout
  const [inputHardwareNumberOne, setInputHardwareNumberOne] = useState('')
  const [inputHardwareNumberTwo, setInputHardwareNumberTwo] = useState('')
  //Boolean
  const [hasJoinAnyProject, setHasJoinedAnyProjects] = useState(false)

  //Join Project Button
  const handleJoinExistingProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/home/joinProject', { userid, findProjectid });

      setJoinProjectMessage(response.data.message);
      setDisplayHWSet1Available(response.data.availability1);
      setDisplayHWSet2Available(response.data.availability2);
      setDisplayHWSet1Capacity(response.data.capacity1);
      setDisplayHWSet2Capacity(response.data.capacity2);
      setDisplayProjectId(response.data.projectID);
      setDisplayProjectName(response.data.projectName);
      setDisplayProjectDescription(response.data.projectDescription);
      setDisplayUserList(response.data.userList);
<<<<<<< HEAD
      // alert(displayUserList)
=======
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47


    }catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        
      } else {
        setMessage('Login failed. Server could be broken.');
      }
    }
  }
  //Create New Project Button
  const handleCreateNewProject = async(e) => {
    
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/createProject' , {projectName, projectId, projectDescription, hwSet1, hwSet2, userid});
      
      setJoinProjectMessage(response.data.message);
      setDisplayHWSet1Available(response.data.availability1);
      setDisplayHWSet2Available(response.data.availability2);
      setDisplayHWSet1Capacity(response.data.capacity1);
      setDisplayHWSet2Capacity(response.data.capacity2);
      setDisplayProjectId(response.data.projectID);
      setDisplayProjectName(response.data.projectName);
      setDisplayProjectDescription(response.data.projectDescription);
      setDisplayUserList(response.data.userList);

<<<<<<< HEAD
=======

>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    }catch (error){
      if (error.response) {
        
        setMessage(error.response.data.message);
      } else {
        
        setMessage('Login failed. Server could be broken.');
      }
    }
  }

  //HW Set 1 Check In Button
  const handleHWSet1CheckIn = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkinhwset1', {inputHardwareNumberOne, userid, displayProjectId} )
      setHWSet1Message(response.data.message);
      setDisplayHWSet1Available(response.data.availability)
    }catch (error){
      if (error.response) {
        
        setHWSet1Message(error.response.data.message);
      } 
      else {
        
        setHWSet1Message('Login failed. Server could be broken.');
      }
    }
  }

   //HW Set 1 Check In Button
   const handleHWSet1CheckOut = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkouthwset1', {inputHardwareNumberOne, userid, displayProjectId} )
      setHWSet1Message(response.data.message);
      setDisplayHWSet1Available(response.data.availability);
<<<<<<< HEAD
    }catch (error){
      if (error.response) {
        
        setHWSet1Message(error.response.data.message);
      } 
      else {
        
        setHWSet1Message('Login failed. Server could be broken.');
      }
    }
  }
  //HW Set 2 Check In Button
  const handleHWSet2CheckIn = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkinhwset2', {inputHardwareNumberTwo, userid, displayProjectId} )
      setHWSet2Message(response.data.message);
      setDisplayHWSet2Available(response.data.availability)
    }catch (error){
      if (error.response) {
        
        setHWSet2Message(error.response.data.message);
      } 
      else {
        
        setHWSet2Message('Login failed. Server could be broken.');
      }
    }
  }

  //HW Set 2 Check Out Button
  const handleHWSet2CheckOut = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkouthwset2', {inputHardwareNumberTwo, userid, displayProjectId} )
      setHWSet2Message(response.data.message);
      setDisplayHWSet2Available(response.data.availability);
    }catch (error){
      if (error.response) {
        
=======
    }catch (error){
      if (error.response) {
        
        setHWSet1Message(error.response.data.message);
      } 
      else {
        
        setHWSet1Message('Login failed. Server could be broken.');
      }
    }
  }
  //HW Set 2 Check In Button
  const handleHWSet2CheckIn = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkinhwset2', {inputHardwareNumberTwo, userid, displayProjectId} )
      setHWSet2Message(response.data.message);
      setDisplayHWSet2Available(response.data.availability)
    }catch (error){
      if (error.response) {
        
        setHWSet2Message(error.response.data.message);
      } 
      else {
        
        setHWSet2Message('Login failed. Server could be broken.');
      }
    }
  }

  //HW Set 2 Check Out Button
  const handleHWSet2CheckOut = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/home/checkouthwset2', {inputHardwareNumberTwo, userid, displayProjectId} )
      setHWSet2Message(response.data.message);
      setDisplayHWSet2Available(response.data.availability);
    }catch (error){
      if (error.response) {
        
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
        setHWSet2Message(error.response.data.message);
      } 
      else {
        
        setHWSet2Message('Login failed. Server could be broken.');
      }
    }
  }

  //Project Refresh buttonm
  const handleRefreshProject = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/home/refreshProject', { userid, findProjectid });

      setJoinProjectMessage(response.data.message);
      setDisplayHWSet1Available(response.data.availability1);
      setDisplayHWSet2Available(response.data.availability2);
      setDisplayHWSet1Capacity(response.data.capacity1);
      setDisplayHWSet2Capacity(response.data.capacity2);
      setDisplayProjectId(response.data.projectID);
      setDisplayProjectName(response.data.projectName);
      setDisplayProjectDescription(response.data.projectDescription);
      setDisplayUserList(response.data.userList);


    }catch (error) {
      if (error.response) {
<<<<<<< HEAD
        setMessage(error.response.data.message);
        
      } else {
        setMessage('Login failed. Server could be broken.');
      }
    }
  }
  const getProjectList = async(e) => {
   e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/home/getProjectIDs', { userid});

      setProjectIDs(response.data);
      // alert(response.data)

    }catch (error) {
      if (error.response) {
=======
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
        setMessage(error.response.data.message);
        
      } else {
        setMessage('Login failed. Server could be broken.');
      }
    }
  }
<<<<<<< HEAD
  //getProjectList()
  const projectIDList = []
  projectIDs.length
   for (let i = 0; i < projectIDs.length; i++) {
     projectIDList.push(<option value={i}>{projectIDs[i]}</option>);
  }
=======


>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
  return (
    
    <div>
      <h1 className= "text-center">Welcome to Hardware Resource Manager, {username}</h1> 
      <hr class="solid"></hr>
      <p>Your userID is {userid}</p>
      <button onClick={onLogOut}>Log Out</button>
      <hr class="solid"></hr>
      <div>
      <h4>Create A New Project Below:</h4>
      <label>Project Name:</label>
      <input
        type="text"
        value={projectName}
        placeholder="Enter New Project Name"
        onChange={(e) => setProjectName(e.target.value)}
        marginRight = '10 px' 
      />
      
      
      <label>Unique Project ID:</label>
      <input
        type="text"
        value={projectId}
        placeholder = "New Unique ProjectID"
        onChange={(e) => setProjectId(e.target.value)}
      />
      
      <div>
        <label>Project Description:</label>
        <textarea
          value={projectDescription}
          placeholder="Enter Description of Project Here"
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
      <div>
        <label>HWSet1 Capacity:</label>
        <input
          type="number"
          value={hwSet1}
          onChange={(e) => setHwSet1(e.target.value)}
        />
        <label>HWSet2 Capacity: </label>
        <input
          type="number"
          value={hwSet2}
          onChange={(e) => setHwSet2(e.target.value)}
        />
      </div>
      <button onClick={handleCreateNewProject}>Create New Project</button>
    </div>
    <hr class="solid"></hr>
    {message}
    
    <div>
      <h4>Join an existing project by entering the projectid below and pressing "Join Project"</h4>
      <label>Join Existing Project: </label>
      <input 
        type="text"
        value ={findProjectid}
        placeholder = "Existing ProjectID"
        onChange={(e) => setFindProjectid(e.target.value)}
        />
        <button onClick={handleJoinExistingProject}>Join Projectid</button>
        <div>{joinProjectMessage}</div>
        
    </div>
<<<<<<< HEAD
   <div>
    <br></br>
    <form>
    <label for="cars"><h4>Pick a projectid to display that are currently used by user, {username}: </h4></label>
    <button onClick = {getProjectList}>show</button>
  <select name="cars" id="cars">
    {projectIDList}
  </select>
  <br></br>
    </form>
    </div>
     
=======
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    
    <div>
      <hr class="solid"></hr>
      <div className="mainBox">
      {/* Project Title Subbox */}
      <div className="subBox">
<<<<<<< HEAD
        <div><h3>{displayProjectName}</h3> <p>Description: {displayProjectDescription}</p></div>
      </div>
      <div className="subBox">
        <p className ="userList">authorized userids: {displayUserList}</p>
=======
        <div><h3>{displayProjectName}</h3> <p>{displayProjectDescription}</p></div>
      </div>
      <div className="subBox">
        <p className ="userList">{displayUserList}</p>
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
      </div>
      <div className="subBox">
        <div><h5>HWSet1: {displayHWSet1Available}/{displayHWSet1Capacity}</h5>
        <input
        type="number"
        placeholder = "Enter Qty"
        value={inputHardwareNumberOne}
        onChange={(e) => setInputHardwareNumberOne(e.target.value)}
      />
        <button onClick={handleHWSet1CheckIn}>Check In</button>
        <button onClick={handleHWSet1CheckOut}>Check Out</button>
        </div>
        {hwset1Message}
        <div><h5>HWSet2: {displayHWSet2Available}/{displayHWSet2Capacity}</h5></div>
      </div>  
      
      <div className="subBox">

        

        <div>
        <input
        type="number"
        value ={inputHardwareNumberTwo}
        placeholder = "Enter Qty"
        onChange={(e) => setInputHardwareNumberTwo(e.target.value)}
      />
      
      
      <button onClick={handleHWSet2CheckIn}>Check In</button>
      <button onClick={handleHWSet2CheckOut}>Check Out</button>
      
        </div>
        {hwset2Message}
      </div>
      <div className="subBox">
        <button onClick={handleRefreshProject}>Refresh Project</button>  
      </div>
    </div>
      

    </div>
    </div>
  );
}

function App() {
  
  /* Logged In Status */
  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setUserid] = useState('Guest');
  const [username, setUsername] = useState('');
  const handleLogout =() => setLoggedIn(false)
  
  const handleLoginSuccess = (userid, username) => {
    setLoggedIn(true)
    setUserid(userid)
    setUsername(username)
  }


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