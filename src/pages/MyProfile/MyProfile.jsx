import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MyProfile.css";
import "../../components/CreateComponents/CreateFollowing/CreateFollowing"
import CreateFollowing from "../../components/CreateComponents/CreateFollowing/CreateFollowing";
import { getUserSenators } from "../../services/senatorService";


const MyProfile = (props) => {


  const [userData, setUserData] = useState("")


  useEffect(() => {
    function grabSenRepData(){
      getUserSenators()
      .then(data => {
        setUserData(data)
        console.log(data.reps)
      })
    }
    grabSenRepData()
  }, []);
  
  const { _id, avatar, handle } = props.currentUser || {};

  return (
    <div className="profile-page">
        <div className="profile-user-info">
          <img className="profile-image" src={avatar} alt="user avatar"></img>
          <div>{handle}</div>
        </div>
        <div className="profile-senator-rep-container">
          <div>
            <div>
              Representatives You Follow
            </div>
            <div>
              {userData?.reps?.map(rep => (
                <Link to={`/representatives/` + rep.name}>
                <div className="representative-container rep-contain">
                  <div className="head-shot">
                    <img
                      className="head-shot"
                      src={rep.image}
                      alt={`${rep.name} head-shot`}
                    />
                  </div>
                  <div className="representative-name">{rep.name}</div>
                </div>
              </Link>
              ))}
            </div>
          </div>
          <div>
            <div>
              Senators You Follow
            </div>
            <div>
              {userData?.senators?.map(senator => (
              <Link to={`/senators/` + senator.name}>
              <div className="senator-container senate-contain">
                <div className="head-shot"><img className="head-shot" src={senator.image} alt={`${senator.name} head-shot`} /></div>
                <div className="senator-name">{senator.name}</div>
              </div>
              </Link>
              ))}
            </div>
          </div>
        </div>
    </div>
  
  );
};

export default MyProfile;
