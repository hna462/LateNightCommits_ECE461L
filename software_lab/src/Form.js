


/**
 * A React component that renders a form with an input field for the user to 
 * enter their name.
 * @component
 */
import React, { useState } from 'react';

function Form() {
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
          userName:    
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          userId:    
          <input type="text" value={inputValue} onChange={handleInputChange}/>
        </label>
        <p>Your name is: {inputValue}</p>
        
      </form>
      
    </div>
  )
}

export default Form;

  