import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import { Link  } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EntryCard from "../components/EntryCard";
import PageTitle from "../components/PageTitle";
import Accordion from "../components/Accordion";
import axios from "axios";
import getApiUrl from "../components/ApiClient";

function EntriesPage() {
    const apiUrl = getApiUrl();

    const [entries, setEntries] = useState([]);
    const [exercise, setExercise] = useState([]);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    const exerciseName = params.get('name');
    const exerciseId = params.get('id');

    useEffect(() => {
        const data = { "userId": localStorage.getItem("_uid"), "exerciseId": exerciseId}
        axios.post(apiUrl + 'entries', data, { withCredentials: true })
            .then(response => {
                setEntries(response.data.entries);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const data = {"id": exerciseId}
        axios.post(apiUrl + 'exercise', data, { withCredentials: true })
            .then(response => {
                setExercise(response.data.exercise);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
    const title = exerciseName + " entries";

    function createEntryCard(entries) {
        return (<EntryCard
            key={entries.id}
            id={entries.id}
            date={entries.date}
            weight={entries.weight}
            reps={entries.reps}
            sets={entries.sets}
            duration={entries.duration}
            pace={entries.pace}
            restTime={entries.rest}
            comments={entries.comments}
            exerciseId={exerciseId}
            exerciseName={exerciseName}
        />);
    }

    const newEntryLink = '/entry?exerciseId=' + exerciseId + '&exerciseName=' + exerciseName;

    return (
        <>
            <Heading></Heading>
            <section id="exercises-page">
                <div className="page-content-wrapper">
                    <PageTitle title={title}/>
                    <Accordion title={exerciseName + ' Description'} text={exercise.description} image={'../exercises-images/'+ exercise.photo + '.jpg'}/>
                    <div className="entries-container grid-3">
                        {entries.map(createEntryCard)}
                    </div>
                    {entries.length === 0 && 
                    <p className="instructions text-center text-light fs-4">
                        No entries found. Press the <strong>plus button (+)</strong> to add a new {exerciseName} entry.
                    </p>}
                    <div className="fab">
                        <Fab color="primary" aria-label="add">
                            <Link to={newEntryLink}><AddIcon /></Link> 
                        </Fab>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default EntriesPage;