import React from "react"
import "./AvatarSelection.css"

// Assets
import moon from "../../assets/Avatars/moon.png"
import man from "../../assets/Avatars/man.png"

const AvatarSelection = (props) => {
	return (
		<div className="popup-container">
			<div className="popup-menu">
				<div className="popup-header">
					<h3>Select Your Avatar</h3>
					<button id="close-button" onClick={props.handlePopup}>
						X
					</button>
				</div>
				<img src={props.formData.avatar} alt="animal-avatar"></img>
				<div className="bottom-ui">
					<select
						onChange={(e) => props.handleChange(e)}
						name="avatar"
						value={props.formData.avatar}
					>
						<option value={moon}>Moon</option>
						<option value={man}>Man</option>
					</select>
					<button onClick={props.handlePopup} type="button">
						Confirm
					</button>
				</div>
			</div>
		</div>
	)
}

export default AvatarSelection
