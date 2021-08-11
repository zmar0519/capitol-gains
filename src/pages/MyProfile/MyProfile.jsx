import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MyProfile.css";
import "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import CreateFollowing from "../../components/CreateComponents/CreateFollowing/CreateFollowing";
import { getUserSenators } from "../../services/senatorService";



const MyProfile = (props) => {
  useEffect(() => {
    function grabSenRepData(){
      getUserSenators()
      .then(data => {
        console.log(data)
      })

    }
    grabSenRepData()
  }, []);
  
  const { _id, avatar, handle } = props.currentUser || {};

  return (
    <div className="profile-page">
        <div className="profile-user-info">
          <img src={avatar} alt="user avatar"></img>
          <button className="home-button">
            <Link to="/">Home</Link>
          </button>
          <button>Sign Out</button>
      </div>
      <div className="profile-watchlist">
        <div className="profile-post-container">
          <div className="sub-container">
            <div className="profile-posts-header">
              <h3>My Watchlist</h3>
            </div>
          </div>
          <div className="user-posts">Watchlists got here!</div>
        </div>
      </div>
      <div className="following-form">
      <CreateFollowing/>
      </div>
    </div>
  
  );
};

export default MyProfile;
