import React, { useState } from 'react';
import './Forms.css';

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

const Forms = () => {
    return (
      <div>
         <div class= "fo">
           <Form title="userName" /> 
           <div class= "space">
             <Form title="userID" />
           </div>
         </div>
         <div class = "fo2"><Form2 title="password" /></div>
      </div>
    );
  };
export default Forms;