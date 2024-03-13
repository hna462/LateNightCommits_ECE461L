// Functional components are a simpler way to write components in React. 
// Unlike class components, functional components don't have access to 
// lifecycle methods or state, but they still provide a way to render a 
// user interface and handle events in React.
// Here's an example of a simple functional component that renders a title 
// and a message:
// 
import './MyUserClass.css'
import { Box, Button } from '@mui/material';

import Forms from './Forms';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function MyComponent(props) {
    return (
        <div>
            <div class = "spacer">
                        <Box color="white" 
                            bgcolor="#CC5500" p= {2}
                            height={50}
                width={300}
                my={4}
                display= "flex"
                alignItems="center"
                justifyContent="center"
                gap={4}
                >
                            {props.title}
                            </Box>
                            
                    </div>
         <div class = "spacer2">
            <Popup trigger=
                {<Button style={{color: 'black', background: 'gainsboro'}}>
                New User?
            </Button>}
                position="right center">
                    Fill in user info
                <div ><Forms /></div>
            </Popup>
            <span class="tab2"></span>
            Sign in
         </div>
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