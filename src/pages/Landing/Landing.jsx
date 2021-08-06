import styles from './Landing.css'
import SideMenu from '../../components/SideMenu/SideMenu'

const Landing = ({user, senateTrans}) => {
  console.log("senate in landing", senateTrans)
  return (
    <main className={styles.container}>
      
        
      
      <div>
        <SideMenu />
      </div>
    </main>
  )
}
 
export default Landing