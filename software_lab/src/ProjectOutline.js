import React, {useState} from 'react'
import { Box, Button } from '@mui/material';
import './ProjectOutline.css';
import { Router,Route } from "react-router-dom";
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

function Table() {
    return (
        <Box class = "table"
            sx={{ p: 2, border: '1px dashed grey' }}>
                <div class = "info" >
                    <h2> Project Name 1</h2>
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
       
      
    );
}
function Table2() {
    return (
        <Box class = "table"
            sx={{ p: 2, border: '1px dashed grey' }}>
                <div class = "info" >
                    <h2> Project Name 2</h2>
                    <p> list of authorized users</p>
                    <div class = "forms" >
                          <h3> HWSet1: 100/100</h3>
                          <h3> HWSet2: 100/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  projectid= "2"/>
                        <Form  projectid= "2"/>
                    </div>
                    <div>
                    <Buttons projectid = "2"/>
                   </div>
                </div>
          
        </Box>
       
      
    );
}
function Table3() {
    return (
        <Box class = "table"
            sx={{ p: 2, border: '1px dashed grey' }}>
                <div class = "info" >
                    <h2> Project Name 3</h2>
                    <p> list of authorized users</p>
                    <div class = "forms" >
                          <h3> HWSet1: 100/100</h3>
                          <h3> HWSet2: 100/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  projectid= "3"/>
                        <Form  projectid= "3"/>
                    </div>
                   <div>
                   <Buttons projectid = "3"/>
                   </div>
                </div>
          
        </Box>
       
      
    );
}

const ProjectOutline = () => {
    return (
      <div>
         <Table />
         <Table2 />
         <Table3 />
      </div>
    );
  };
export default ProjectOutline;