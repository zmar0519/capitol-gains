import styles from './Landing.module.css'

const Landing = ({user, senateTrans}) => {
  console.log("senate in landing", senateTrans)
  return (
    <main className={styles.container}>
      <h1>
        hello, {user ? user.name : "friend"}
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