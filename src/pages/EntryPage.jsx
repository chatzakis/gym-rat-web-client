import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import EntryFormRow from "../components/EntryFormRow";
import { formatDate } from "../components/EntryCard";
import PageTitle from "../components/PageTitle";
import { useFormik } from "formik";
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import getApiUrl from "../components/ApiClient";
import '../styles/EntryPage.css';

function EntryPage() {
    const apiUrl = getApiUrl();

    const [entry, setEntry] = useState({});
    const [response, setResponse] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    const entryId = params.get('id');
    const exerciseId = params.get('exerciseId');
    const exerciseName = params.get('exerciseName');

    if (entryId) {
        useEffect(() => {
            const data = { "id": entryId };
            axios.post(apiUrl + 'entry', data, { withCredentials: true })
                .then(response => {
                    if (response.data && response.data.entry) {
                        setEntry(response.data.entry);
                    } else {
                        console.error('No entry data found.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }, [entryId]);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: entryId,
            exerciseId: exerciseId,
            userId: localStorage.getItem("_uid"),
            weight: entry.weight || '',
            reps: entry.reps || '',
            sets: entry.sets || '',
            duration: entry.duration || '',
            pace: entry.pace || '',
            rest: entry.rest || '',
            comments: entry.comments || ''
        },
        onSubmit: async (values) => {
            setResponse("");
            try {
                const res = await axios.post(
                    submitUrl,
                    values, { withCredentials: true }
                );
                setResponse(res.data);
            } catch (err) {
                console.log("Error: ", err);
                setResponse(err);
            }
        }
    });

    async function deleteEntry() {
        const data = { "id": entryId };
        setResponse("");
        try {
            const res = await axios.post(
                apiUrl + "delete-entry",
                data, { withCredentials: true }
            );
            setResponse(res.data);
        } catch (err) {
            console.log("Error: ", err);
            setResponse(err);
        }
        togglePopup;
    }


    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    function Popup({ onClose }) {
        return (
            <div id="delete-entry-pop-up" className="popup">
                <span onClick={onClose} className="close" title="Close Modal">&times;</span>
                <form className="popup-content" onSubmit={deleteEntry}>
                    <div className="text-center p-3">
                        <h2>Delete Entry</h2>
                        <p>Are you sure you want to delete this entry from <strong>{formatDate(entry.date)}</strong>?</p>
                        <div className="clearfix">
                            <button onClick={onClose} type="button" className="btn btn-lg btn-dark mx-3">Cancel</button>
                            <button type="submit" className="btn btn-lg btn-danger mx-3">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    let titlePrefix = "";
    let submitUrl = apiUrl + "update-entry";
    let buttonText = "Update entry"
    if (!entry || !entry.date) {
        buttonText = "Add entry";
        titlePrefix = "New"
        submitUrl = apiUrl + "add-entry";
    } else {
        titlePrefix = formatDate(entry.date) + " | ";
    }

    const title = titlePrefix + " " + exerciseName + " entry";

    return (
        <>
            <Heading></Heading>
            <section id="entry-page">
                <div className="page-content-wrapper">
                    <PageTitle title={title}/>
                    <div className="d-flex justify-content-center">
                        <form className="entry-form" onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <EntryFormRow name='weight'>
                                    <input name='weight' type="text" className="form-control" id='weight' aria-describedby='weight-input'
                                        value={formik.values.weight} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='reps'>
                                    <input name='reps' type="text" className="form-control" id='reps' aria-describedby='reps-input'
                                        value={formik.values.reps} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='sets'>
                                    <input name='sets' type="text" className="form-control" id='sets' aria-describedby='sets-input'
                                        value={formik.values.sets} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='duration'>
                                    <input name='duration' type="text" className="form-control" id='duration' aria-describedby='duration-input'
                                        value={formik.values.duration} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='pace'>
                                    <input name='pace' type="text" className="form-control" id='pace' aria-describedby='pace-input'
                                        value={formik.values.pace} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='rest'>
                                    <input name='rest' type="text" className="form-control" id='rest' aria-describedby='rest-input'
                                        value={formik.values.rest} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                                <EntryFormRow name='comments'>
                                    <input name='comments' type="text" className="form-control" id='comments' aria-describedby='comments-input'
                                        value={formik.values.comments} onChange={formik.handleChange}></input>
                                </EntryFormRow>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">{buttonText}</button>
                            </div>
                            <p className="mt-3 submit-response text-center"><em>{response}</em></p>
                        </form>
                    </div>
                    {Object.keys(entry).length !== 0 && <div className="fab">
                        <Fab color="primary"
                            onClick={togglePopup}
                            aria-label="delete">
                            <DeleteIcon />
                        </Fab>
                    </div>}
                    {popupVisible && <Popup onClose={togglePopup} />}

                </div>
            </section>
            <Footer/>
        </>
    );
}



export default EntryPage;