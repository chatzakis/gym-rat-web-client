import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import EntryCard from "../components/EntryCard";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import getApiUrl from "../components/ApiClient";

function LastEntriesPage() {
    const apiUrl = getApiUrl();

    const [entries, setEntries] = useState([]);

    useEffect(() => {    
        const data = { "userId": localStorage.getItem("_uid")}
        axios.post(apiUrl + 'last-entries', data, { withCredentials: true })
            .then(response => {
                setEntries(response.data.entries);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
            exerciseId={entries.exerciseid}
            exerciseName={entries.name}
        />);
    }

    return (
        <>
            <Heading></Heading>
            <section id="last-enties-page">
                <div className="page-content-wrapper">
                    <PageTitle title="Last entries"/>
                    <div className="grid-3">
                        {entries.map(createEntryCard)}
                    </div>
                    {entries.length === 0 && <p className="instructions text-center">No entries found. Find an exercise to add a new entry.</p>}
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default LastEntriesPage;