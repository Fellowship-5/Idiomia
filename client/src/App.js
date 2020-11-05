import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './pages/layout/Navbar';
import HomePage from './pages/home/HomePage';
import About from './pages/about/About';

import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<ToastContainer newestOnTop autoClose={2000} />
				<Navbar />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/about" component={About} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
