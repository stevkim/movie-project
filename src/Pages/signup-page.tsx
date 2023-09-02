import { Formik, Form, Field } from 'formik';
import { IUserInfo } from '../Utils/interfaces';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const SignUp = () => {
	const initValues: IUserInfo = {
		displayName: '',
		username: '',
		firstName: '',
		lastName: '',
		password: '',
		email: '',
		phoneNumber: '',
		dob: '',
	};
	const [hidden, setHidden] = useState(true);
	const [success, setSuccess] = useState(false);

	const handleToggle = () => {
		setHidden(!hidden);
	};

	const handleSignUp = async(values: IUserInfo) => {
		const res = await fetch('http://localhost:3000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values)
		})
		const result = await res.json();

		if (res.status === 200) {
			alert(result.msg);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 1000)
		} else {
			alert(result.msg)
		}
	}

	return (
		<div className="m-w-[600px] mx-auto border-2 p-8 bg-gradient">
			<div className="w-full text-center mb-6">
				<h1 className="text-6xl">Logo</h1>
			</div>
			<div className="w-1/2 min-w-[400px] max-w-[600px] mx-auto border-2 border-gray-200 p-4 bg-white">
				<Formik
					initialValues={initValues}
					onSubmit={(values, actions) => {
						handleSignUp(values)
						actions.setSubmitting(false);
					}}
				>
					<Form>
						<h2 className="text-xl mb-4 text-center text-gray-500">
							Create an account
						</h2>
						<div className="flex flex-row w-full mb-2 items-center">
							<label
								htmlFor="username"
								className="mr-2"
							>
								Username:
							</label>
							<Field
								id="username"
								name="username"
								className="input-field"
								required
							/>
						</div>

						<div className="flex flex-row w-full mb-2 items-center relative">
							<label
								htmlFor="password"
								className="mr-2"
							>
								Password:
							</label>
							<Field
								id="password"
								name="password"
								className="input-field"
								type={`${hidden ? 'password' : 'text'}`}
								required
							/>
							<div
								className="w-6 h-6 absolute right-2"
								onClick={handleToggle}
							>
								{hidden ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								)}
							</div>
						</div>

						<div className="flex flex-row w-full mb-2 items-center">
							<label
								htmlFor="email"
								className="mr-2"
							>
								Email:
							</label>
							<Field
								id="email"
								name="email"
								className="input-field"
								type="email"
								required
							/>
						</div>

						<div className="border-[1px] border-black my-4" />

						<h2 className="text-xl mb-4 text-center text-gray-500">
							Additional Information
						</h2>

						<label htmlFor="name">Name:</label>
						<div
							id="name"
							className="mb-2 flex gap-x-1"
						>
							<Field
								name="firstName"
								placeholder="First Name"
								className="input-field"
								required
							/>
							<Field
								name="lastName"
								placeholder="Last Name"
								className="input-field"
								required
							/>
						</div>

						<div className="flex flex-row w-full mb-2 items-center">
							<label
								htmlFor="dob"
								className="mr-2"
							>
								Date of Birth:
							</label>
							<Field
								id="dob"
								name="dob"
								type="date"
								className="input-field"
							/>
						</div>

						<div className="flex flex-row w-full items-center">
							<label
								htmlFor="phoneNumber"
								className="mr-2"
							>
								Phone:
							</label>
							<Field
								type="tel"
								id="phoneNumber"
								name="phoneNumber"
								pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
								className="input-field"
							/>
						</div>
						<small className="block text-right w-1/2 ml-auto mr-2 mb-2">
							Format: (123) 444-1234
						</small>

						<div className='flex justify-evenly w-full mt-8'>
						<button
							type="submit"
							className="w-2/5 flex justify-center items-center bg-blue-500 text-white rounded-sm hover:bg-blue-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 mr-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
								/>
							</svg>
							Create Account
						</button>
						<Link to={'/login'} className='w-2/5 text-center bg-white text-black rounded-sm p-2 border-2 hover:bg-gray-200'>Go back</Link>
						</div>
					</Form>
				</Formik>
			</div>
			{success && <Navigate to={'/login'} replace={true} />}
		</div>
	);
};

export default SignUp;
