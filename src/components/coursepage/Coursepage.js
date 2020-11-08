import React, { useState, useEffect } from 'react';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import UserList from './Userlist';
import Usercard from './Usercard';

const fakeUsers = [
    {
        name: "Ava Little", 
        description: "Hi everyone, I am looking for a lab partner for lab 2. ..etc.", 
        assignment: "Lab 2",
    }
]

export default function Coursepage() {
    const { id } = useParams();
    console.log(id);
    const [students, setStudents] = useState(fakeUsers);

    useEffect(() => {
        function getStudents(){
            // GET Request to API
            console.log("Making a request to our users database")
            // return API.get('lab-partner', `/users/${id}`)
        }
        async function onLoad(){
            console.log(`Loading users in class ${id}`);
            try {
                const loadedStudents = getStudents();
                // setStudents(loadedStudents);
            } catch (e) {
                console.log(e);
            }
        }
        onLoad();
    }, []);

    const handleAdCreate = (e) => {
        //open ad menu
    }

    return (
        <div className='course-page'>
            {/* Title */}
            <div>
                <h1>{id.toUpperCase()}</h1>
            </div>
            {/* Filters */}
            {/* <div style={{ width: '100%' }}>
            </div>
            <div>
                { students.length > 0 && 
                    <UserList students={fakeUsers} />
                }
                <Button onClick={handleAdCreate}>Create Ad</Button>
            </div> */}
        </div >
    )
}