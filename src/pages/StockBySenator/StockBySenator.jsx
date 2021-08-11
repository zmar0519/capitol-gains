import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import loadingData from "../../assets/Lottie/lf30_editor_hrnlpjer.json"
import LoadingAnimation from "../../components/Misc/LoadingAnimation"

import "./StockBySenator.css"

function StockBySenator(props) {
	const [stock, setStock] = useState([])
	const [stockTimes, setStockTimes] = useState([])
	const [stockPrices, setStockPrices] = useState([])
	const [currentTransactions, setCurrentTransactions] = useState([])
	const [currentTransactionsDates, setCurrentTransactionsDates] = useState([])
	const [percent, setPercent] = useState(null)
	const [epoch, setEpoch] = useState("")

	console.log(props)
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
		async function getSenator() {
			let thisSenator = []
			await props.senatorList?.map(
				(senator) =>
					props.match.params.senatorName === senator.name &&
					thisSenator.push(senator)
			)
			if (thisSenator) {
				props.setCurrentSenator(thisSenator)
			}
		}
		getSenator()
	}, [props.senateTransactions])

	useEffect(() => {
		async function getTransactions() {
			let allSenatorsTransactions = []
			await props.senateTransactions?.map((transaction) => {
				props.match.params.senatorName === transaction.senator &&
					transaction.ticker === props.match.params.ticker &&
					transaction.transaction_date ===
						`${props.match.params.month}/${props.match.params.day}/${props.match.params.year}` &&
					allSenatorsTransactions.push(transaction)
			})
			if (allSenatorsTransactions) {
				console.log(allSenatorsTransactions)
				setCurrentTransactions(allSenatorsTransactions)
			}
		}
		getTransactions()
	}, [props.currentSenator])

	useEffect(() => {
		async function getCurrentTransactionsDates() {
			let transactionDates = await currentTransactions?.map((transaction) => {
				return transaction.transaction_date
			})
			let newDate = await Math.floor(
				new Date(transactionDates).getTime() / 1000
			)

			console.log(newDate)
			await setEpoch(newDate)
			await setCurrentTransactionsDates(newDate)
		}
		getCurrentTransactionsDates()
	}, [currentTransactions])

	useEffect(() => {
		async function callStockApi() {
			const dateString2 = Math.floor(new Date().getTime() / 1000)
			if (epoch) {
				let stockResult = await findRange(
					epoch,
					dateString2,
					props?.match?.params.ticker
				)
				console.log(stockResult)
				setStock(stockResult)
				if (!stockResult?.chart?.result[0]?.timestamp) return
				const adjustStockTimes =
					await stockResult?.chart?.result[0]?.timestamp.map((time) =>
						new Date(time * 1000).toLocaleString().split(", ").shift()
					)
				await setStockTimes(adjustStockTimes)
				await setStockPrices(
					stockResult?.chart?.result[0]?.indicators?.quote[0]?.close
				)
			}
		}
		callStockApi()
	}, [epoch])

	return (
    <div className="main-stock-container">
      <div className="stock-graph-container">
        {!stock?.chart?.result[0]?.timestamp ? (
          <div className="waiting-txt">
            <LoadingAnimation loadingData={loadingData} />
          </div>
        ) : (
          <div className="stock-graph">
            <Graph
              time={stockTimes}
              price={stockPrices}
              ticker={props?.match.params.ticker}
            />
          </div>
        )}
      </div>
      <div className="percent">
        {percent !== "NaN%" ? (
          <div className="percent-txt">
            <strong>Change Since Transaction: {percent} </strong>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="transaction-container">
        {currentTransactions?.map((transaction) => (
          <div key={transaction._id} className="transaction">
            <div>
              <strong>Transaction Made By: </strong>
              {transaction?.senator}
            </div>
            <div>
              <strong>Transaction Amount: </strong>
              {transaction.amount}
            </div>
            <div>
              <strong>Ticker: </strong>
              {transaction.ticker}
            </div>
            <div>
              <strong>Transaction Type: </strong>
              {transaction.type}
            </div>
            <div>
              <strong>Transaction Date: </strong>
              {transaction.transaction_date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(StockBySenator)
