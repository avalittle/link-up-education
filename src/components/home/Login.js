import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { useAppContext } from '../../libs/contextLib';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import "../../styles/login.css";
<<<<<<< HEAD
=======
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
>>>>>>> 1993a5d6dc768b27db7a6afc93f56c6f88b35132

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function Login(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const handleClose = () => {
    onClose();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = e => { setEmail(e.target.value); };
  const handlePasswordChange = e => { setPassword(e.target.value); }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/browse');
    } catch (e) {
      alert(e.message);
    }
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
            type="password"
          />
        </ListItem>
        <ListItem>
          <Button onClick={handleLogin}>Login</Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
