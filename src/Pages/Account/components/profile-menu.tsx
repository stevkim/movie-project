import { Link } from 'react-router-dom';
import { toggleMenu } from '../../../features/profileSlice';
import { useAppDispatch } from '../../../Utils/Hooks/hooks';
import { toggleLogoutModal } from '../../../features/profileSlice';

const ProfileMenu = () => {
	const PROFILEMENU = [
		{
			id: 'Account',
			link: 'account',
		},
	];

	const dispatch = useAppDispatch();

	return (
		<div
			className="absolute right-0 top-[30px] bg-white z-[10] p-2 rounded-sm whitespace-nowrap"
			onClick={(e) => e.stopPropagation()}
		>
			<ul className="flex flex-col">
				{PROFILEMENU.map((menuItem) => {
					return (
						<Link
							to={menuItem.link}
							key={menuItem.id}
							className="hover:underline"
							onClick={() => dispatch(toggleMenu(false))}
						>
							{menuItem.id}
						</Link>
					);
				})}

				<button
					className="border-t-4 p-2 text-center hover:underline"
					onClick={() => {
						dispatch(toggleLogoutModal(true));
						dispatch(toggleMenu(false));
					}}
				>
					Log Out
				</button>
			</ul>
		</div>
	);
};

export default ProfileMenu;
