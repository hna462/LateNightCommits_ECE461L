// Functional components are a simpler way to write components in React. 
// Unlike class components, functional components don't have access to 
// lifecycle methods or state, but they still provide a way to render a 
// user interface and handle events in React.
// Here's an example of a simple functional component that renders a title 
// and a message:
// 



import React from 'react';
function MyComponent(props) {
    return (
        <div>
            <h2>{props.title}</h2>
        </div>
    );
}

const MyUser = () => {
    return (
      <div>
          <MyComponent title="User Information" />
      </div>
    );
  };
export default MyUser;