import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

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
    const [students, setStudents] = useState([]);

    useEffect(() => {
        function getCourse(){
            // GET Request to API
            console.log("Making a request to our users database")
            return API.get('lab-partner', `/classes/${id}`)
        }
        async function onLoad(){
            console.log(`Loading users in class ${id}`);
            try {
                const loadedStudents = await getCourse();
                if (!('posts' in loadedStudents)) {
                    console.log("No posts!");
                    setStudents([]);
                } else {
                    console.log("Posts exist");
                    console.log(loadedStudents.posts);
                    setStudents(loadedStudents.posts);
                }
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
                <h1>Class | {id.toUpperCase()}</h1>
            </div>
            <Button onClick={handleAdCreate}>Create New Post</Button>
            {/* Filters */}
            <div style={{ width: '100%' }}>
            </div>
            <div>
                 { students.length > 0 &&  
                    <UserList users={students} /> 
                 }
            </div> 
            <CreatePost course={id} open={createAdOpen} onClose={handleClose}/>
        </div >
    )
} 