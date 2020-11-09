import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API, Auth } from "aws-amplify";
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

export default function CreatePost(props) {
  const { course, onClose, open } = props;
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const handleClose = () => {
    onClose();
  };

  const [name, setName] = useState('');
  const [assignment, setAssignment] = useState('');
  const [description, setDescription] = useState('');
  const handleNameChange = e => { setName(e.target.value); };
  const handleDescriptionChange = e => { setDescription(e.target.value); }
  const handleAssignmentChange = e => { setAssignment(e.target.value); }

  const handleNewCourse = async (e) => {
    e.preventDefault();
    let body = {
      'post': {
        name,
        assignment,
        description
      }
    }
  
  createPost(body);
  onClose();
  history.go(0);
}

function createPost(body) {
  console.log(course);
  return API.put("lab-partner", `/classes/${course}`, {
    body: body
  })
}

return (
  <Dialog
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
    open={open}
  >
    <DialogTitle id="simple-dialog-title">Post Ad</DialogTitle>
    <List className="inputs">
      <ListItem>
        <TextField
          id="standard-basic"
          label="Name"
          onChange={handleNameChange}
          value={name}
        />
      </ListItem>
      <ListItem>
        <TextField
          id="standard-basic"
          label="Assignment"
          onChange={handleAssignmentChange}
          value={assignment}
        />
      </ListItem>
      <ListItem>
        <TextField
          id="standard-basic"
          label="Description"
          onChange={handleDescriptionChange}
          value={description}
        />
      </ListItem>
      <ListItem>
        <Button onClick={handleNewCourse}>Post Ad</Button>
      </ListItem>
    </List>
  </Dialog>
);
}
