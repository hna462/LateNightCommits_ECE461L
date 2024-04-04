import React, { useState } from 'react';
import './MyProjectFront.css';
import { Box, Button } from '@mui/material';
import Popup from 'reactjs-popup';

function Form(props) {
  const [inputValue, setInputValue] = useState('');
  


  /**
   * Event handler for input change.
   * Updates the input value state with the new value entered by the user.
   * @param {object} event - The event object.
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  }

  return(
    <div>
      <form>
        <label>
          {props.title}:    
          <input type="number" min = "0" value={inputValue} onChange={handleInputChange}/>
        </label>
        
      </form>
      
    </div>
  )
}
function Form2(props) {
    const [inputValue, setInputValue] = useState('');
    
  
  
    /**
     * Event handler for input change.
     * Updates the input value state with the new value entered by the user.
     * @param {object} event - The event object.
     */
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
  
    }
  
    return(
      <div>
        <form>
          <label>
            {props.title}:    
            <input type="password" value={inputValue} onChange={handleInputChange}/>
          </label>
          
        </form>
        
      </div>
    )
  }

const ProjectFront = () => {
    return (
      <div>
        <div class = "titles">
      
          Use Existing Project
          <span class = "tab"></span>
          <Popup trigger=
                {<Button style={{color: 'black', background: 'gainsboro'}}>
                Create New Project
            </Button>}
                position="right center">
                    Fill in project info
                <div >
                    
                 
                    <Form title="Name" /> 
                  <div class= "spacerID">
                  <Form title="Description" />
                  </div>
               <Form title="projectID" />
                
                </div>
            </Popup>
        </div>
      
         <div class = "ID"><Form title="projectID" /></div>
         <div class= "projectSubmit">
         <Button  type= "submit" style={{color: 'black', background: 'gainsboro'}}>
              Submit
          </Button>
          </div>
      </div>
    );
  };
export default ProjectFront;