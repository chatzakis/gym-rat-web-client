import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { useAuth } from "./AuthProvider";

export default function Login() {
	const [error, setError] = useState("");
	const auth = useAuth();

	const onSubmit = async (values) => {
		setError("");

		const res = await auth.loginAction(values);
		setError(res);
		return;
	}

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit,
	});

	return (
		<div className="wrapper signIn">
			<div className="form">
				<h2 className="heading text-center">Login</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className='mb-3'>
						<label className="form-label" htmlFor="email">Email</label>
						<input
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							className="form-control"
							type="email"
							id="email"
							placeholder="Enter your email" 
							required/>
					</div>
					<div className='mb-3'>
						<label className="form-label" htmlFor="password">Password</label>
						<input
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							className="form-control"
							type="password"
							id="password"
							placeholder="Enter you password" 
							required/>
					</div>
					<button className="btn btn-primary" type="submit">
						Login
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/auth/signup"> Sign In </Link>
				</p>
				<p className='error-message'>
					<em>{error}</em>
				</p>
			</div>
		</div>
	);
}
