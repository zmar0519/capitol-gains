import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-ul-container">
			{user ? (
				<div className="nav-item-container">
					<div className="title">Capitol Gains</div>
					<div className="right-nav-btn-container">
					<div className="welcome">Welcome, {user.handle}</div>
						<div>
							<NavLink to="/myProfile" className="my-profile"><button className="my-profile-btn">My Profile</button></NavLink>
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
						<div className="welcome">Welcome!</div>
						<div>
							<NavLink to="/login" className="log-in"><button>Log In</button></NavLink>
						</div>
						<div>
							<NavLink to="/signup" className="sign-up"><button>Sign Up</button></NavLink>
						</div>
					</div>
				</div>
			)}
			</div>
		</nav>
	)
}

export default NavBar
