import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { displayDifficulty } from '../components/ProgramCard'
import "../styles/ProgramPage.css"
import Accordion from "../components/Accordion";
import ExerciseCard from "../components/ExerciseCard";
import MuscleGroupTitle  from "../components/MuscleGroups";
import getApiUrl from "../components/ApiClient";

function ProgramPage() {
    const apiUrl = getApiUrl();

    const [program, setProgram] = useState();
    const [exercises, setExercises] = useState([]);

    let search = window.location.search;
    let params = new URLSearchParams(search);
    const programName = params.get('programName');
    const programId = params.get('id');    

    const data = { "id": programId }

    useEffect(() => {
        axios.post(apiUrl + 'program', data, { withCredentials: true })
            .then(response => {
                setProgram(response.data.program);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    useEffect(() => {
        axios.post(apiUrl + 'program-exercises', data, { withCredentials: true })
            .then(response => {
                setExercises(response.data.exercises);
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
            img={"/exercises-images/"+exercises.photo+".jpg"}
        />);
    }

    if(exercises === undefined || program === undefined)
        return <h1 className="text-light">Loading...</h1>
    

    return (
        <>
            <Heading></Heading>
            <section id="program-page">
                <div className="page-content-wrapper">
                    <PageTitle title={programName + " program"} />
                    <div className="info d-flex flex-wrap align-items-center justify-content-between fs-5">
                        <div className="count px-3 my-2">
                            <img src='/icons/exerciseCount.png'></img> {program.pcount}
                        </div>
                        <div className="duration px-3 my-2">
                            <img src='/icons/clock.png'></img> {program.durationinminutes}m
                        </div>
                        <div className="difficulty px-3 my-2">
                            {displayDifficulty(program.difficulty)}
                        </div>
                        {program.goal !== undefined && program.goal.length !== 0 &&
                            <div className="goal px-3 my-2">
                                <img className='goal' src='/icons/whiteGoal.png'></img> {program.goal}
                            </div>}
                    </div>

                    {program.description !== undefined && program.description.length !== 0 &&
                        <Accordion title="Description" text={program.description} image='' />}

                    <div className="exercise-container grid-4">
                        {exercises.map(createExerciseCard)}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default ProgramPage;