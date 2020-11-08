import React, { useState } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import "../../styles/login.css";
import { Button } from "@material-ui/core";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function LoginPopup(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = e => { setEmail(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); }

  const handleLogin = () => {
    console.log("Loggin in!");
    console.log(email);
    console.log(password);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Login</DialogTitle>
      <List className="inputs">
        <ListItem>
          <TextField 
            id="standard-basic" 
            label="Email" 
            onChange={handleEmailChange}
            value={email}
          />
        </ListItem>
        <ListItem>
        <TextField 
            id="standard-basic" 
            label="Password" 
            onChange={handlePasswordChange}
            value={password}
          />
        </ListItem>
        <ListItem>
          <Button onClick={handleLogin}>Login</Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
