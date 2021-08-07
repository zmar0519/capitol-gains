import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./Senators.css"



const Senators = (props) => {
  console.log(props)
  return (
    
    <div className="main-container">
      <div className="menu">
      <SideMenu />
      </div>
      <div className="all-senators-container">
        {props.senatorList.map(senator => (
          <Link to={`/senators/` + senator.name}>
            <div className="senator-container">
              <div className="head-shot"><img className="head-shot" src={senator.image} alt={`${senator.name} head-shot`} /></div>
              <div className="senator-name">{senator.name}</div>
            </div>
          </Link>
        ))}

      </div>

    </div>
  )
}

export default Senators