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
		async function getRepresentative() {
			let thisRepresentative = []
			await props.representativeList?.map(
				(representative) =>
					props.match.params.representativeName === representative.name &&
					thisRepresentative.push(representative)
			)
			if(thisRepresentative) {
        props.setCurrentRepresentative(thisRepresentative) 
      }
		}
		getRepresentative()
	}, [props.houseTransactions])

  useEffect(() => {
    async function getTransactions(){
      let allRepresentativesTransactions = []
      await props.houseTransactions?.map(transaction => {
        props.match.params.representativeName === transaction.representative 
        && transaction.ticker === props.match.params.ticker
        && transaction.transaction_date === props.match.params.date
        && allRepresentativesTransactions.push(transaction)
      })
      if (allRepresentativesTransactions) {
        console.log(allRepresentativesTransactions)
        await setCurrentTransactions(allRepresentativesTransactions)
      }
    }
    getTransactions()
  }, [props.currentRepresentative]);

  useEffect(() => {    
    async function getCurrentTransactionsDates() {
      let transactionDates = await currentTransactions?.map(transaction => {
        let date = transaction.transaction_date
        let unfixed = date.split("-")
        let year = unfixed.shift()
        unfixed.push(year)
        let fixed = unfixed.join("/")
        return fixed  
      })
      let newDate = await (Math.floor(
        new Date(transactionDates).getTime() / 1000
      ))
      
        console.log(newDate)
      await setEpoch(newDate)
      await setCurrentTransactionsDates(newDate)
    }
    getCurrentTransactionsDates()
  }, [currentTransactions]);


  useEffect(() => {
    async function callStockApi(){
      const dateString2 = Math.floor(new Date().getTime() / 1000)
      if (epoch){
        let stockResult = await findRange(
          epoch,
          dateString2,
          props?.match?.params.ticker
        )
        console.log(stockResult)
        setStock(stockResult)
        if (!stockResult?.chart?.result[0]?.timestamp) return
        const adjustStockTimes = await stockResult?.chart?.result[0]?.timestamp.map(
          (time) => new Date(time * 1000).toLocaleString().split(", ").shift()
        )
        await setStockTimes(adjustStockTimes)
        await setStockPrices(
          stockResult?.chart?.result[0]?.indicators?.quote[0]?.close
        )
      }
    }
      callStockApi()
  }, [epoch]);


	return (
    <div>
      <div className="left-upper-corner">
        <div className="stock-graph-container">
          {!stock?.chart?.result[0]?.timestamp ? (
            <div className="waiting-txt">Waiting for data</div>
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
      </div>
      <div className="percent">
        {percent !== "NaN%" ? (
          <div>{percent} Change Since Transaction</div>
        ) : (
          ""
        )}
      </div>
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
  );
}

export default withRouter(StockByRep)
