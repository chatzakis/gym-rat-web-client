import React from "react";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Error from "../components/Error";
import { Routes, Route } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage(params) {
    return (
        <>
            <section id="login-page">
                <div className="page-content-wrapper">
                    <div className="container">
                        <div className="row align-items-center  mb-5">
                            {/* Descripion Column */}
                            <div className="col-lg-6">
                                <div className="title pc-only d-flex justify-content-center align-items-center mb-4">
                                    <img className="logo-rat me-3" alt="logo" src="../icon-web.png"></img>
                                    <h1>Gym Rat Notes</h1>
                                </div>
                                <div className="text-center mb-3">
                                    <h2 className="fs-4">An easy-to-use gym log</h2>
                                    <p className="mb-1">Gym Rat Notes app was inspired by the need to track progress in the gym effordlessly, across devices.</p>
                                    <a className="more-link" href="#details">Learn more</a>
                                </div>
                            </div>
                            {/* Action Column */}
                            <div className="col-lg-6">
                                <div id="auth" className="login-form">
                                    <Routes>
                                        <Route path="/" element={<Login />} exact />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route element={<Error />} />
                                    </Routes>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div id="details" className="text-center py-5">
                                    <h3><i class="fa-solid fa-pen"></i> Tracking your progress</h3>
                                    <p>You can select gym exercises organized in simple muscle groups. Add the Weight, Sets, Reps, etc., every time you perform the exercise. Analyze your last entries to better plan your next workout.</p>
                                    <img className="mb-5" alt="usage-example" src="../images/entries-example.jpg"></img>

                                    <h3><i class="fa-regular fa-calendar"></i> Select between a variety of Gym Programs</h3>
                                    <p>Find the program that better suits your needs and begin working out immediatly!</p>
                                    <img className="mb-5" alt="usage-example" src="../images/program-example.jpg"></img>
                                    <h3>#RegisterNow</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}


export default LoginPage;