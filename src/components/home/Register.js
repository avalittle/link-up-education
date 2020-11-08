import React, { useState } from "react";
import { Auth, API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { Button, useScrollTrigger } from "@material-ui/core";
import Dropdown from '../global/Dropdown'

const fakeSchools = ['Queens', 'Western'];

export default function Register(props) {
  const { onClose, open } = props;
  const history = useHistory();
  const [firstClick, setFirstClick] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleFirstNameChange = (e) => { setFirstName(e.target.value); };
  const handleLastNameChange = (e) => { setLastName(e.target.value); };
  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  const handlePasswordConfirmChange = (e) => { setPasswordConfirm(e.target.value); };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering new user!");
    let user = {
      firstName, 
      lastName, 
      email, 
      school, 
      program: "Engineering",
    };

    try {
      await Register({user});
    } catch (e) {
      console.log(e);
    }
    setFirstClick(false);
  };

  const Register = user => {
    const newUser = Auth.signUp({
      username: email,
      password: password,
    });

    console.log(newUser);

    // Create user in user table
    // return API.post("lab-partner", "/create-user", {
    //   body: useScrollTrigger,
    //   // requestContext: {
    //   //   identity: {
    //   //     cognitoIdentityId: 
    //   //   }
    //   // }
    // })
  }

  const confirmRegister = async (e) => {
    // e.preventDefault();
    // try {
    //   await Auth.confirmSignUp(email, fields.confirmationCode);
    //   await Auth.signIn(fields.email, fields.password);
  
    //   userHasAuthenticated(true);
    //   history.push("/");
    // } catch (e) {
    //   onError(e);
    //   setIsLoading(false);
    // }
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Register</DialogTitle>
      <List className="inputs">
        <ListItem>
          <TextField
            id="standard-basic"
            label="First Name"
            onChange={handleFirstNameChange}
            value={firstName}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Last Name"
            onChange={handleLastNameChange}
            value={lastName}
          />
        </ListItem>
        <ListItem>
          <Dropdown data={fakeSchools} prompt={"Select a School"} handleChange={setSchool} />
        </ListItem>
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
          <TextField
            id="standard-basic"
            label="Password Confirm"
            onChange={handlePasswordConfirmChange}
            value={passwordConfirm}
            type="password"
          />
        </ListItem>
        <ListItem>
          { firstClick ? 
            <Button onClick={handleRegister}>Register</Button>
            :
            <Button onClick={confirmRegister}>Confirm</Button>
          }
        </ListItem>
      </List>
    </Dialog>
  );
}
