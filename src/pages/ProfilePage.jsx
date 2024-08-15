import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import ExerciseCard from "../components/ExerciseCard";
import PageTitle from "../components/PageTitle";
import MuscleGroupTitle from "../components/MuscleGroups";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import "../styles/ProfilePage.css";
import getApiUrl from "../components/ApiClient";

function ProfilePage() {
    const auth = useAuth();
    const apiUrl = getApiUrl();

    const [totalEntries, setTotalEntries] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);

    const userId = localStorage.getItem("_uid");
    const email = localStorage.getItem("_email");
    const username = localStorage.getItem("_username");

    const data = { "id": userId }

    useEffect(() => {
        axios.post(apiUrl + 'favorites', data, { withCredentials: true })
            .then(response => {
                setExercises(response.data.exercises);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.post(apiUrl + 'total-entries', data, { withCredentials: true })
            .then(response => {
                setTotalEntries(response.data.count);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function createExerciseCard(exercises) {
        return (<ExerciseCard
            key={exercises.id}
            id={exercises.id}
            name={exercises.name}
            description={exercises.description}
            muscleGroup={MuscleGroupTitle(exercises.musclegroup)}
            img={"/exercises-images/" + exercises.photo + ".jpg"}
        />);
    }

    async function deleteUser() {
        setResponse("");
        try {
            const res = await axios.post(
                apiUrl + 'delete-user',
                data, { withCredentials: true }
            );
            setResponse(res.data);
        } catch (err) {
            console.log("Error: ", err);
            setResponse(err);
        }
        togglePopup;
        auth.logOut()
    }


    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    function Popup({ onClose }) {
        return (
            <div id="delete-entry-pop-up" className="popup">
                <span onClick={onClose} className="close" title="Close Modal">&times;</span>
                <form className="popup-content" onSubmit={deleteUser}>
                    <div className="text-center p-3">
                        <h2>Delete your profile?</h2>
                        <p>Are you sure you want to delete your profile? All your entries will be lost</p>
                        <div className="clearfix">
                            <button onClick={onClose} type="button" className="btn btn-lg btn-dark mx-3">Cancel</button>
                            <button type="submit" className="btn btn-lg btn-danger mx-3">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <>
            <Heading></Heading>

            <section id="profile-page">
                <div className="page-content-wrapper">
                    <PageTitle title="My Profile" />
                    <div className="profile-section container mb-5">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-4 px-1">
                                <img src="icon-web.png" alt="Profile Picture"></img>
                            </div>
                            <div className="col-8">
                                <h2 className="mb-1">{username}</h2>
                                <p className="mb-2">{email}</p>
                                <p className="mb-2"><strong>Total entries: {totalEntries}</strong></p>
                                <Link to="/last-entries"><button className="btn btn-sm btn-outline-secondary">Last entries</button></Link>
                                <button className="ms-2 btn btn-sm btn-outline-danger" onClick={togglePopup}>Delete user</button>
                            </div>
                        </div>
                    </div>
                    
                    <h2 className="text-center mb-3"><i className="fa-solid fa-heart"></i> Favorite exercises</h2>
                    <div className="exercise-container grid-4">
                        {exercises.map(createExerciseCard)}
                    </div>
                </div>
                {popupVisible && <Popup onClose={togglePopup} />}
            </section>
            <Footer/>
        </>
    );
}

export default ProfilePage;