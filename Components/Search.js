import React, { useState } from 'react'
import { TextField } from '@material-ui/core';

export default function Search() {

const [filter, setFilter] = useState();

const commonStyles = {
    display: "flex",
    borderRadius: '8px',
    marginLeft: "30px",
    marginRight: "10px",
    width: 200,
    backgroundColor: 'white',
}; 

const handleChange = (event) => {
      setFilter(event.target.value);
      console.log(event.target.value);
};

return (
    <div>
      <TextField style={commonStyles} id="outlined-basic" onChange={handleChange}
      size="small" label="Search Customer ID" variant="filled"/>
    </div>
  )
}
