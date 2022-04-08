import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import { Refresh } from '@mui/icons-material';
import Search from './Search';
import AdvSrch from './AdvSrch';

export default function Form(props) {
    const buttonarr = {
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#283a46",
        padding: "2rem 0",
        alignItems: "center",
        borderRadius: "8px",
    };

    
    const butst = {
        borderRadius: "10px 3px 3px 10px",
        color: "white",
        backgroundColor: "#14aff1",
        width: 230,
    };
    
    const st = {
        width: 200,
        color: "white",
        border: "1px solid #14aff1",
        borderRadius: "3px",
    };

    const ref = {
      fontSize: "30px",
      display: "flex",
      border: "1px solid #14aff1",
      color: "blue",
      width: 70,
};

  return (
    <div style={buttonarr}>
    <ButtonGroup variant="outlined" aria-label="outlined text button group">
       <Button style={butst} variant="outlined">PREDICT</Button>
       <Button style={st} variant="outlined">ANALYTICS VIEW</Button>
       <AdvSrch/>
    </ButtonGroup>
       
       <Button><Refresh style={ref}/></Button>  
    
    <Search/>
     
    <ButtonGroup variant="outlined" aria-label="outlined text button group">
      
       <Add/>
       <Edit enable={props.enable} edit={props.edit} selectedRow={props.selectedRow} handleChange={props.handleChange}/>
       <Delete selectedIndexes={props.selectedIndexes} selectedRow={props.selectedRow}/>
       
    </ButtonGroup> 
    </div>
  )
}

