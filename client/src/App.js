import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Navbar from './pages/layout/Navbar'
import HomePage from './pages/home/HomePage'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import PrivateRoute from './pages/routing/PrivateRoute'
import About from './pages/about/About'

import './App.css'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'

function App () {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
          className='custom-toast-container'
          toastClassName='custom-toast-wrapper'
          bodyClassName='custom-toast-body'
          progressClassName='custom-toast-progress'
          position='top-left'
          autoClose={1600}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/admin-dashboard'
            component={AdminDashboard}
          />
          <Route exact path='/about' component={About} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
