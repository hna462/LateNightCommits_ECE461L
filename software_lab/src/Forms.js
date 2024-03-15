import React, { useState } from 'react';
import './Forms.css';
import { Box, Button } from '@mui/material';


function Form0(props) {
  const [inputValue, setInputValue] = useState('');
  

  const handleSubmit=(event) => {
    event.preventDefault();
    console.log('A name was submitted: ' +inputValue);
   
  }
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
      <form  onSubmit={handleSubmit}>
        <label>
          {props.title}:    
          <input type="text" value={inputValue} onChange={handleInputChange}/>
        </label>
        
      </form>
      
    </div>
  )
}

function Form(props) {
  const [inputValue, setInputValue] = useState('');
  

  const handleSubmit=(event) => {
    event.preventDefault();
    console.log('A user id was submitted: ' +inputValue);
   
  }
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
      <form  onSubmit={handleSubmit}>
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
    
  
    const handleSubmit=(event) => {
      event.preventDefault();
      console.log('A password was submitted: ' +inputValue);
     
    }
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
        <form onSubmit={handleSubmit}>
          <label>
            {props.title}:    
            <input id = "password" type="password" value={inputValue} onChange={handleInputChange}/>
          </label>
          
        </form>
        
      </div>
    )
  }


const Forms = () => {
    return (
      <div>
         <div class= "fo">
           <Form0 title="userName" /> 
           <div class= "space">
             <Form title="userID" />
           </div>
         </div>
         <div class = "fo2"><Form2 title="password" />  
         
            </div>
        <div class= "signin">
          <Button style={{color: 'black', background: 'gainsboro'}}>
              Sign in
          </Button>
        </div>
         
      </div>
    );
  };
export default Forms;


 