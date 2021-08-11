import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./UpdateProfile.css";
import moon from "../../assets/Avatars/moon.png";

// Assets

// Services
import { signup } from "../../services/userService";

// Components
import AvatarSelection from "../AvatarSelection/AvatarSelection";

const UpdateProfile = (props) => {
  const [popup, setPopup] = useState(false);
  const history = useHistory();
  const [authError, setAuthError] = useState(false);
  const [formData, setFormData] = useState({
    handle: "",
    email: "",
    password: "",
    avatar: moon,
  });

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      props.handleSignupOrLogin();
      history.push("/");
    } catch (error) {
      setAuthError(error.message);
      setFormData({
        handle: "",
        email: "",
        password: "",
        avatar: moon,
      });
    }
  };

  return (
    <div className="signup-page">
      {popup && (
        <AvatarSelection
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      )}

      <div className="form-container">
        <div className="title-container">
          <h1>Update Profile</h1>
          {authError ? <h3>{authError}</h3> : <h3>Invest Like Politicians</h3>}
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={formData.handle}
            autoComplete="off"
            required
            name="handle"
            type="text"
            placeholder="New Username"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            autoComplete="off"
            required
            name="email"
            type="email"
            placeholder="Email"
          />

          <input
            onChange={handleChange}
            value={formData.password}
            autoComplete="off"
            required
            name="password"
            type="password"
            placeholder="Password"
          />

          <button id="profilePic-button" type="button" onClick={handlePopup}>
            Change Profile Picture
          </button>
        </form>

        <div className="redirect-container">
          <Link className="redirect-link" to="/myProfile">
            <p>Submit Changes</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
