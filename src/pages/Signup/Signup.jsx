import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import "./Signup.css"
import moon from "../../assets/Avatars/moon.png"

// Assets

// Services
import { signup } from "../../services/authService"

// Components
import AvatarSelection from "../AvatarSelection/AvatarSelection"

const SignUp = (props) => {
	const [popup, setPopup] = useState(false)
	const history = useHistory()
	const [authError, setAuthError] = useState(false)
	const [formData, setFormData] = useState({
		handle: "",
		email: "",
		password: "",
		avatar: moon,
	})

	const handlePopup = () => {
		setPopup(!popup)
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await signup(formData)
			props.handleSignupOrLogin()
			history.push("/")
		} catch (error) {
			setAuthError(error.message)
			setFormData({
				handle: "",
				email: "",
				password: "",
				avatar: moon,
			})
		}
	}

	return (
    <div className="signup-page">
      {popup && (
        <AvatarSelection
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      )}

      <div className="sign-upform-container">
        <div className="signup-title-container">
          <div id="two-titles">
            <h1 id="create-an-account">Create an Account</h1>
            {authError ? (
              <h3>{authError}</h3>
            ) : (
              <h3 className="sub">Invest Like Politicians</h3>
            )}
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              id="input-Username"
              onChange={handleChange}
              value={formData.handle}
              autoComplete="off"
              required
              name="handle"
              type="text"
              placeholder="Username"
            />
            <input
              id="input-Email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="off"
              required
              name="email"
              type="email"
              placeholder="Email"
            />

            <input
              id="input-Password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="off"
              required
              name="password"
              type="password"
              placeholder="Password"
            />

            <button id="select-profilePic-button" type="button" onClick={handlePopup}>
              Select a Profile Picture
            </button>

            <button id="submit-signup-btn" type="submit">
              SIGN UP
            </button>
          </form>

          <div className="redirect-container">
            <p id="sign-up-question">Already Signed Up?</p>
            <Link className="redirect-link" to="/signin">
              <p id="sign-in">
                Sign In
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp
