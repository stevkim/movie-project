import { useAppDispatch } from '../Utils/Hooks/hooks';
import { setLogin, setToken } from '../features/userSlice';
import { toggleMenu, toggleLogoutModal } from '../features/profileSlice';

const LogoutModal = () => {
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		const res = await fetch('http://localhost:3000/logout', {
			method: 'POST',
		});
		const result = await res.json();
    dispatch(toggleLogoutModal(false))
		dispatch(toggleMenu(false));
		dispatch(setLogin(false));
		dispatch(setToken(''));
		window.localStorage.setItem('loggedIn', 'false');
		window.localStorage.setItem('ID', '');

		return result.msg;
	};

	return (
		<div
			className="w-screen h-screen fixed top-0 left-0 z-[10] bg-overlay flex justify-center items-center"
			onClick={() => dispatch(toggleLogoutModal(false))}
		>
			<div
				className="bg-white min-w-[300px] h-auto max-w-[600px] w-auto p-4 rounded-sm"
				onClick={(e) => e.stopPropagation()}
			>
				<p className="text-center">Are you sure?</p>
				<div className="w-full flex justify-evenly mt-4">
					<button
						className="w-2/5 bg-red-300 rounded-md"
						onClick={handleLogout}
					>
						Logout
					</button>
					<button
						className="w-2/5 bg-gray-300 rounded-md"
						onClick={() => {
							dispatch(toggleLogoutModal(false));
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;
