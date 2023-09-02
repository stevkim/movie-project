import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/login-page.tsx';
import SignUp from './Pages/signup-page.tsx';
import AccountPage from './Pages/Account/account-page.tsx';
import Home from './Pages/home-page.tsx';
import MyList from './Pages/my-list-page.tsx';
import Movies from './Pages/movies-page.tsx';
import TVShows from './Pages/tvshows-page.tsx';
import Trending from './Pages/trending-page.tsx';

const router = createBrowserRouter([
	{
		path: 'login',
		element: <Login />,
		children: [
		],
	},
	{
		path: 'signup',
		element: <SignUp />,
	},
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: 'account',
				element: <AccountPage />
			},
			{
				path: 'my-list',
				element: <MyList />
			},
			{
				path: 'movies',
				element: <Movies />
			},
			{
				path: 'tv-shows',
				element: <TVShows />
			},
			{
				path: 'trending',
				element: <Trending />
			}
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router}/>
	</Provider>
);
