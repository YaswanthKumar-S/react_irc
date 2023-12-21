import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Navbar } from './components/Navbar';
import { OnlineUsers } from './components/OnlineUsers';
import { Sidebar } from './components/Sidebar';
import { Create } from './pages/create/Create';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Error } from './pages/error/Error';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Project } from './pages/project/Project';
import { Signup } from './pages/signup/Signup';

import { useAuthContext } from './hooks/useAuthContext';

function App() {
	const homepage = window.location.pathname === '/';
	const { user, authIsReady } = useAuthContext();

	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					{user && !homepage && <Sidebar />}
					<div className="container">
						<Navbar />
						<Routes>
							<Route element={<Home />} path="/" />
							<Route
								element={user ? <Dashboard /> : <Login />}
								path="/dashboard"
							/>
							<Route element={user ? <Create /> : <Login />} path="/create" />
							<Route
								element={!user ? <Login /> : <Dashboard />}
								path="/login"
							/>
							<Route
								element={!user ? <Signup /> : <Dashboard />}
								path="/signup"
							/>
							<Route
								element={user ? <Project /> : <Login />}
								path="/projects/:id"
							/>
							<Route element={<Error />} path="*" />
						</Routes>
					</div>
					{user && !homepage && <OnlineUsers />}
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
