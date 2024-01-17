import Profile from "../../Pages/Account/components/profile";
import SearchBar from "./search-bar";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../Utils/Hooks/hooks";
import { setSearchValue, toggleSearch, resetInput } from "../../features/searchSlice";

const Navbar = () => {
	const dispatch = useAppDispatch();

	const NAVS = [
		{
			id: 'Home',
			link: '/',
		},
		{
			id: 'Movies',
			link: 'movies',
		},
		{
			id: 'TV Shows',
			link: 'tv-shows',
		},
		{
			id: 'Trending',
			link: 'trending',
		},
		{
			id: 'My List',
			link: 'my-list',
		},
	];

	const handleClick = () => {
		dispatch(setSearchValue(''));
		dispatch(toggleSearch(false));
		dispatch(resetInput(false));
	}

	return (
		<div className="flex items-center h-[50px] boxshadow-bottom bg-white">
			<Link to={'/'} className=" text-2xl w-auto p-4 flex items-center">Moovi</Link>

			<div className="mr-auto">
				<ul className="flex">
					{NAVS.map((nav) => {
						return <Link to={nav.link} key={nav.id} className="p-2" onClick={handleClick}>{nav.id}</Link>;
					})}
				</ul>
			</div>

			<div className="flex ml-auto items-center">
				<div className="p-2 mr-2">
					<SearchBar />
				</div>
				<div className="p-2">
					<Profile />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
