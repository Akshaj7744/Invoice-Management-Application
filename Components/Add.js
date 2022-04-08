import React,{useState} from 'react'
import { Button, TextField, Dialog, DialogActions, Box,
         DialogContent, DialogTitle, Grid, makeStyles } from '@material-ui/core'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from 'axios';

export default function Add(props) {
  
  const butstyle = {
    width: 230,
    display: "flex",
    color: "white",
    border: "1px solid #14aff1",
    alignItems: "center",
    borderRadius: "6px 3px 3px 6px",
    textTransform: "none",
  };

  const tfStyles = {
    marginBottom: "8%",
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    width: 350,
    color: "white",
    size: "medium",
  };
  
  const defvalue = {
    business_code: "",
    cust_number: "",
    buisness_year: "",
    doc_id: "",
    invoice_currency: "",
    document_type: "",
    posting_id: "",
    total_open_amount: "",
    cust_payment_terms: "",
    invoice_id: "",       
  };
  
  const [addvalue, setaddValue] = useState(defvalue);

  const [open, setOpen] = useState(false);
  const [clearDate, setclearDate] = useState(new Date());
  const [postDate, setpostDate] = useState(new Date());
  const [docDate, setdocDate] = useState(new Date());
  const [dueDate, setdueDate] = useState(new Date());
  const [baselineDate, setbaselineDate] = useState(new Date());
  const classes = useStyles();

  const format = (date) => date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, 0) 
             + "-" + date.getDate().toString().padStart(2, 0);

  const dates = {
    clearDate: format(clearDate),
    postDate: format(postDate),
    docDate: format(docDate),
    dueDate: format(dueDate),   
    baselineDate: format(baselineDate),
  };

  let {business_code, cust_number, buisness_year, doc_id, invoice_currency, document_type, posting_id, total_open_amount, cust_payment_terms, invoice_id} = addvalue;

  const handleChange = (event) => {
      let {name, value} = event.target;
      setaddValue({...addvalue, [name]: value})
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const params = new URLSearchParams([['business_code',business_code],['cust_number',cust_number]])

  const handleSubmit = (e) => {
    setOpen(false);
    e.preventDefault()
        axios.post("http://localhost:8080/WinInt/Add",
        {}, 
        console.log({...addvalue, ...dates}),
        {
          params,
        }
  )};

  return (
    <div>
       <Button style={butstyle} variant="outlined" 
               onClick={handleClickOpen}>ADD</Button>
        
        <Dialog
         PaperProps={{
          style: {
            padding: "8px 20px 2px 20px",
            backgroundColor: '#283a46',
            boxShadow: 'none',
          },
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl">
          
          <DialogTitle color="#FFFFFF" 
                       id="customized-dialog-title"
                       className={classes.text}>
            Add
          </DialogTitle>
          <DialogContent dividers>
            <Box noValidate component="form">
              <Grid container spacing={4}>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="business_code" onChange={handleChange}
                      value={business_code} label="Business Code" variant="filled"/>s
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="cust_number" onChange={handleChange}
                      value={cust_number} label="Customer Number" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker 
                      value={clearDate}
                      onChange={(date) => {
                        setclearDate(date);
                      }}
                      renderInput={(props) => (
                         <TextField {...props} style={tfStyles} variant="filled" label="Clear Date" />
                        )}
                   />
              </LocalizationProvider>   
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="buisness_year" onChange={handleChange}
                         value={buisness_year} label="Business Year" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="doc_id" onChange={handleChange}
                         value={doc_id} label="Document Id" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker 
                      value={postDate}
                      onChange={(date) => {
                        setpostDate(date);
                      }}
                      renderInput={(props) => (
                         <TextField {...props} style={tfStyles} variant="filled" label="Posting Date" />
                        )}
                   />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker 
                      value={docDate}
                      onChange={(date) => {
                        setdocDate(date);
                      }}
                      renderInput={(props) => (
                         <TextField {...props} style={tfStyles} variant="filled" label="Document Create Date"/>
                        )}
                   />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker 
                      value={dueDate}
                      onChange={(date) => {
                        setdueDate(date);
                      }}
                      renderInput={(props) => (
                         <TextField {...props} style={tfStyles} variant="filled" label="Due Date"/>
                        )}
                   />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="invoice_currency" onChange={handleChange}
                         value={invoice_currency} label="Invoice Currency" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="document_type" onChange={handleChange}
                         value={document_type} label="Document Type" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="posting_id" onChange={handleChange}
                         value={posting_id} label="Posting Id" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="total_open_amount" onChange={handleChange}
                         value={total_open_amount} label="Total Open Amount" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker 
                      value={baselineDate}
                      onChange={(date) => {
                        setbaselineDate(date);
                      }}
                      renderInput={(props) => (
                         <TextField {...props} style={tfStyles} variant="filled" label="Baseline Create Date"/>
                        )}
                   />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="cust_payment_terms" onChange={handleChange}
                         value={cust_payment_terms} label="Customer Payment Terms" variant="filled"/>
              </Grid>
              <Grid item xs={3}>
              <TextField style={tfStyles} name="invoice_id" onChange={handleChange}
                         value={invoice_id} label="Invoice Id" variant="filled"/>
              </Grid>
            </Grid> 
            </Box>
          </DialogContent>   
        <DialogActions>
          <Button
            className={classes.btn}
            onClick={handleSubmit}>
            ADD
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
    padding: "0.5% 25%",
    spacing: "2%",
    borderRadius: "8px",
    color: "white",
    textTransform: "none",
    textAlign: "center",
    border: "1px solid white",
  },

  text: {
    color: "white",
    fontSize: 23,
}
}));




