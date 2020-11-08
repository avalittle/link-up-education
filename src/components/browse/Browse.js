import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';

import '../../styles/browse.css';
import Dropdown from '../global/Dropdown';
import Textfield from '../global/Textfield'
const fakeClasses = [
    {
        title: "ELEC278",
        description: "Data Structures"
    },
    {
        title: "ELEC221",
        description: "Circuits",
    },
];

const fakeDepartments = ['Engineering', 'School of Computing', 'Biology', 'Chemistry'];

export default function Browse() {
    const [classes, setClasses] = useState(fakeClasses);
    const [department, setDepartment] = useState('')

    const handleDropdown = (value) => {
        setDepartment(value);
        // setClasses(getFilteredClasses(value))
    }

    return (
        <div className='browse-container'>
            {/* Title */}
            <div>
                <h1>Classlist Browser</h1>
            </div>
            {/* Filters */}
            <div style={{width:'100%'}}>
                {/* Department Dropdown */}
                <Dropdown data={fakeDepartments} prompt={"Select a Department"}/>
                {/* Course Number Input */}
                <Textfield prompt={"Enter a Course Code"}></Textfield>
            </div>
            {/* Display All Classes */}
            <div>
                <CourseList classes={classes} />
            </div>
        </div>
    )
}
