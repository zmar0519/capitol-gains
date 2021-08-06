import React from 'react'
import LoginForm from '../../components/Login/Login'
import styles from './Login.css'

const LoginPage = (props) => {
  return (
    <main className={styles.container}>
      <h1>Log In</h1>
      <LoginForm handleSignupOrLogin={props.handleSignupOrLogin}/>
    </main>
  )
}
 
export default LoginPage
