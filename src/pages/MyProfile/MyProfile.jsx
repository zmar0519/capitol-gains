import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "./MyProfile.css"
import "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import { getUserSenators } from "../../services/senatorService"

const MyProfile = (props) => {
	// const [userData, setUserData] = useState("")

	useEffect(() => {
		function grabSenRepData() {
			getUserSenators().then((data) => {
				props.setUser(data)
			})
		}
		grabSenRepData()
	}, [])

	const { _id, avatar, handle, reps, senators } = props.currentUser || {}

	return (
		<div className="profile-page">
			<div className="profile-user-info">
				<div className="profile-update-container">
					<Link to="/UpdateProfile/Profile">
						<button id="profile-update-btn">Edit</button>
					</Link>
				</div>
				<div>
					<img className="profile-image" src={avatar} alt="user avatar"></img>
					<div className="profile-name">{handle}</div>
				</div>
			</div>
			<div className="profile-senator-rep-container">
				<div className="profile-sen-rep-container">
					<div className="profile-sen-rep-txt">Representatives You Follow</div>
					<div className="profile-inner-sen-rep-container">
						{reps?.map((rep) => (
							<div className="profile-each-rep-container">
								<div className="profile-delete-container">
									<button
										onClick={() => props.handleDeleteRep(rep._id)}
										className="profile-delete-button"
									>
										X
									</button>
								</div>

								<Link to={`/representatives/` + rep.name} className="rep-link">
									<div className="profile-senator-container profile-senate-contain">
										<div className="profile-head-shot">
											<img
												className="profile-head-shot"
												src={rep.image}
												alt={`${rep.name} head-shot`}
											/>
										</div>
										<div className="profile-senator-name">{rep.name}</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className="profile-sen-rep-container">
					<div className="profile-sen-rep-txt">Senators You Follow</div>
					<div className="profile-inner-sen-rep-container">
						{senators?.map((senator) => (
							<div className="profile-each-rep-container">
								<div className="profile-delete-container">
									<button
										onClick={() => props.handleDeleteSenator(senator._id)}
										className="delete-button"
									>
										X
									</button>
								</div>

								<Link to={`/senators/` + senator.name} className="rep-link">
									<div className="profile-senator-container profile-senate-contain">
										<div className="profile-head-shot">
											<img
												className="profile-head-shot"
												src={senator.image}
												alt={`${senator.name} head-shot`}
											/>
										</div>
										<div className="profile-senator-name">{senator.name}</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyProfile
