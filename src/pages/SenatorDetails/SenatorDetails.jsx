import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import {
	addSenToWatchlist,
	getUserSenators,
} from "../../services/senatorService"
import "./SenatorDetails.css"

const SenatorDetails = (props) => {
	const [owns, setOwns] = useState(false)

	function getOwnership() {
		getUserSenators().then((data) => {
			let ownership = false
			data.senators.forEach((sen) => {
				if (sen.name === props.match.params.senatorName) {
					console.log(props.match.params.senatorName)
					ownership = true
				}
			})
			setOwns(ownership)
		})
	}

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
		async function getSenator() {
			let thisSenator = []
			await props.senatorList?.map(
				(senator) =>
					props.match.params.senatorName === senator.name &&
					thisSenator.push(senator)
			)
			if (thisSenator) {
				props.setCurrentSenator(thisSenator)
				getTransactions()
			}
		}
		getSenator()
	}, [props.senateTransactions])

	async function getTransactions() {
		let allSenatorsTransactions = []
		await props.senateTransactions.map((transaction) => {
			props.match.params.senatorName === transaction.senator &&
				transaction.ticker !== "--" &&
				transaction.ticker !== "N/A" &&
				allSenatorsTransactions.push(transaction)
		})
		if (allSenatorsTransactions) {
			allSenatorsTransactions.sort(compareDates)
			props.setCurrentSenatorTransactions(allSenatorsTransactions)
			getOwnership()
		}
	}
	useEffect(() => {
		async function getMovedStocks() {
			let movingStocks = []
			await props.currentSenatorTransactions?.map((eachTransaction) => {
				if (!movingStocks.includes(eachTransaction?.ticker)) {
					movingStocks.push(eachTransaction?.ticker)
				}
			})
			movingStocks.sort()
			props.setMovedStocks(movingStocks)
		}
		getMovedStocks()
	}, [props.currentSenatorTransactions])

	return (
    <div className="main-container">
      <div className="senator-container">
        <div className="head-shot">
          <img
            className="head-shot"
            src={props.currentSenator[0]?.image}
            alt={`${props.currentSenator[0]?.name} head-shot`}
          />
        </div>
        <div className="senator-name">{props.currentSenator[0]?.name}</div>
        {!owns ? (
          <button
            type="button"
            className="watchList-button"
            onClick={() => {
              addSenToWatchlist({
                name: props.currentSenator[0].name,
                party: props.currentSenator[0].party,
                state: props.currentSenator[0].state,
                image: props.currentSenator[0].image,
              });
              setTimeout(() => {
                getOwnership();
              }, 1000);
            }}
          >
            Add To WatchList
          </button>
        ) : (
          <button className="watchList-button-watched">Watching</button>
        )}
        <div className="stocks-held-container">
          <div className="stocks-held-title-txt">Stocks Held</div>
          <div className="each-stock-ticker-container">
            {props.movedStocks?.map((eachStockTicker) => (
              <Link to={"/stocks/" + eachStockTicker}>
                <div className="each-stock-ticker">{eachStockTicker}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="sale-buy-container">
        <div className="purchase-txt">Purchases:</div>
        <div className="all-transaction-container">
          {props.currentSenatorTransactions?.map(
            (eachTransaction) =>
              eachTransaction.type === "Purchase" && (
                <Link
                  to={
                    `/senators/` +
                    props.match.params.senatorName +
                    "/" +
                    eachTransaction.ticker +
                    "/" +
                    eachTransaction.transaction_date
                  }
                >
                  <div
                    className="transaction-container-purchase"
                    key={eachTransaction._id}
                  >
                    <div className="purchase-ticker">
                      {eachTransaction.ticker}
                    </div>
                    <div className="purchase-amount">
                      {eachTransaction.amount}
                    </div>
                    <div className="purchase-date">
                      {eachTransaction.transaction_date}
                    </div>
                    <div className="purchase-type">{eachTransaction.type}</div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
      <div className="sale-buy-container">
        <div className="sale-txt">Sales:</div>
        <div className="all-transaction-container">
          {props.currentSenatorTransactions?.map(
            (eachTransaction) =>
              eachTransaction.type !== "Purchase" && (
                <Link
                  to={
                    `/senators/` +
                    props.match.params.senatorName +
                    "/" +
                    eachTransaction.ticker +
                    "/" +
                    eachTransaction.transaction_date
                  }
                >
                  <div className="transaction-container-sale">
                    <div className="sale-ticker">{eachTransaction.ticker}</div>
                    <div className="sale-amount">{eachTransaction.amount}</div>
                    <div className="sale-date">
                      {eachTransaction.transaction_date}
                    </div>
                    <div className="sale-type">{eachTransaction.type}</div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(SenatorDetails)
