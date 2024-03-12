
// 04_ReactTable deck: creating React tables from html table element.
//HTML tables can be created in React using the <table> tag.
//The table can be dynamically created using components.
//We can create table and row components.
//These components are then nested together to render the table.

import { useState } from "react";
//The <Row> component takes city and temperature as props from the <Table> component.
//The city and temperature values are destructured.
//The <Row> component returns a table row.
//This is rendered using the <tr> and <td> elements.
import React from 'react';
import './ProjectForms.css';

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
          <input class = "in"type="text" value={inputValue} onChange={handleInputChange}/>
        </label>
        
      </form>
      
    </div>
  )
}

const Row = (props) => {
    const {city, temperature} = props;
    return(
        <tr>
            <td class= "row" >{city}</td>
            <td class= "row" >{temperature}</td>
            <td class= "row" ><Form/></td>

        </tr>
    ) 
}
//The <Table> component takes the table data as props from the TableMain component.
//The data is stored in an array rows.
//The table is rendered using the <table> and <tbody> tags.
//The map() function is used with the array rows to map through its elements.
//Each row element’s city and temperature properties are passed as props to the <Row> component.

const Table = (props) => {
    const rows = props.data;
    return(
        <table class= "table">
            <tbody>
        {rows.map((row) => 
            <Row city={row.city} temperature={row.temperature} key={row.city}/>
            )}
            </tbody>
            </table>
            
    )
}
//A global array tableList stores the list of all the objects to be rendered in the table.
//The <TableMain> component sets the variable tableData to the value of tableList using the useState hook.
//It then renders the <Table> component and passes the tableData as a prop.

const tableList = [
    { city: 'New York', temperature: '52F'},
    { city: 'New Delhi', temperature: '50F'}
]
const ProjectForms = () => {
    const [ tableData, setTableData] = useState(tableList);
    return(
      <div>

        <div class = "tableHeader">
          <h4>Capacity <span class="tab3"> </span> Available <span class="tab3"> </span> Request</h4>
         </div>
          
       <div class = "tableAlign">
        <h4>HW Set1 <span class= "tab5">-----------</span> <span class= "tab4"> HW Set2 </span></h4>
        <Table data={tableData} />

       </div>
 
      </div>
     
    )
}

export default ProjectForms;