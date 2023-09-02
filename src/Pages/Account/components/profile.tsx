import ProfileMenu from './profile-menu';
import { useAppSelector, useAppDispatch } from '../../../Utils/Hooks/hooks';
import { LogoutModalState, toggleMenu, ProfileMenuState } from '../../../features/profileSlice';
import LogoutModal from '../../../Components/logout-modal';

const Profile = () => {
	const logoutModal = useAppSelector(LogoutModalState);
	const MenuState = useAppSelector(ProfileMenuState);
	const dispatch = useAppDispatch();

	return (
		<div
			className="flex relative"
			onClick={(e) => {
				e.stopPropagation();
				dispatch(toggleMenu(!MenuState));
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-8 aspect-square"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={`p-2 w-8 aspect-square transition-all ${
					MenuState ? 'rotate-180' : ''
				}`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 15.75l7.5-7.5 7.5 7.5"
				/>
			</svg>
			{MenuState && <ProfileMenu />}
			{logoutModal && <LogoutModal />}
		</div>
	);
};

export default Profile;
