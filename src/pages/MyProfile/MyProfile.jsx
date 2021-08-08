import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MyProfile.css";



const myProfile = (props) => {
  
  const { _id, avatar, handle } = props.currentUser || {};

  return (
    <div className="profile-page">
        <div className="profile-user-info">
          <img alt="user avatar"></img>
          <h3>Handle Here</h3>
          <h4>Solution Count Here</h4>
          <button>
            <Link to="/home">Home</Link>
          </button>
          <button>Create Post</button>
          <button>Sign Out</button>
      </div>
      <div className="profile-right">
        <div className="profile-post-container">
          <div className="sub-container">
            <div className="profile-posts-header">
              <h3>My WatchList</h3>
            </div>
          </div>
          <div className="user-posts">Posts go here!</div>
        </div>
      </div>
    </div>
  );
};

export default myProfile;
