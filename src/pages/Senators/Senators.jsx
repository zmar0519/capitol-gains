import React from "react"
import { Link, withRouter } from "react-router-dom"
import "./Senators.css"
import SenHeader from "../../components/SenHeader/SenHeader"

const Senators = (props) => {
	return (
		<div className="main-container">
			<div className="right-side">
				<div className="sen-header">
					<SenHeader />
				</div>
				<div className="all-senators-container">
					{props.senatorList.map((senator) => (
						<Link to={`/senators/` + senator.name} className="rep-link">
							<div className="senator-container rep-contain">
								<div className="head-shot">
									<img
										className="head-shot"
										src={senator.image}
										alt={`${senator.name} head-shot`}
									/>
								</div>
								<div className="representative-name">{senator.name}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default withRouter(Senators)
