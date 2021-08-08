import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Line } from "react-chartjs-2"
import getStocks from "../../services/stockApi"
import "./RepTicker.css"

function Graph(props) {
	const state = {
		labels: props.time,
		datasets: [
			{
				label: props.ticker,
				fill: true,
				lineTension: 0.5,
				backgroundColor: "rgba(0,255,0,.5)",
				borderColor: "rgba(0,0,0,1)",
				borderWidth: 2,
				data: props.price,
			},
		],
	}
	return (
		<div>
			<Line
				data={state}
				options={{
					title: {
						display: true,
						text: "Average Rainfall per month",
						fontSize: 20,
					},
					legend: {
						display: false,
						position: "right",
					},
				}}
			/>
		</div>
	)
}

export default Graph
