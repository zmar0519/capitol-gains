import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./MyProfile.css"
import "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import CreateFollowing from "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import { getUserSenators } from "../../services/senatorService"

const MyProfile = (props) => {
	const [userData, setUserData] = useState("")

	useEffect(() => {
		function grabSenRepData() {
			getUserSenators().then((data) => {
				setUserData(data)
				console.log(data.reps)
			})
		}
		grabSenRepData()
	}, [])

	const { _id, avatar, handle } = props.currentUser || {}

	return (
		<div className="profile-page">
			<div className="profile-user-info">
				<img className="profile-image" src={avatar} alt="user avatar"></img>
				<div className="profile-name">{handle}</div>
			</div>
			<div className="profile-senator-rep-container">
				<div className="profile-sen-rep-container">
					<div className="profile-sen-rep-txt">Representatives You Follow</div>
					<div className="profile-inner-sen-rep-container">
						{userData?.reps?.map((rep) => (
							<Link to={`/representatives/` + rep.name}>
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
						))}
					</div>
				</div>
				<div className="profile-sen-rep-container">
					<div className="profile-sen-rep-txt">Senators You Follow</div>
					<div className="profile-inner-sen-rep-container">
						{userData?.senators?.map((senator) => (
							<Link to={`/senators/` + senator.name}>
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
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyProfile
