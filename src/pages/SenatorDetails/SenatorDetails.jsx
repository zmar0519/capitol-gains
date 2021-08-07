import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./SenatorDetails.css"


const SenatorDetails = (props) => {

  const [currentSenator, setCurrentSenator] = useState([])

  useEffect(() => {
    async function getSenator(){
      console.log(props)
      let thisSenator = []
      await props.senatorList?.map(senator => (
        props.match.params.senatorName === senator.name && thisSenator.push(senator)
      ))
      setCurrentSenator(thisSenator)
    }
    getSenator()
    
  }, [props]);

  return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>

      <div>senator details</div>
    </div>
  )
}

export default withRouter(SenatorDetails)