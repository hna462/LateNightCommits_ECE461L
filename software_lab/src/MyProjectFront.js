import React, { useState } from 'react';
import './MyProjectFront.css';
import { Box, Button } from '@mui/material';

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
          <input type="text" value={inputValue} onChange={handleInputChange}/>
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
           <hr></hr>
          Create New Project <span class="tab"></span>
      
          <Button style={{color: 'black', background: 'gainsboro'}}> Use Existing Project </Button>
        </div>
        <div class= "fo">
           <Form title="Name" /> 
           <div class= "space">
             <Form title="projectID" />
           </div>
         </div>
         
         <div class = "fo2"><Form title="Description" /><Form2 title="password" /></div>
      </div>
    );
  };
export default ProjectFront;