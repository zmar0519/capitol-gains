import React from "react";
import "./Auth.css";

// Assets

// Services


const SignUp = (props) => {
  return (
    <div className="signup-page">
        <div className="form-container">
          <div className="title-container">
            <h1>Create an Account</h1>
          </div>
          <form className="register-form">Inputs Here</form>
        </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from 'react'
// import SignupForm from '../../components/SignupForm/SignupForm'
// import styles from './Signup.module.css'

// const Signup = (props) => {
//   const [message, setMessage] = useState()

//   const updateMessage = msg => {
//     setMessage(msg)
//   }

//   return (
//     <main className={styles.container}>
//       <h1>Join the Club</h1>
//       {message && <p>{message}</p> }
//       <SignupForm
//         updateMessage={updateMessage}
//         handleSignupOrLogin={props.handleSignupOrLogin}
//       />
//     </main>
//   )
// }

// export default Signup
