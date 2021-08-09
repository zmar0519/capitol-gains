import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import "./StockDetails.css"



const StockDetails = (props) => {
  console.log(props)
  const [stock, setStock] = useState([])
  const [stockTimes, setStockTimes] = useState([])
	const [stockPrices, setStockPrices] = useState([])

  useEffect(() => {
    async function callStockApi(){
      const dateString2 = Math.floor(new Date().getTime() / 1000)
      if (props.match) {
        let stockResult = await findRange(
          1596988916,
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
  }, [props]);

  return (
    <div>Stock Details Page
            {
        !stock?.chart?.result[0]?.timestamp ? 
        <div>Waiting for data</div>
        :
        <Graph
          time={stockTimes}
          price={stockPrices}
          ticker={props?.match.params.ticker}
        />
      }

    </div>
  )
}


export default withRouter(StockDetails)