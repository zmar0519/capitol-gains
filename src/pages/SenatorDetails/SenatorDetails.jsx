import React, { useState, useEffect } from "react"
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from "../../components/SideMenu/SideMenu"
import "./SenatorDetails.css"

const SenatorDetails = (props) => {
	// const [currentSenator, setCurrentSenator] = useState([])
  // const [currentSenatorTransactions, setCurrentSenatorTransactions] = useState([])


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
			if(thisSenator) {
        props.setCurrentSenator(thisSenator) 
        getTransactions()
      }
		}
		getSenator()
	}, [props.senateTransactions])
  
  async function getTransactions(){
    let allSenatorsTransactions = []
    await props.senateTransactions.map(transaction => {
      props.match.params.senatorName === transaction.senator 
      && transaction.ticker !== "--" 
      && transaction.ticker !== "N/A" 
      && allSenatorsTransactions.push(transaction)
    })
    if (allSenatorsTransactions) {
			allSenatorsTransactions.sort(compareDates)
      props.setCurrentSenatorTransactions(allSenatorsTransactions)
    }
  }
	useEffect(() => {
    async function getMovedStocks() {
      let movingStocks= []
      await props.currentSenatorTransactions?.map(eachTransaction => {
        if (!movingStocks.includes(eachTransaction?.ticker)) {
          movingStocks.push(eachTransaction?.ticker)
        }
      })
      movingStocks.sort()
      props.setMovedStocks(movingStocks)
    }
    getMovedStocks()
  }, [props.currentSenatorTransactions]);

	return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>
      <div className="senator-container">
        <div className="head-shot">
          <img
            className="head-shot"
            src={props.currentSenator[0]?.image}
            alt={`${props.currentSenator[0]?.name} head-shot`}
          />
        </div>
        <button type="button" id="watchList-button">
          Add To WatchList
        </button>
        <div className="senator-name">{props.currentSenator[0]?.name}</div>
        <div className="stocks-held-container">
          <div className="stocks-held-title-txt">Stock Interactions</div>
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
                    <div>{eachTransaction.ticker}</div>
                    <div>{eachTransaction.amount}</div>
                    <div>{eachTransaction.transaction_date}</div>
                    <div>{eachTransaction.type}</div>
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
                    <div>{eachTransaction.ticker}</div>
                    <div>{eachTransaction.amount}</div>
                    <div>{eachTransaction.transaction_date}</div>
                    <div>{eachTransaction.type}</div>
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
