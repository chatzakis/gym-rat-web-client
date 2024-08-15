import React from 'react';
import '../styles/SubCatButton.css';
import { Link } from 'react-router-dom';


export default function SubCatButton(props) {
    const link = "/exercises?mg=" + props.id;

    return (
        <Link to={link} className='btn btn-outline-secondary sub-card m-1'>
            <div className="container">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img className="exercise-img" src={props.img} alt={props.name}></img>
                    <h2 className='exersice-name fs-5 mb-0'>{props.name}</h2>
                </div>
            </div>
        </Link>
    );
}
