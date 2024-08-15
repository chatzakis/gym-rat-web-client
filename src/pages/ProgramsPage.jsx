import { React, useState, useEffect } from "react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import ProgramCard from "../components/ProgramCard";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import getApiUrl from "../components/ApiClient";

function ProgramsPage() {
    const apiUrl = getApiUrl();

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.post(apiUrl + 'programs', null, { withCredentials: true })
            .then(response => {
                setPrograms(response.data.programs);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function createProgramCard(program) {
        return (<ProgramCard
            key={program.id}
            id={program.id}
            userId={program.useid}
            name={program.name}
            description={program.description}
            goal={program.goal}
            durationInMinutes={program.durationinminutes}
            difficulty={program.difficulty}
            count={program.pcount}
        />);
    }

    return (
        <>
            <Heading></Heading>
            <section id="programs-page">
                <div className="page-content-wrapper">
                    <PageTitle title="Gym Programs"/>
                    <div className="entries-container grid-3">
                        {programs.map(createProgramCard)}
                    </div>
                    {programs.length === 0 && 
                    <p className="instructions text-center text-light">No programs found.</p>}
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default ProgramsPage;