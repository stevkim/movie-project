import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { setToken, setUserInfo, loggedInState, setLogin } from '../features/userSlice';
import { useAppDispatch, useAppSelector } from '../Utils/Hooks/hooks';
import { setUserList } from '../features/mediaSlice';

const Login = () => {
	interface ILoginInfo {
		username: string;
		password: string;
	}

	const initValues: ILoginInfo = {
		username: '',
		password: '',
	};
	const [hidden, setHidden] = useState(true);

	const handleToggle = () => {
		setHidden(!hidden);
	};
	const loggedIn = useAppSelector(loggedInState);
	const dispatch = useAppDispatch();

	const handleLogin = async(values: ILoginInfo) => {
			const res = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
				credentials: 'include'
			})
			const result = await res.json();

			if (res.status === 200) {
				alert(result.msg);
				dispatch(setLogin(true))
				dispatch(setToken(result.token))
				dispatch(setUserInfo(result.data))
				dispatch(setUserList(result.data.movieList));
				window.localStorage.setItem('loggedIn', 'true');
				window.localStorage.setItem('ID', result.data.username);
			} else {
				console.log(result)
			}
	}

	return (
		<div className="m-w-[600px] mx-auto border-2 p-8 flex flex-col justify-center items-center bg-gradient">
			{loggedIn && <Navigate to={'/'} replace={true} />}
			<div className="w-max mb-8">
				<p className="text-center mx-auto text-6xl p-2 rounded-sm">Logo</p>
			</div>
			<div className="w-1/2 min-w-[400px] max-w-[600px] mx-auto border-2 border-gray-200 p-4 bg-white">
				<p className="w-1/2 text-center mx-auto text-xl my-2">
					Welcome Back!<span className="block">Please Log in.</span>
				</p>
				<Formik
					initialValues={initValues}
					onSubmit={(values, action) => {
						handleLogin(values)
						action.setSubmitting(false);
					}}
				>
					<Form>
						<div className="flex flex-col p-4">
							<label
								htmlFor="username"
								className="mb-2"
							>
								Username:
							</label>
							<div className="relative flex flex-row items-center mb-8">
								<div className="w-6 h-6 left-2 absolute">
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
											d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
										/>
									</svg>
								</div>
								<Field
									id="username"
									name="username"
									className="border-2 border-gray-400 rounded-md grow indent-10"
									required
								/>
							</div>
							<label
								htmlFor="password"
								className="mb-2"
							>
								Password:
							</label>
							<div className="relative flex flex-row items-center">
								<div className="w-6 h-6 absolute left-2">
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
											d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
										/>
									</svg>
								</div>
								<Field
									id="password"
									name="password"
									className="border-2 border-gray-400 rounded-md grow indent-10"
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
						</div>
						<button
							type="submit"
							className="w-1/2 mx-auto flex justify-center items-center mt-4 bg-blue-500 text-white rounded-sm p-2 hover:bg-blue-400"
						>
							Login
						</button>
					</Form>
				</Formik>
				<div className="border-[1px] border-gray-400 my-4" />

				<div className="text-center my-8">
					New here?{' '}
					<Link
						to={'/signup'}
						className="text-blue-500 hover:text-blue-400 ml-2"
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
