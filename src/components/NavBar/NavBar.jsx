import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div>
			{user ? (
				<ul>
					<li>Welcome, {user.name}</li>
					<li>
						<NavLink to='' onClick={handleLogout}>Log out</NavLink>
					</li>
					<li>
						<NavLink to="/myProfile">My Profile</NavLink>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<NavLink to="/login">Log In</NavLink>
					</li>
					<li>
						<NavLink to="/myProfile">My Profile</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Sign Up</NavLink>
					</li>
				</ul>
			)}
			</div>
		</nav>
	)
}

export default NavBar
