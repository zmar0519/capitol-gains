import React from "react"
import "../Create.css"

const CreateFollowingHeader = (props) => {
	return (
		<div className="hidden-container">
			<div className="header">
				<h3>Start a Following</h3>
				<div className="header-buttons">
					<button onClick={() => props.setToggleMyProfile(true)}>Cancel</button>
				</div>
			</div>
		</div>
	)
}
export default CreateFollowingHeader
