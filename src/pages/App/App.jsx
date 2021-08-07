import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'



// Pages + Component

import Senators from '../Senators/Senators'
import Representatives from '../Representatives/Representatives'
import NavBar from '../../components/NavBar/NavBar'
import SignUp from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import Users from '../Users/Users'

// Services
import * as houseApiService from "../../services/houseApiService"
import * as senateApiService from "../../services/senateApiService"
import * as authService from '../../services/authService'
import * as representativeDoc from '../../Senator-Rep/Reps'
import * as senatorDoc from '../../Senator-Rep/Senators'
import { getUser } from "../../services/authService"

const App = () => {
	const history = useHistory()
	const [user, setUser] = useState(authService.getUser())

	const [currentUser, setCurrentUser] = useState()
	const [authenticated, setAuthenticated] = useState(false)

	const [houseTransactions, setHouseTransactions] = useState([])
	const [senateTransactions, setSenateTransactions] = useState([])
	const [senatorList, setSenatorList] = useState([])
	const [representativeList, setRepresentativeList] = useState([])
	
	function compareReps(a, b) {
		if (a.name < b.name) {
			return -1
		}
		if (a.name > b.name) {
			return 1
		}
		return 0
	}

	useEffect(() => {
		async function getTransactions(){
			let house = await houseApiService.getAllHouseApi()
			setHouseTransactions(house)
			let senate = await senateApiService.getAllSenateApi()
			setSenateTransactions(senate)
		}
		getTransactions()
	}, []);

	useEffect(() => {
		async function getSenators(){
			let senatorsArray = await senatorDoc.senators.map(senator => senator)
			setSenatorList(senatorsArray)
		}
		async function getRepresentatives(){
			let representativesArray = await representativeDoc.representatives.map(representative => representative)
			setRepresentativeList(representativesArray)
		}
		getSenators()
		getRepresentatives()
	}, [])



	// const handleSignupOrLogin = () => {
	// 	setUser(authService.getUser())
	// }

	const handleSignupOrLogin = async () => {
		const user = getUser()
		setCurrentUser(user)
		setAuthenticated(true)
	}

	useEffect(()=>{
		const verifyToken = async()=>{
			const token = localStorage.getItem("token")
			if (token) {
				try {
					const user = getUser()
					setCurrentUser(user)
					setAuthenticated(true)
				} catch (error){
					localStorage.clear()
				}
			}
		}
		verifyToken()
	},[authenticated])

	const handleLogout = () => {
      authService.logout();
      setUser(null);
      history.push("/");
    };

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout}/>
			<Route exact path='/'>
				<Landing user={user} senateTrans={senateTransactions} />
			</Route>
			<Route exact path='/signup'>
				{user ? 
					<Redirect to='/' /> : 
					<SignUp handleSignupOrLogin={handleSignupOrLogin}/>
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
			<Route exact path="/senators">
				{user ?
				<Senators senatorList={senatorList} />
				: <Redirect to='/login' />
				}
			</Route>
			<Route exact path="/representatives">
				{user ?
				<Representatives representativeList={representativeList} />
				: <Redirect to='/login' />
				}
			</Route>
		</>
	)
}
 
export default App
