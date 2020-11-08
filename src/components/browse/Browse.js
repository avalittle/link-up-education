import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import CourseList from './CourseList';

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import '../../styles/browse.css';
import Dropdown from '../global/Dropdown';
import CreateClass from './CreateClass';

const fakeDepartments = ['Engineering', 'School of Computing', 'Biology', 'Chemistry'];

export default function Browse() {
    const [classes, setClasses] = useState([]);
    const [department, setDepartment] = useState('')
    const [courseCode, setCourseCode] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Get filtered classes
        function loadCourses(){
            return API.get("lab-partner",  '/classes');
        }

        function loadDepartment(department){
            return API.get("lab-partner", `/classes/faculty/${department}`)
        }

        async function onLoad(){
            try {
                const classes = await loadCourses();
                setClasses(classes);
            } catch(e) {
                console.log(e);
            }
        }

        async function onDepartment(department){
            try {
                const classes = await loadDepartment(department);
                setClasses(classes);
            } catch (e) {
                console.log(e);
            }
        }

        console.log(department);
        if (department !== ''){
            onDepartment(department);
        } else {
            onLoad();
        }
    }, [department])

    const handleClose = () => { 
        setOpen(false);
    }

    const handleNewCourse = () => {
        setOpen(true);
    }

    const handleCourseCode = e => {
        setCourseCode(e.target.value);
    }

    const handleSearch = async () => {
        const res = await API.get("lab-partner", `/classes/${courseCode}`)
            .catch(err => {
                console.log(err);
                setClasses([]);
            })
        if (res){
            setClasses([res]);
        } else {
            setClasses([]);
        }
    }

    return (
        <div className='browse-container'>
            {/* Title */}
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <h1>Course Browser</h1>
            </div>
            {/* Filters */}
            <div style={{ width: '50%', margin: 'auto', textAlign: 'center'}}>
                {/* Department Dropdown */}
                <Dropdown handleChange={setDepartment} data={fakeDepartments} prompt={"Select a Department"} />
                {/* Course Number Input */}
                <TextField onChange={handleCourseCode} value={courseCode} placeholder="Course Code"></TextField>
                <br></br>
                <Button onClick={handleSearch}>Search</Button>
            </div>
            {/* Display All Classes */}
            <div>
                {classes.length > 0 ?
                    <CourseList classes={classes} />
                    :
                    <div>
                        <h5>Looks like that class isn't on here yet!</h5>
                        <Button onClick={handleNewCourse}>Add A Course!</Button>
                    </div>
                }
            </div>
            <CreateClass open={open} onClose={handleClose}/>
        </div >
    )
}
