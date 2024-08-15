import React from 'react';
import '../styles/EntryCard.css';
import { Link } from 'react-router-dom';

export function formatDate(date){
    let dateFormated = date.substring(0, 10);
    return dateFormated;
}

export default function EntryCard(props) {
    const link = "/entry?id=" + props.id + "&exerciseName=" + props.exerciseName + "&exerciseId=" + props.exerciseId;

    function checkLastEntries(){
        if(window.location.pathname.search("last-entries") !== -1)
            return true;
        return false;
    }

    function checkPropExists(str){
        if(str === "")
            return false;
        return true;
    }

    const exerciseLink = "/entries?id=" +  props.exerciseId + "&name=" + props.exerciseName; 
    
    return (
        <section className='entry-card m-1'>
            <Link to={link}>
                <table>
                    <thead>
                        {checkLastEntries() &&
                        <tr className='name-row'>
                            <td>Exercise</td>
                            <td><img src='/icons/exerciseCount.png'></img></td>
                            <td><Link to={exerciseLink}><h3>{props.exerciseName}</h3></Link></td>
                        </tr>}
                    </thead>
                    <tbody>
                        <tr className='date-row'>
                            <td>Date</td>
                            <td><img src='/icons/calendar.png'></img></td>
                            <td>{formatDate(props.date)}</td>
                        </tr>
                        {checkPropExists(props.weight) &&
                        <tr className='weight-row'>
                            <td >Weight</td>
                            <td><img src='/icons/weight.png'></img></td>
                            <td>{props.weight}</td>
                        </tr>}
                        {checkPropExists(props.reps) &&
                        <tr className='reps-row'>
                            <td >Reps</td>
                            <td><img src='/icons/reps.png'></img></td>
                            <td>{props.reps}</td>
                        </tr>}
                        {checkPropExists(props.sets) &&
                        <tr className='sets-row'>
                            <td >Sets</td>
                            <td><img src='/icons/sets.png'></img></td>
                            <td>{props.sets}</td>
                        </tr>}
                        {checkPropExists(props.duration) &&
                        <tr className='duration-row'>
                            <td >Duration</td>
                            <td><img src='/icons/duration.png'></img></td>
                            <td>{props.duration}</td>
                        </tr>}
                        {checkPropExists(props.pace) &&
                        <tr className='pace-row'>
                            <td >Pace</td>
                            <td><img src='/icons/pace.png'></img></td>
                            <td>{props.pace}</td>
                        </tr>}
                        {checkPropExists(props.restTime) &&
                        <tr className='restTime-row'>
                            <td >Rest</td>
                            <td><img src='/icons/rest.png'></img></td>
                            <td>{props.restTime}</td>
                        </tr>}
                        {checkPropExists(props.comments) &&
                        <tr className='comments-row'>
                            <td >Comments</td>
                            <td><img src='/icons/comments.png'></img></td>
                            <td>{props.comments}</td>
                        </tr>}
                    </tbody>
                </table>
            </Link>
        </section>
    );
}
