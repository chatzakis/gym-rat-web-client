import React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";
import Footer from "../components/Footer";

function MainPage(params) {
    return (
        <>
            <Heading></Heading>
            <section id="main-page">
                <div className="page-content-wrapper">
                    <div className="container">
                        <div className="row categories-buttons">
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=10"><img id="chest" src="buttons/chestBtn.jpg" alt="chest exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=20"><img id="back" src="buttons/backBtn.jpg" alt="back exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=30"><img id="shoulders" src="buttons/shouldersBtn.jpg" alt="shoulders exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=40"><img id="arms" src="buttons/armsBtn.jpg" alt="arms exercises"></img></Link>
                            </div>
                        </div>
                        <div className="row categories-buttons">
                            <div className="col-lg-3 col-6  align-self-center p-2">
                                <Link to="/exercises?mg=50"><img id="abs" src="buttons/absBtn.jpg" alt="abs exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=60"><img id="legs" src="buttons/legsBtn.jpg" alt="legs exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                                <Link to="/exercises?mg=70"><img id="aerobic" src="buttons/aerobicBtn.jpg" alt="aerobic exercises"></img></Link>
                            </div>
                            <div className="col-lg-3 col-6 align-self-center p-2">
                            <Link to="/programs"><img id="programs" src="buttons/programsBtn.jpg" alt="your gym programs"></img></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default MainPage;