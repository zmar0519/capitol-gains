import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./SideMenu.css"

const SideMenu = () => {
	return (
		<div className="side-panel">
			<div className="menu">
				<div className="menu-header">
					<h3>Menu</h3>
				</div>

				<div className="menu-items">
						<>
            <Link to="/house"><button>House List</button></Link>
            <Link to="/senate"><button>Senate List</button></Link>
						</>
				</div>
			</div>
		</div>
	)
}

export default SideMenu
