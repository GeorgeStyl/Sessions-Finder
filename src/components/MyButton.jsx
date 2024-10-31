import * as React from 'react'
import Button from '@mui/material/Button';
function MyButton(props){
    console.log("my bttom props", props)
    return(
      <React.Fragment>
        <Button  variant="contained" sx={{padding:'3px', backgroundColor: props.color}} >
          {props.title}
        </Button>
          </React.Fragment>
    )
  }
  export default MyButton
  