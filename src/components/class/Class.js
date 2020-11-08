import React, { useState, useEffect } from 'react';


import { Button } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import UserList from './Userlist';
import CreatePost from './CreatePost';

const fakeUsers = [
    {
        name: "Ava Little", 
        description: "Hi everyone, I am looking for a lab partner for lab 2. ..etc.", 
        assignment: "Lab 2",
    },
    {
        name: "John Smith", 
        description: "Partners?", 
        assignment: "Lab 2",
    }
]

export default function Class() {
    const { id } = useParams();
    const [createAdOpen, setCreateAdOpen] = useState(false);
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

    const handleClose = () => {
        setCreateAdOpen(false);
    }
    
    const handleAdCreate = () => {
        setCreateAdOpen(true);
    }

    return (
        <div className='course-page'>
            {/* Title */}
            <div>
                <h1>{id.toUpperCase()}</h1>
            </div>
            <Button onClick={handleAdCreate}>Create Ad</Button>
            {/* Filters */}
            <div style={{ width: '100%' }}>
            </div>
            <div>
                 { students.length > 0 &&  
                    <UserList users={fakeUsers} /> 
                 }
            </div> 
            <CreatePost class={id} open={createAdOpen} onClose={handleClose}/>
        </div >
    )
} 