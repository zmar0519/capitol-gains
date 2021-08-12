import React, { useState, useEffect } from "react"
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from "../../components/SideMenu/SideMenu"
import { addRepToWatchlist } from "../../services/repService"
import { getUserSenators } from "../../services/senatorService"
import "./RepresentativeDetails.css"

const RepresentativeDetails = (props) => {
	// const [currentRepresentative, setCurrentRepresentative] = useState([])
	// const [currentRepresentativeTransactions, setCurrentRepresentativeTransactions] = useState([])
	// const [movedStocks, setMovedStocks] = useState([])
	const [owns, setOwns] = useState(false)

		function getOwnership() {
			getUserSenators().then((data) => {
				console.log(data)
				let ownership = false
				data.reps.forEach(rep => {
					if(rep.name === props.match.params.representativeName) {
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
		async function getRepresentative() {
			let thisRepresentative = []
			await props.representativeList?.map(
				(representative) =>
					props.match.params.representativeName === representative.name &&
					thisRepresentative.push(representative)
			)
			if (thisRepresentative) {
				props.setCurrentRepresentative(thisRepresentative)
				getTransactions()
			}
		}
		getRepresentative()
	}, [props.houseTransactions])

	async function getTransactions() {
		let allRepresentativesTransactions = []
		await props.houseTransactions.map((transaction) => {
			props.match.params.representativeName === transaction.representative &&
				transaction.ticker !== "--" &&
				transaction.ticker !== "N/A" &&
				allRepresentativesTransactions.push(transaction)
		})
		if (allRepresentativesTransactions) {
			allRepresentativesTransactions.sort(compareDates)
			props.setCurrentRepresentativeTransactions(allRepresentativesTransactions)
			getOwnership()
		}
	}
	useEffect(() => {
		async function getMovedStocks() {
			let movingStocks = []
			await props.currentRepresentativeTransactions?.map((eachTransaction) => {
				if (!movingStocks.includes(eachTransaction?.ticker)) {
					movingStocks.push(eachTransaction?.ticker)
				}
			})
			movingStocks.sort()
			props.setMovedStocks(movingStocks)
		}
		getMovedStocks()
	}, [props.currentRepresentativeTransactions])

	return (
		<div className="main-container">
			<div className="representative-container">
				<div className="head-shot">
					<img
						className="head-shot"
						src={props.currentRepresentative[0]?.image}
						alt={`${props.currentRepresentative[0]?.name} head-shot`}
					/>
				</div>
				<div className="representative-name">
					{props.currentRepresentative[0]?.name}
				</div>
				{!owns ?
					<button
						type="button"
						className="watchList-button"
						onClick={() => {
							addRepToWatchlist({
								name: props.currentRepresentative[0].name,
								party: props.currentRepresentative[0].party,
								state: props.currentRepresentative[0].state,
								image: props.currentRepresentative[0].image,
							}).then(res => {
								console.log("this one", res)
							})
							
							setTimeout(() => {
								getOwnership()
							}, 1000); 
						}}
					>
						Add To WatchList
					</button>
					: <button className="watchList-button-watched">Watching</button>	
				}
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
					{props.currentRepresentativeTransactions?.map(
						(eachTransaction) =>
							eachTransaction.type === "purchase" && (
								<Link
									to={
										`/representatives/` +
										props.match.params.representativeName +
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
					{props.currentRepresentativeTransactions?.map(
						(eachTransaction) =>
							eachTransaction.type !== "purchase" && (
								<Link
									to={
										`/representatives/` +
										props.match.params.representativeName +
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
	)
}

export default withRouter(RepresentativeDetails)
