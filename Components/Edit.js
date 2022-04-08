import React, {useState} from 'react'
import { Button, TextField, Dialog, DialogActions, Box,
         DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';


export default function Edit(props) {
const classes = useStyles();
const [open, setOpen] = useState(false);

const butstyle = {
    width: 230,
    color: "white",
    borderRadius: "4px",
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
    console.log({invoice_currency: props.edit.invoice_currency, cust_payment_terms: props.edit.cust_payment_terms});
};

const handleClose = () => {
    setOpen(false);
};

const handleReset = (e) => {
    setOpen(false);
    //console.log({invoice_currency: props.edit.invoice_currency, cust_payment_terms: props.edit.cust_payment_terms});
    e.preventDefault();
    axios.post("http://localhost:8080/WinInt/Edit",
      {},
      {
         params: { sl_no: props.selectedRow, invoice_currency: props.edit.invoice_currency, cust_payment_terms: props.edit.cust_payment_terms }
  })
};

return (
       <div>
          <Button style={butstyle} 
            variant="outlined" 
            color="primary"
            size="medium" 
            onClick={handleClickOpen} 
            disabled={props.enable}>EDIT</Button>
          
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
            Edit
          </DialogTitle>
          <DialogContent dividers>
          <Box noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={6}>
              <TextField style={tfStyles} name="invoice_currency" onChange={props.handleChange}
                         value={props.edit.invoice_currency} label="Invoice Currency" variant="filled"/>
              </Grid>
              <Grid item xs={6}>
              <Box noValidate autoComplete="off">
              <TextField style={tfStyles} name="cust_payment_terms" onChange={props.handleChange}
                         value={props.edit.cust_payment_terms} label="Customer Payment Terms" variant="filled"/>
              </Box>
              </Grid>
            </Grid>
            </Box>
           </DialogContent>

           <DialogActions>
             <Button
               className={classes.btn}
                onClick={handleReset}>
                EDIT
             </Button>
             <Button
               className={classes.btn}
                onClick={handleClose}>
                CANCEL
             </Button>
           </DialogActions>
          </Dialog>
    </div>
  );
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
