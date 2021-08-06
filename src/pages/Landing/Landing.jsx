import styles from './Landing.css'

const Landing = ({user, senateTrans}) => {
  console.log("senate in landing", senateTrans)
  return (
    <main className={styles.container}>
      <h1>
        Hello, {user ? user.handle : "gang"}
      </h1>
      <div>
        {senateTrans.map(transaction => (
          <div>{transaction.senator}</div>
        ))}
      </div>
    </main>
  )
}
 
export default Landing