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

import '../../styles/matches.css'
import Matcheslist from './matcheslist';
import matchescard from './matchescard';

const fakeMatches = [
    {
        name: "Chris Gauthier",
        assignment: "Lab 2",
        course: "ELEC278",
        email: "christophe.gauthier@queensu.ca"
    },
    {
        name: "John Smith",
        assignment: "Lab 2",
        course: "ELEC326",
        email: "john.smith@queensu.ca"
    }
]
const fakePendingMatches = [
    {
        name: "Sydney Lahey",
        assignment: "Mod 1",
        course: "APSC100",
    },
    {
        name: "Sarah Johnson",
        assignment: "Lab 2",
        course: "ELEC371",
    }
]
const fakeMatchRequests = [
    {
        name: "Julia Lowe",
        assignment: "Assignment 2",
        course: "ELEC326",
    },
    {
        name: "Liam Thomas",
        assignment: "Lab 3",
        course: "ELEC278",
    }
]


export default function Matches() {
    // const { id } = useParams();
    const [students, setStudents] = useState(fakeMatches);

    const handleAdCreate = (e) => {
        //open ad menu
    }

    return (
        <div>
            <div className='match-container'>
                <div>
                    <h1>Confirmed Matches</h1>
                </div>
                {/* Filters */}
                <div style={{ width: '100%' }}>
                </div>
                {<div>
                    {students.length > 0 &&
                        <Matcheslist matches={fakeMatches} />
                    }
                </div>}
            </div>
            <div className='match-container'>
                <div>
                    <h1>Match Requests</h1>
                    <p>These are people that have requested to match with you.</p>
                </div>
                {/* Filters */}
                <div style={{ width: '100%' }}>
                </div>
                {<div>
                    {students.length > 0 &&
                        <Matcheslist matches={fakeMatchRequests} />
                    }
                </div>}
            </div>
            <div className='match-container'>
                <div>
                    <h1>Pending Matches</h1>
                    <p>These are people you have requested to match with.</p>
                </div>
                {/* Filters */}
                <div style={{ width: '100%' }}>
                </div>
                {<div>
                    {students.length > 0 &&
                        <Matcheslist matches={fakePendingMatches} />
                    }
                </div>}
            </div>
        </div>
    )
} 