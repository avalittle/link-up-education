import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import CourseList from './CourseList';

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import '../../styles/browse.css';
import Dropdown from '../global/Dropdown';
import CreateClass from './CreateClass';

export default function Browse() {
    const [loaded, setLoaded] = useState(false);
    const [classes, setClasses] = useState([]);
    const [faculties, setFaculties] = useState([]);
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

        function loadFaculties(){
            return API.get("lab-partner", '/classes/get-faculties');
        }

        async function onLoad(){
            try {
                const classes = await loadCourses();
                setClasses(classes);
                const facultyList = await loadFaculties();
                setFaculties(['None', ...facultyList]);
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
            if (department === 'None') {
                onLoad();
            } else {
                onDepartment(department);
            }
        } else if (!loaded) {
            onLoad();
            setLoaded(true);
        }
    }, [loaded, department])

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
            <div style={{ width: '30%', margin: 'auto', textAlign: 'center'}}>
                {/* Department Dropdown */}
                <Dropdown handleChange={setDepartment} data={faculties} prompt={"Select a Department"} />
                <br></br>
                
                {/* Course Number Input */}
                <TextField style={{width: '40%'}} onChange={handleCourseCode} value={courseCode} placeholder="Course Code"></TextField>
                <br></br>
                <br></br>

                <Button variant="outlined" onClick={handleSearch}>Search</Button>
            </div>
            {/* Display All Classes */}
            <div style={{paddingTop: '50px', margin: 'auto', textAlign: 'center'}}>
                {classes.length > 0 ?
                    <CourseList classes={classes} />
                    :
                    <div style={{textAlign: 'center', margin: 'auto'}}>
                        <h3>Looks like there aren't any classes that meet the critera</h3>
                        <Button variant="outlined" onClick={handleNewCourse}>Add A Course</Button>
                    </div>
                }
            </div>
            <CreateClass course={courseCode} open={open} onClose={handleClose}/>
        </div >
    )
}
