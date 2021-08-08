import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./RepresentativeDetails.css"


const RepresentativeDetails = (props) => {
  console.log(props)
	const [currentRepresentative, setCurrentRepresentative] = useState([])
  const [currentRepresentativeTransactions, setCurrentRepresentativeTransactions] = useState([])
  const [movedStocks, setMovedStocks] = useState([])

  function compareDates(a, b) {
		if (b.transaction_date < a.transaction_date) {
			return -1
		}
		if (b.transaction_date > a.transaction_date) {
			return 1
		}
		return 0
	}
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
    await props.houseTransactions.map(transaction => {
      props.match.params.representativeName === transaction.representative 
      && transaction.ticker !== "--" 
      && transaction.ticker !== "N/A" 
      && allRepresentativesTransactions.push(transaction)
    })
    if (allRepresentativesTransactions) {
      allRepresentativesTransactions.sort(compareDates)
      setCurrentRepresentativeTransactions(allRepresentativesTransactions)
      getMovedStocks()
    }
  }
  async function getMovedStocks() {
    let movingStocks= []
    await currentRepresentativeTransactions?.map(eachTransaction => {
      if (!movingStocks.includes(eachTransaction.ticker)) {
        movingStocks.push(eachTransaction.ticker)
      }
    })
    movingStocks.sort()
    setMovedStocks(movingStocks)
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
        <div className="stocks-held-container">
          <div className="stocks-held-title-txt">Stocks Held</div>
          <div>
            {movedStocks.map(eachStockTicker => (
              <div>{eachStockTicker}</div>
            ))}
          </div>
        </div>

			</div>
      <div className="all-transaction-container">
        <div>Purchases:</div>
        {currentRepresentativeTransactions?.map(eachTransaction => (
          eachTransaction.type === "purchase" &&
          <div className="transaction-container">
            <div>{eachTransaction.ticker}</div>
            <div>{eachTransaction.amount}</div>
            <div>{eachTransaction.transaction_date}</div>
            <div>{eachTransaction.type}</div>
          </div>
        ))}
      </div>
      <div className="all-transaction-container">
        <div>Sales:</div>
        {currentRepresentativeTransactions?.map(eachTransaction => (
          eachTransaction.type !== "purchase" &&
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