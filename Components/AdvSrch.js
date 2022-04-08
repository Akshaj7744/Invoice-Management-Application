import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, Box,
  DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core'

export default function AdvSrch() {
const classes = useStyles();
const [open, setOpen] = useState(false);

const butstyle = {
    width: 230,
    display: "flex",
    color: "white",
    border: "1px solid #14aff1",
    alignItems: "center",
    borderRadius: "3px 10px 10px 3px",
    textTransform: "none",
};

const tfStyles = {
    marginBottom: "5%",
    marginTop: "5%",
    display: "flex",
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    width: 230,
    color: "white",
    size: "medium",
};

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleReset = () => {
    setOpen(true);
};

 return (
    <div>
      <Button style={butstyle} 
            variant="outlined" 
            onClick={handleClickOpen}>ADVANCE SEARCH</Button>
          <Dialog
            PaperProps={{
            style: {
            width: "35%",
            padding: "8px 20px 2px 20px",
            backgroundColor: '#283a46',
            boxShadow: 'none',
              },
             }}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md">

          <DialogTitle id="customized-dialog-title" className={classes.text}>
            Advance Search
          </DialogTitle>
          <DialogContent dividers>
          <Box noValidate autoComplete="off">
           <Grid container spacing={3}>
              <Grid item xs={6}>
              <TextField style={tfStyles} name="doc_id"
                         color="text" label="Document ID" variant="filled"/>
              </Grid>
              <Grid item xs={6}>
              <TextField style={tfStyles} name="invoice_id"
                         color="text" label="Invoice Id" variant="filled"/>
              </Grid>
              <Grid item xs={6}>
              <TextField style={tfStyles} name="cust_number"
                         color="text" label="Customer Number" variant="filled"/>
              </Grid> 
              <Grid item xs={6}>
              <TextField style={tfStyles} name="buisness_year"
                         color="text" label="Business Year" variant="filled"/>
              </Grid> 
            </Grid>
            </Box>
           </DialogContent>

           <DialogActions>
             <Button
               className={classes.btn}
                onClick={handleReset}>
                SEARCH
             </Button>
             <Button
               className={classes.btn}
                onClick={handleClose}>
                CANCEL
             </Button>
           </DialogActions>
          </Dialog>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#283A46",
    padding: "1% 25%",
    borderRadius: "8px",
    marginBottom: "1%",
    color: "white",
    width: 100,
    textTransform: "none",
    textAlign: "center",
    border: "1px solid white",
  },

  text: {
      color: "white",
      fontSize: 23,
  }
}));

