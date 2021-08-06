import React, { useState, components } from "react";
import Avatar from "react-avatar";
import { useHistory, Link } from "react-router-dom";
import "./Auth.css";
import moon from "../../assets/avatars/moon.png";

// Assets


// Services
import { signup } from "../../services/authService";

// Components
import AvatarSelection from "./AvatarSelection/AvatarSelection";
// import Animation from "../../components/misc/Animation";

const SignUp = (props) => {
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
      history.push("/home");
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

      {popup && 
        <AvatarSelection
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      }
    
      <div className="form-container">
        <div className="title-container">
            <h1>Create an Account</h1>
            {authError ? (
              <h3>{authError}</h3>
            ) : (
              <h3>Social media for developers</h3>
            )}
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={formData.handle}
              autoComplete="off"
              required
              name="handle"
              type="text"
              placeholder="Username"
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
              Upload/Select a Profile Picture
            </button>

            <button id="submit-button" type="submit">
              SIGN UP
            </button>
          </form>

          <div className="redirect-container">
            <p>Already have an account?</p>
            <Link className="redirect-link" to="/signin">
              <p>Sign In</p>
            </Link>
          </div>
        </div>
     
    </div>
  )
    }

export default SignUp;
