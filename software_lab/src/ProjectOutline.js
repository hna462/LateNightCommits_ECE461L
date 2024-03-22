import React, {useState} from 'react'
import { Box, Button } from '@mui/material';
import './ProjectOutline.css';

function Form(props) {
    const [inputValue, setInputValue] = useState('Enter qty');
    
  
  
    /**
     * Event handler for input change.
     * Updates the input value state with the new value entered by the user.
     * @param {object} event - The event object.
     */
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
  
    }
  
    return(
      <div >
        <form class= "info2">
          <label>    
            <input type="text" value={inputValue} onChange={handleInputChange}/>
            <Button style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                            Check in
                        </Button>
            <Button style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                            Check out
            </Button>                        

          
          </label>

        </form>
        
      </div>
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
                          <h3> HWSet1: 50/100</h3>
                          <h3> HWSet2: 0/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  title= "enter qty"/>
                        <Form  title= "enter qty"/>
                    </div>
                    
                    <div>
                    <Button style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                      Join
                   </Button>
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
                          <h3> HWSet1: 50/100</h3>
                          <h3> HWSet2: 0/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  title= "enter qty"/>
                        <Form  title= "enter qty"/>
                    </div>
                    <div>
                    <Button style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                      Leave
                   </Button> 
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
                          <h3> HWSet1: 50/100</h3>
                          <h3> HWSet2: 0/100</h3>
                    </div>
                    <div class = "forms" >
                        <Form  title= "enter qty"/>
                        <Form  title= "enter qty"/>
                    </div>
                   <div>
                    <Button style={{ color: 'black' , backgroundColor:"gainsboro"}}>
                      Join
                   </Button> 
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