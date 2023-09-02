import { updateFieldState, toggleUpdateModal } from '../../../features/accountSlice';
import { useAppSelector, useAppDispatch } from '../../../Utils/Hooks/hooks';
import { Formik, Form, Field } from 'formik';
import { userInfoState } from '../../../features/userSlice';
import { setUserInfo } from '../../../features/userSlice';
import { handleRefresh } from '../../../Utils/fetchFunctions';

const UpdateModal = () => {
	const updateField = useAppSelector(updateFieldState);
	const userInfo = useAppSelector(userInfoState);
	const dispatch = useAppDispatch();

	const userID = userInfo?.username;

	type IUpdateValues = {
		username: string;
		confirmPassword: string;
		password: string;
		updateField: string;
		newField: string;
	}

	const initValues: IUpdateValues = {
		username: userID || '',
		updateField: updateField || '',
		password: '',
		confirmPassword: '',
		newField: ''
	};

	const handleSubmit = async (values: IUpdateValues) => {
		let token = await handleRefresh();
		const res = await fetch('http://localhost:3000/account/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(values),
		});
		const result = await res.json();
		if (res.status === 200) {
			alert(result.msg);
			dispatch(setUserInfo(result.data));
			dispatch(toggleUpdateModal(false));
		} else if (res.status === 403) {
			alert(result.msg);
		} else {
			alert(result.msg);
		}
	};

	return (
		<div
			className="w-screen h-screen fixed top-0 left-0 z-[10] bg-overlay flex justify-center items-center"
			onClick={() => dispatch(toggleUpdateModal(false))}
		>
			<div
				className="h-auto max-w-[600px] min-w-[300] w-auto bg-white p-8 rounded-md"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="text-4xl">Account Update</h1>
				<h2 className="mt-2 mb-6">
					To update your{' '}
					<span className="text-gray-400 italic">{updateField}</span>, please
					confirm your password.
				</h2>
				<Formik
					initialValues={initValues}
					onSubmit={(values, action) => {
						handleSubmit(values);
						action.setSubmitting(false);
					}}
				>
					<Form>
						<div className="flex flex-row mb-2">
							<label
								htmlFor="password"
								className="mr-2"
							>
								Password:{' '}
							</label>
							<Field
								id="password"
								name="password"
								type="password"
								className="input-field"
								required
							/>
						</div>
						<div className="flex flex-row mb-2">
							<label
								htmlFor="confirmPassword"
								className="mr-2"
							>
								Confirm Password:{' '}
							</label>
							<Field
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								className="input-field"
								required
							/>
						</div>
						<div className="flex flex-row mt-8 mb-8">
							<label
								htmlFor="newField"
								className="mr-2"
							>
								New {updateField}:{' '}
							</label>
							<Field
								id="newField"
								name="newField"
								className="input-field"
								required
							/>
						</div>
						<div className="w-full flex flex-row justify-evenly">
							<button
								className="w-2/5 bg-green-300 rounded-md"
								type="submit"
							>
								Update
							</button>
							<button
								className="w-2/5 bg-gray-300 rounded-md"
								onClick={() => dispatch(toggleUpdateModal(false))}
							>
								Cancel
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default UpdateModal;
