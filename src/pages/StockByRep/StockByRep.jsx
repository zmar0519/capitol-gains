import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import "./StockByRep.css"

function StockByRep(props) {
  const [stock, setStock] = useState([])
  const [stockTimes, setStockTimes] = useState([])
	const [stockPrices, setStockPrices] = useState([])
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [currentTransactionsDates, setCurrentTransactionsDates] = useState([])

  console.log(props)
	// useEffect(() => {
	// 	async function getPercent() {
	// 		if (stockPrices) {
	// 			let diff = await `${Math.floor(
	// 				(stockPrices[stockPrices?.length - 1] / stockPrices[0] - 1) * 100
	// 			)}%`
	// 			setPercent(diff)
	// 		}
	// 	}
	// 	getPercent()
	// }, [stockPrices])
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
        props.setCurrentRepresentative(thisRepresentative) 
        getTransactions()
      }
		}
		getRepresentative()
	}, [props.houseTransactions])
  
  async function getTransactions(){
    let allRepresentativesTransactions = []
    await props.houseTransactions.map(transaction => {
      props.match.params.representativeName === transaction.representative 
      && transaction.ticker === props.match.params.ticker
      && allRepresentativesTransactions.push(transaction)
    })
    if (allRepresentativesTransactions) {
      allRepresentativesTransactions.sort(compareDates)
      console.log(allRepresentativesTransactions)
      setCurrentTransactions(allRepresentativesTransactions)
    }
  }

  async function getCurrentTransactionsDates() {
    let transactionDates = await currentTransactions?.map(transaction => {
      let date = transaction.transaction_date
      let unfixed = date.split("-")
      let year = unfixed.shift()
      unfixed.push(year)
      let fixed = unfixed.join("/")
      return fixed  
    })
    console.log(transactionDates)
    setCurrentTransactionsDates(transactionDates)
  }

useEffect(() => {
  async function callStockApi(){
    await getCurrentTransactionsDates()
  }
  callStockApi()
}, [currentTransactions]);

  function fixDate(date){
    let unfixed = date.split("-")
    let year = unfixed.shift()
    unfixed.push(year)
    let fixed = unfixed.join("/")
    return fixed

  }
	return (
		<div>
			<Graph
				time={stockTimes}
				price={stockPrices}
				ticker={props?.match.params.ticker}
			/>
      {/* <div className="percent">
        {percent !== "NaN%" ? <div>{percent} Increase!</div> : ""}
      </div> */}
      <div className="transaction-container">
			{currentTransactions?.map((transaction) => (
				<div key={transaction._id} className="transaction">
					<div>{transaction?.representative}</div>
					<div>{transaction.amount}</div>
					<div>{transaction.ticker}</div>
					<div>{transaction.type}</div>
					<div>{transaction.transaction_date}</div>
				</div>
			))}
      </div>
		</div>
	)
}

export default withRouter(StockByRep)
