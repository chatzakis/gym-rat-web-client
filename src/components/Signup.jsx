import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import getApiUrl from "../components/ApiClient";

export default function Signup() {
    const apiUrl = getApiUrl();
    const [result, setResult] = useState("");

    const onSubmit = async (values) => {
        setResult("");

        try {
            const res = await axios.post(
                apiUrl + 'register',
                values, { withCredentials: true }
            );
            setResult(res.data.message);

        } catch (err) {
            if (err && err instanceof AxiosError) {
                setResult(err.response?.data.message);
                return err.response?.data.message
            }
            else if (err && err instanceof Error) setResult(err.message);
            console.log("Error: ", err);
            return;
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        onSubmit,
    });

    return (
        <div className="wrapper signUp">
            <div className="form">
                <h2 className="heading text-center">Create an account</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            className="form-control"
                            type="text"
                            id="username"
                            placeholder="Enter your name"
                            required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder="Enter your mail"
                            required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="form-control"
                            type="password"
                            id="password"
                            placeholder="Enter you password"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Sign up</button>
                    <h4 align="center" className="or">OR</h4>
                </form>
                <p>
                    Already have an account ? <Link to="/auth"> Login </Link>
                </p>
                <p className='error-message'>
                    <em>{result}</em>
                </p>
            </div>
        </div>
    );
}
