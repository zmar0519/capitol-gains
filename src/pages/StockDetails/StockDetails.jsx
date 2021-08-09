import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Line } from "react-chartjs-2"
import { findRange } from "../../services/stockApiService"
import Graph from "../../components/StockGraph/Graph"
import "./StockDetails.css"



const StockDetails = (props) => {
  console.log(props)
  return (
    <div>Stock Details Page</div>
  )
}


export default StockDetails