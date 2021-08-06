import styles from './Landing.css'
import SideMenu from '../../components/SideMenu/SideMenu'

const Landing = ({user}) => {
  return (
    <main className={styles.container}>
      
        
      
      <div>
        <SideMenu />
      </div>
    </main>
  )
}
 
export default Landing