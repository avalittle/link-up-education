import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import '../../styles/browse.css';
import Dropdown from '../global/Dropdown';
import Textfield from '../global/Textfield'
const fakeClasses = [];/*[
    {
        title: "ELEC278",
        description: "Data Structures"
    },
    {
        title: "ELEC221",
        description: "Circuits",
    },
];*/

const fakeDepartments = ['Engineering', 'School of Computing', 'Biology', 'Chemistry'];

export default function Browse() {
    const [classes, setClasses] = useState(fakeClasses);
    const [department, setDepartment] = useState('')
    const [courseCode, setCourseCode] = useState('');

    useEffect(() => {
        // Get filtered classes




    }, [department, courseCode])

    const handleDropdown = (value) => {
        setDepartment(value);
        // setClasses(getFilteredClasses(value))
    }
    const handleCourseCode = (e) => {
        setCourseCode(e.target.value);
    }

    return (
        <div className='browse-container'>
            {/* Title */}
            <div>
                <h1>Classlist Browser</h1>
            </div>
            {/* Filters */}
            <div style={{ width: '100%' }}>
                {/* Department Dropdown */}
                {/* <Dropdown data={fakeDepartments} prompt={"Select a Department"} /> */}
                {/* Course Number Input */}
                {/* <Textfield prompt={"Enter a Course Code"}></Textfield> */}
            </div>
            {/* Display All Classes */}
            <div>
                {classes.length > 0 ?
                    <CourseList classes={classes} />
                    :
                    <>
                        <DialogTitle id="simple-dialog-title"></DialogTitle>
                        <List className="inputs">
                            <ListItem>
                                <TextField
                                    couseCode="standard-basic"
                                    label="Enter Course Code"
                                    onChange={handleCourseCode}
                                    value={courseCode}
                                />
                            </ListItem>
                            <ListItem>
                                <Button onClick={handleCourseCode}>Search</Button>
                            </ListItem> 
                        </List>
                    </>
                }
            </div>
        </div >
    )
}
