import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import {useLocation } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import SubCatButton from "../components/SubCatButton";
import PageTitle from "../components/PageTitle";
import MuscleGroupTitle, {getSubGroups}  from "../components/MuscleGroups";
import axios from "axios";
import getApiUrl from "../components/ApiClient";

function ExercisesPage() {
    const apiUrl = getApiUrl();
    const location = useLocation();
    const [exercises, setExercises] = useState([]);
    const [exercisesDisplayed, setExercisesDisplayed] = useState([]);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let mgString = params.get('mg');

    const [mg, setMg] = useState(mgString);

    const muscleGroupTitle = MuscleGroupTitle(mg);
    const title = muscleGroupTitle + " exercises";
    
    const data = { "mg": mg }

    useEffect(() => {
        axios.post(apiUrl + 'exercises', data, { withCredentials: true })
            .then(response => {
                setExercises(response.data.exercises);
                setExercisesDisplayed(response.data.exercises)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        search = window.location.search;
        params = new URLSearchParams(search);
        mgString = params.get('mg');
        setMg(mgString)
        filterExercises(mgString);
    }, [location]);

    function filterExercises(mg){
        if (Number(mg) % 10 === 0){
            setExercisesDisplayed(exercises)
        }else{
            setExercisesDisplayed(exercises.filter(x => (x.musclegroup == Number(mg))));
        }
     
    }

    const subMuscleGroups = getSubGroups(mg)

    function createSubCatButton(subMuscleGroups) {
        return (<SubCatButton
            key={subMuscleGroups.id}
            id={subMuscleGroups.id}
            name={subMuscleGroups.name}
            img={"/muscle-groups-images/"+subMuscleGroups.img+".png"}
        />);
    }

    function createExerciseCard(exercises) {
        return (<ExerciseCard
            key={exercises.id}
            id={exercises.id}
            name={exercises.name}
            description={exercises.description}
            muscleGroup={MuscleGroupTitle(exercises.musclegroup)}
            img={"/exercises-images/"+exercises.photo+".jpg"}
        />);
    }

    return (
        <>
            <Heading></Heading>

            <section id="exercises-page">
                <div className="page-content-wrapper">
                    <PageTitle title={title}/>
                    <div className="d-flex flex-row flex-wrap justify-content-evenly mb-4">
                        {subMuscleGroups.map(createSubCatButton)}
                    </div>
                    <div className="exercise-container grid-4">
                        {exercisesDisplayed.map(createExerciseCard)}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default ExercisesPage;