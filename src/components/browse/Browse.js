import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';

import '../../styles/browse.css';

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
            <div>
                {/* Department Dropdown */}
                <div>Dropdown here</div>
                {/* Course Number Input */}
                <div>Input Course Number</div>
            </div>
            {/* Display All Classes */}
            <div>
                <CourseList classes={classes} />
            </div>
        </div>
    )
}
