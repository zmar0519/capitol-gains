import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./RepresentativeDetails.css"


const RepresentativeDetails = (props) => {
  console.log("representativeDetails", props)


  return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>

      <div>representative details</div>

    </div>
  )
}

export default withRouter(RepresentativeDetails)