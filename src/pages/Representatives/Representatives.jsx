import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from "react-router-dom"
import SideMenu from '../../components/SideMenu/SideMenu'
import "./Representatives.css"
import RepHeader from "../../components/RepHeader/RepHeader"


const Representatives = (props) => {
  
  return (
    <div className="main-container">
      <div className="menu">
        <SideMenu />
      </div>
      <div className="right-side">
        <div className="rep-header">
          <RepHeader/>
        </div>
        <div className="all-representatives-container">
          {props.representativeList.map((representative) => (
            <Link to={`/representatives/` + representative.name}>
              <div className="representative-container">
                <div className="head-shot">
                  <img
                    className="head-shot"
                    src={representative.image}
                    alt={`${representative.name} head-shot`}
                  />
                </div>
                <div className="representative-name">{representative.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export default withRouter(Representatives)