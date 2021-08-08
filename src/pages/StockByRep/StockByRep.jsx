import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import "./StockByRep.css"

function StockByRep(props) {
	const [repTransactions, setRepTransactions] = useState([])
	const [stock, setStock] = useState([])
	const [stockTimes, setStockTimes] = useState([])
	const [stockPrices, setStockPrices] = useState([])
	const [percent, setPercent] = useState(null)

	useEffect(() => {
		async function getPercent() {
			if (stockPrices) {
				let diff = await `${Math.floor(
					(stockPrices[stockPrices?.length - 1] / stockPrices[0] - 1) * 100
				)}%`
				setPercent(diff)
			}
		}
		getPercent()
	}, [stockPrices])

	useEffect(() => {
		async function callStockApi() {
			let transactionArrayEpoch = []
			let transactionTickerArray = []
			let transactionObject = {}
			let transactionAmount = ""
			const transactionArray = []
			let repTrans = []
			try {
				const dateString2 = await Math.floor(new Date().getTime() / 1000)
				await props?.transactions?.map((transaction) => {
					if (
						transaction.representative === props?.match.params.rep &&
						transaction.ticker === props?.match.params.ticker
					) {
						repTrans.push(transaction)
						transactionArray.push(transaction.transaction_date)
						transactionArrayEpoch.push(
							Math.floor(
								new Date(transaction.transaction_date).getTime() / 1000
							)
						)
						if (transactionTickerArray.includes(transaction.ticker)) {
							transactionTickerArray.push(transaction.ticker)
						}
						transactionObject[transaction.ticker]
							? (transactionObject[transaction.ticker] +=
									parseInt(transactionAmount))
							: (transactionObject[transaction.ticker] =
									parseInt(transactionAmount))
					}
				})
				setRepTransactions(repTrans)
				let dateString1 = await transactionArrayEpoch.shift()
				let result = await findRange(
					dateString1,
					dateString2,
					props?.match.params.ticker
				)
				await setStock(result)
				const adjustStockTimes = await result?.chart?.result[0]?.timestamp.map(
					(time) => new Date(time * 1000).toLocaleString().split(", ").shift()
				)
				await setStockTimes(adjustStockTimes)
				await setStockPrices(
					result?.chart?.result[0]?.indicators?.quote[0]?.close
				)
			} catch (error) {
				console.log(error)
			}
		}
		callStockApi()
	}, [props])

	return (
		<div>
			<Graph
				time={stockTimes}
				price={stockPrices}
				ticker={props?.match.params.ticker}
			/>
      <div className="percent">
        {percent !== "NaN%" ? <div>{percent} Increase!</div> : ""}
      </div>
      <div className="transaction-container">
			{repTransactions?.map((transaction) => (
				<div key={transaction.id} className="transaction">
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
