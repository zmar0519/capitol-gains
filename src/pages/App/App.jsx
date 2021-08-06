import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import * as houseApiService from "../../services/houseApiService"
import * as senateApiService from "../../services/senateApiService"
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import Users from '../Users/Users'
import * as authService from '../../services/authService'

const App = () => {
	const history = useHistory()
	const [user, setUser] = useState(authService.getUser())
	const [houseTransactions, setHouseTransactions] = useState([])
	const [senateTransactions, setSenateTransactions] = useState([])
	
	useEffect(() => {
		async function getTransactions(){
			let house = await houseApiService.getAllHouseApi()
			console.log("this is house", house)
			setHouseTransactions(house)
			let senate = await senateApiService.getAllSenateApi()
			console.log("this is senate", senate)
			setSenateTransactions(senate)
		}
		getTransactions()
	}, []);

	const handleLogout = () => {
		authService.logout()
		setUser(null)
		history.push('/')
	}

	const handleSignupOrLogin = () => {
		setUser(authService.getUser())
	}

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout}/>
			<Route exact path='/'>
				<Landing user={user} />
			</Route>
			<Route exact path='/signup'>
				{user ? 
					<Redirect to='/' /> : 
					<Signup handleSignupOrLogin={handleSignupOrLogin}/>
				}
			</Route>
			<Route exact path='/login'>
				{user ? 
					<Redirect to='/' /> : 
					<Login handleSignupOrLogin={handleSignupOrLogin}/>
				}
			</Route>
			<Route exact path='/users'>
				{user ? <Users /> : <Redirect to='/login' />}
			</Route>
		</>
	)
}
 
export default App
