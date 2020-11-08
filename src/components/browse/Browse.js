import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
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
import CreateClass from './CreateClass';
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
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Get filtered classes
        function loadNote(){
            return API.get("lab-partner", `/classes/${courseCode}`)
        }
        async function onLoad(){
            try {
                const note = loadNote();
            } catch(e) {
                console.log(e);
            }
        }
        onLoad();
    }, [department])

    const handleClose = () => { 
        setOpen(false);
    }

    const handleNewCourse = () => {
        setOpen(true);
    }
    const handleDropdown = (value) => {
        setDepartment(value);
        // setClasses(getFilteredClasses(value))
    }
    const handleCourseCode = (e) => {
        setCourseCode(e.target.value);
    }

    const handleSearch = async () => {
        const res = await API.get("lab-partner", `/classes/${courseCode}`)
            .catch(err => {
                console.log(err);
                setClasses([]);
            })
        console.log(res);
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
                    <Button onClick={handleNewCourse}>Add A Course!</Button>
                }
            </div>
            <CreateClass open={open} onClose={handleClose}/>
        </div >
    )
}
