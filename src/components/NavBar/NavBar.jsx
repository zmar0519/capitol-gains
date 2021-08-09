import React from 'react'
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-ul-container">
			{user ? (
				<div className="nav-item-container">
					<Link to="/">
						<div className="title">Capitol Gains</div>
					</Link>
					<div className="right-nav-btn-container">
					<div className="welcome">{user.handle}</div>
						<div className="my-profile">
							<NavLink to={`/myProfile/` + user._id} ><button className="my-profile-btn">My Profile</button></NavLink>
						</div>
						<div>
							<NavLink to='' onClick={handleLogout} className="log-out"><button className="log-out-btn">Log out</button></NavLink>
						</div>
					</div>
				</div>
			) : (
				<div className="nav-item-container">
					<div className="title">Capitol Gains</div>

					<div className="right-nav-btn-container">
						<div className="welcome">Welcome! Please Sign-in.</div>
						<div className="log-in">
							<NavLink to="/login" ><button className="log-in-btn">Log In</button></NavLink>
						</div>
						<div className="sign-up">
							<NavLink to="/signup" ><button className="sign-up-btn">Sign Up</button></NavLink>
						</div>
					</div>
				</div>
			)}
			</div>
		</nav>
	)
}

export default NavBar
