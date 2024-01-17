import UpdateModal from './components/update-modal';
import {
	userInfoState,
	preferredMovieGenreState,
	preferredShowGenresState,
} from '../../features/userSlice';
import { useAppSelector, useAppDispatch } from '../../Utils/Hooks/hooks';
import {
	toggleUpdateModal,
	fieldUpdater,
	accountUpdateModalState,
	toggleGenreModal,
	genreModalState,
} from '../../features/accountSlice';
import { PasswordStars } from '../../Utils/functions';
import GenreSettingsModal from './components/genre-setting-modal';
import DeleteModal from '../../Components/delete-modal';
import {
	toggleDeleteModal,
	DeleteModalState,
} from '../../features/profileSlice';
import UserGenreList from './components/UserGenreList';

const AccountPage = () => {
	const userInfo = useAppSelector(userInfoState);

	const updateModalState = useAppSelector(accountUpdateModalState);
	const deleteModalState = useAppSelector(DeleteModalState);
	const genreChangeModalState = useAppSelector(genreModalState);

	const userPreferredMovieGenres = useAppSelector(preferredMovieGenreState) || [];
	const userPreferredTVGenres = useAppSelector(preferredShowGenresState) || [];
	const dispatch = useAppDispatch();

	const handleUpdate = (field: string) => {
		dispatch(toggleUpdateModal(true));
		dispatch(fieldUpdater(field));
	};

	const handleGenreChange = () => {
		dispatch(toggleGenreModal(true));
	};

	return (
		<div className="m-w-[600px] max-w-[1920px] mx-auto border-2 p-8 bg-white mt-8">
			<div className="flex flex-row items-center mb-6">
				<h1 className="text-4xl">Account</h1>
				<p className="text-xl text-right w-full mr-4">
					Welcome, {userInfo?.displayName}!
				</p>
			</div>

			<div className="border-[1px] border-black my-2" />

			<div className="flex flex-row w-full">
				<h2 className="account-update-label">User Information</h2>
				<div className="w-[70%] ml-auto">
					<div className="account-update-wrapper">
						<p className="mr-auto">{userInfo?.username}</p>
					</div>
					<div className="account-update-wrapper">
						<p className="mr-auto">{userInfo?.displayName}</p>
						<button
							className="account-update-button"
							onClick={() => handleUpdate('displayName')}
						>
							Change display name
						</button>
					</div>
					<div className="account-update-wrapper">
						<p className="mr-auto">
							Password: {PasswordStars(userInfo?.password)}
						</p>
						<button
							className="account-update-button"
							onClick={() => handleUpdate('password')}
						>
							Change password
						</button>
					</div>
					<div className="account-update-wrapper">
						<p className="mr-auto">{userInfo?.email}</p>
						<button
							className="account-update-button"
							onClick={() => handleUpdate('email')}
						>
							Change account email
						</button>
					</div>
					<div className="account-update-wrapper">
						<p className="mr-auto">Phone: {userInfo?.phoneNumber}</p>
						<a
							className="account-update-button"
							onClick={() => handleUpdate('phoneNumber')}
						>
							Change phone number
						</a>
					</div>
				</div>
			</div>

			<div className="border-[1px] border-black my-2" />

			<div className="flex flex-row w-full justify-start">
				<h2 className="account-update-label">Settings</h2>

				<div className="w-[70%] ml-auto">
					<div className="account-update-wrapper">
						<div className="mr-auto">
							<h2>User Movie Preferences</h2>
							{userPreferredMovieGenres!.length > 0 ? (
								<UserGenreList
									type={'movie'}
									list={userPreferredMovieGenres}
								/>
							) : (
								'You can save your preferred movie genres!'
							)}
							<h2>User TV Preferences</h2>
							{userPreferredTVGenres!.length > 0 ? (
								<UserGenreList
									type={'tv'}
									list={userPreferredTVGenres}
								/>
							) : (
								'You can save your preferred TV genres!'
							)}
						</div>

						<button
							className="account-update-button"
							onClick={() => handleGenreChange()}
						>
							Change Settings
						</button>
					</div>
				</div>
			</div>

			<div className="border-[1px] border-black my-2" />

			<div className="flex flex-row w-full">
				<h2 className="account-update-label">Delete</h2>
				<button
					className="ml-auto mr-4 bg-red-300 rounded-md p-2"
					onClick={() => dispatch(toggleDeleteModal(true))}
				>
					Delete Account
				</button>
			</div>
			{updateModalState && <UpdateModal />}
			{genreChangeModalState && <GenreSettingsModal />}
			{deleteModalState && <DeleteModal />}
		</div>
	);
};

export default AccountPage;
