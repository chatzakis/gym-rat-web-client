import React from 'react';
import '../styles/Heading.css';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

export default function Heading() {
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-1">
                <a className="navbar-brand fs-4" href="/">
                    <img src="/icon-web.png" alt="icon" width="30" height="30" className="d-inline-block align-text-top me-2"></img>
                    Gym Rat Notes</a>
                <div className='username fs-5'><Link to="/profile"><i className="fa-solid fa-user"></i><span>&ensp;</span>{localStorage.getItem("_username")}</Link></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item px-2 fs-5">
                            <Link to="/"><span className="nav-link" aria-current="page">
                                <img src="/icons/home.png" alt="home icon" width="20" height="20" className="me-1"></img>
                            Home</span></Link>
                        </li>
                        <li className="nav-item px-2 fs-5">
                            <Link to="/programs"><span className="nav-link" aria-current="page">
                            <img src="/icons/calendar.png" alt="program icon" width="20" height="20" className="me-1"></img>Gym Programs</span></Link>
                        </li>
                        <li className="nav-item px-2 fs-5">
                            <Link to="/last-entries"><span className="nav-link" aria-current="page ">
                            <img src="/icons/recent.png" alt="last entries  icon" width="20" height="20" className="me-1"></img>Last Entries</span></Link>
                        </li>
                        <li className="nav-item px-2 fs-5 text-muted">
                            <button className="logout-btn" onClick={() => auth.logOut()} aria-current="page ">
                            <img src="/icons/logout.png" alt="log out icon" width="20" height="20" className="me-1"></img>Logout</button>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}
