import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./Representatives.css"


const Representatives = (props) => {

  return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>
      <div className="all-representatives-container">
        {props.representativeList.map(representative => (
          <div className="representative-container">
            <div className="head-shot"><img className="head-shot" src={representative.image} alt={`${representative.name} head-shot`} /></div>
            <div className="representative-name">{representative.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Representatives