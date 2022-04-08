import React from 'react'
import { Button, Dialog, DialogActions,
    DialogContent, DialogTitle, DialogContentText, makeStyles } from '@material-ui/core'
    import axios from 'axios';

export default function Delete(props) {
const classes = useStyles();
const [open, setOpen] = React.useState(false);  

const butstyle = {
    width: 230,
    display: "flex",
    color: "white",
    border: "1px solid #14aff1",
    alignItems: "center",
    borderRadius: "3px 6px 6px 3px",
    textTransform: "none",
};

const handleClickOpen = () => {
      setOpen(true);
};
  
const handleClose = () => {
      setOpen(false);
};

const params = new URLSearchParams([['selectedIndexes', props.selectedIndexes]])

const submit = (e) => {
    setOpen(false);
    e.preventDefault()
    axios.get('http://localhost:8080/WinInt/Delete',
    {
      params
    }
    )
};

return (
    <div>
       <Button style={butstyle} variant="outlined" 
               onClick={handleClickOpen}>DELETE</Button>
       <Dialog
          PaperProps={{
            style: {
            width: "35%",
            padding: "8px 20px 2px 20px",
            backgroundColor: '#283a46',
            boxShadow: 'none',
                },
              }}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title" className={classes.text}>
             {"Delete Records?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>  
               Are you sure you want to delete these record[s]?
            </DialogContentText>
          </DialogContent>
        
        <DialogActions>
             <Button
               className={classes.btn}
                onClick={handleClose}>
                CANCEL
             </Button>
             <Button
               className={classes.btn}
                onClick={submit}>
                DELETE
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
      color: "white",
      marginBottom: "2%",
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