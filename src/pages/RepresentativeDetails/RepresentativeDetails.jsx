import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./RepresentativeDetails.css"


const RepresentativeDetails = (props) => {
  console.log(props)
	const [currentRepresentative, setCurrentRepresentative] = useState([])
  const [currentRepresentativeTransactions, setCurrentRepresentativeTransactions] = useState([])

	useEffect(() => {
		async function getRepresentative() {
			let thisRepresentative = []
			await props.representativeList?.map(
				(representative) =>
					props.match.params.representativeName === representative.name &&
					thisRepresentative.push(representative)
			)
			if(thisRepresentative) {
        console.log(thisRepresentative)
        setCurrentRepresentative(thisRepresentative) 
        getTransactions()
      }
		}
    console.log(currentRepresentative)
		getRepresentative()
	}, [props])
  
  async function getTransactions(){
    let allRepresentativesTransactions = []
    await props.houseTransactions.map(transaction => props.match.params.representativeName === transaction.representative && transaction.ticker !== "--" && allRepresentativesTransactions.push(transaction))
    if (allRepresentativesTransactions) {setCurrentRepresentativeTransactions(allRepresentativesTransactions)}
  }


  return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>
			<div className="representative-container">
				<div className="head-shot">
					<img
						className="head-shot"
						src={currentRepresentative[0]?.image}
						alt={`${currentRepresentative[0]?.name} head-shot`}
					/>
				</div>
				<div className="senator-name">{currentRepresentative[0]?.name}</div>
			</div>
      <div className="all-transaction-container">
        {currentRepresentativeTransactions?.map(eachTransaction => (
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

export default withRouter(RepresentativeDetails)