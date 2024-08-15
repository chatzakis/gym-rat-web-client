import React, {useEffect} from 'react';
import '../styles/ProgramCard.css';
import { Link } from 'react-router-dom';

export default function ProgramsCard(props) {
    const link = "/program?id=" + props.id + "&programName=" + props.name;

    return (
        <section className='program-card m-1'>
            <Link to={link}>
                <table>
                    <thead>
                        <th className='name-row' colSpan='3'>
                            {props.name}
                        </th>
                    </thead>
                    <tbody>
                        <tr className='info-row'>
                            <td><img src='/icons/exerciseCount.png'></img> {props.count}</td>
                            <td><img src='/icons/clock.png'></img> {props.durationInMinutes}m</td>
                            <td>{displayDifficulty(props.difficulty)}</td>
                        </tr>
                        {props.goal.length !== 0 &&
                        <tr className='goal-row'>
                            <td  colSpan='3'>
                                <img className='goal' src='/icons/whiteGoal.png'></img> {props.goal}
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </Link>
        </section>
    );
}

export function displayDifficulty(difficulty) {
    difficulty = Math.min(difficulty, 3);
    const filledIcons = [];
    const unfilledIcons = [];

    for (let i = 0; i < difficulty; i++) {
        filledIcons.push(<img key={`filled-${i}`} className='filled' src='/icons/redFire.png' alt='filled fire icon' />);
    }

    for (let i = 0; i < (3 - difficulty); i++) {
        unfilledIcons.push(<img key={`unfilled-${i}`} src='/icons/whiteFire.png' alt='unfilled fire icon' />);
    }

    return (
        <div>
            {filledIcons}
            {unfilledIcons}
        </div>
    );
}