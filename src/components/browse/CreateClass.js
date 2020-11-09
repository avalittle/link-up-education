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

export default function CreateClass(props) {
  const { course, onClose, open } = props;
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const handleClose = () => {
    onClose();
  };

  const [code, setCode] = useState(course);
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState('');
  const handleCodeChange = e => { setCode(e.target.value); };
  const handleNameChange = e => { setName(e.target.value); }
  const handleFacultyChange = e => { setFaculty(e.target.value); }

  const handleNewCourse = async (e) => {
    e.preventDefault();
    createCourse({
        classId: code,
        name: name,
        faculty: faculty,
    })
    window.alert('Success! Thank you for adding a new course')
    onClose();
    history.push(`/class/${code}`)
  }

  function createCourse(course){
      return API.post("lab-partner", "/create-class", {
          body: course
      })
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Create Class </DialogTitle>
      <List className="inputs">
        <ListItem>
          <TextField
            id="standard-basic"
            label="Course Code"
            onChange={handleCodeChange}
            value={code}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Faculty"
            onChange={handleFacultyChange}
            value={faculty}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Course Name"
            onChange={handleNameChange}
            value={name}
          />
        </ListItem>
        <ListItem>
          <Button onClick={handleNewCourse}>Submit</Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
