import React, { useState, useEffect } from "react"
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from "../../components/SideMenu/SideMenu"
import "./SenatorDetails.css"

const SenatorDetails = (props) => {
  console.log(props.senateTransactions)
	const [currentSenator, setCurrentSenator] = useState([])
  const [currentSenatorTransactions, setCurrentSenatorTransactions] = useState([])

	useEffect(() => {
		async function getSenator() {
			let thisSenator = []
			await props.senatorList?.map(
				(senator) =>
					props.match.params.senatorName === senator.name &&
					thisSenator.push(senator)
			)
			if(thisSenator) {
        setCurrentSenator(thisSenator) 
        getTransactions()
      }
		}
    console.log(currentSenator)
		getSenator()
	}, [props])
  
  async function getTransactions(){
    let allSenatorsTransactions = []
    await props.senateTransactions.map(transaction => props.match.params.senatorName === transaction.senator && transaction.ticker !== "--" && allSenatorsTransactions.push(transaction))
    if (allSenatorsTransactions) {setCurrentSenatorTransactions(allSenatorsTransactions)}
  }

	return (
		<div className="main-container">
			<div className="menu">
				<SideMenu />
			</div>
			<div className="senator-container">
				<div className="head-shot">
					<img
						className="head-shot"
						src={currentSenator[0]?.image}
						alt={`${currentSenator[0]?.name} head-shot`}
					/>
				</div>
				<div className="senator-name">{currentSenator[0]?.name}</div>
			</div>
      <div className="all-transaction-container">
        {currentSenatorTransactions?.map(eachTransaction => (
          <div className="transaction-container">
            <div>{eachTransaction.ticker}</div>
            <div>{eachTransaction.amount}</div>
            <div>{eachTransaction.transaction_date}</div>
            <div>{eachTransaction.type}</div>
          </div>
        ))}

      </div>
		</div>
	)
}

export default withRouter(SenatorDetails)
