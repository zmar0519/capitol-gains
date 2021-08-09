import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MyProfile.css";
import "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import CreateFollowing from "../../components/CreateComponents/CreateFollowing/CreateFollowing";
import { createWatchlist } from "../../services/watchlistService";



const MyProfile = (props) => {
  
  
  const { _id, avatar, handle } = props.currentUser || {};

  return (
    <div className="profile-page">
        <div className="profile-user-info">
          <img src={avatar} alt="user avatar"></img>
          <h3>Handle Here</h3>
          <button className="home-button">
            <Link to="/">Home</Link>
          </button>
          <button>Sign Out</button>
      </div>
      <div className="profile-watchlist">
        <div className="profile-post-container">
          <div className="sub-container">
            <div className="profile-posts-header">
              <h3>My Watchlists</h3>
            </div>
            <div></div>
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
