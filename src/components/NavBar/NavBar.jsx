import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-ul-container">
			{user ? (
				<div className="nav-item-container">
					<div className="welcome">Welcome, {user.handle}</div>
					<div>
						<div>
							<NavLink to="/myProfile" className="my-profile">My Profile</NavLink>
						</div>
						<div>
							<NavLink to='' onClick={handleLogout} className="log-out">Log out</NavLink>
						</div>
					</div>
				</div>
			) : (
				<div className="nav-item-container">
					<div className="welcome">Welcome!</div>
					<div>
						<div>
							<NavLink to="/login" className="log-in">Log In</NavLink>
						</div>
						<div>
							<NavLink to="/signup" className="sign-up">Sign Up</NavLink>
						</div>
					</div>
				</div>
			)}
			</div>
		</nav>
	)
}

export default NavBar
