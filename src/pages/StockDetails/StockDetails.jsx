import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import "./StockDetails.css"
import SenHeader from "../../components/SenHeader/SenHeader";
import RepHeader from "../../components/RepHeader/RepHeader"
import loadingData from "../../assets/Lottie/lf30_editor_hrnlpjer.json"
import LoadingAnimation from "../../components/Misc/LoadingAnimation"




const StockDetails = (props) => {
  console.log(props)
  const [stock, setStock] = useState([])
  const [stockTimes, setStockTimes] = useState([])
	const [stockPrices, setStockPrices] = useState([])
  const [repsWithTrans, setRepsWithTrans] = useState([])
  const [senateWithTrans, setSenateWithTrans] = useState([])

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
  }, [props])

  useEffect(() => {
    async function getSortedReps() {
      let sortReps = []
       await props.houseTransactions.map(transaction => {
        if(transaction.ticker === props.match?.params.ticker && !sortReps.includes(transaction.representative)){
          sortReps.push(transaction.representative)
          console.log(sortReps)
  
        }
      })
      setRepsWithTrans(sortReps)
    }
    async function getSortedSenate() {
      let sortSenate = []
       await props.senateTransactions.map(transaction => {
        if(transaction.ticker === props.match?.params.ticker && !sortSenate.includes(transaction.representative)){
          sortSenate.push(transaction.senator)
          console.log(sortSenate)
  
        }
      })
      setSenateWithTrans(sortSenate)
    }
    getSortedSenate()
    getSortedReps()
  }, [props]);

  return (
    <div className="main-stock-container">
      <div className="stock-graph-container">
        {!stock?.chart?.result[0]?.timestamp ? (
            <div className="waiting-txt"><LoadingAnimation loadingData={loadingData}/></div>
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
      <div className="lower-section">
        <div className="rep">
          <div className="rep-list-txt">Representatives</div>
          <div className="profile-inner-sen-rep-container">
            {repsWithTrans
              ? props.representativeList.map(
                  (representative) =>
                    repsWithTrans.includes(representative.name) && (
                      <Link to={`/representatives/` + representative.name}>
                        <div className="profile-senator-container profile-senate-contain">
                          <div className="profile-head-shot">
                            <img
                              className="profile-head-shot"
                              src={representative.image}
                              alt={`${representative.name} head-shot`}
                            />
                          </div>
                          <div className="profile-senator-name">
                            {representative.name}
                          </div>
                        </div>
                      </Link>
                    )
                )
              : ""}
          </div>
        </div>
        <div className="sen">
            <div className="sen-list-txt">
              Senators 
            </div>
            <div className="profile-inner-sen-rep-container">
              {senateWithTrans
                && props.senatorList.map(
                  (senator) =>
                    senateWithTrans.includes(senator.name) && (
                      <Link to={`/senators/` + senator.name}>
                        <div className="profile-senator-container profile-senate-contain">
                          <div className="profile-head-shot">
                            <img
                              className="profile-head-shot"
                              src={senator.image}
                              alt={`${senator.name} head-shot`}
                            />
                          </div>
                          <div className="profile-senator-name">{senator.name}</div>
                        </div>
                      </Link>
                    )
                )
              }
            </div>
        </div>
      </div>
    </div>

  );
}


export default withRouter(StockDetails)