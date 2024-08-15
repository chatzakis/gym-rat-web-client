import React from 'react';
import '../styles/ExerciseCard.css';
import { Link } from 'react-router-dom';


export default function ExerciseCard(props) {
    const link = "/entries?id=" + props.id + "&name=" + props.name;

    return (
        <section className='exercise-card m-1'>
            <Link to={link}>
                <div className="d-flex flex-colomn flex-wrap align-items-center position-relative">
                    <img className="exercise-img" src={props.img} alt={props.name}></img>
                    <div className="align-self-center px-3 py-2">
                        <h2 className='exersice-name m-0'>{props.name}</h2>
                        <p className='muscle-group m-0'>{props.muscleGroup}</p>
                    </div>
                </div>
            </Link>
        </section>
    );
}
