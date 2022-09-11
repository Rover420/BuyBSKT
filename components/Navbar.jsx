import styles from '../styles/Home.module.css'
import Image from 'next/image'


const Navbar = () => {
    return ( 
        <nav className='.nav'>
            <div className={styles.logo_container}>
                <a href="https://basketcoin.io">
                    <Image className={styles.logo} src={'/logo.png'} width='204' height='43' priority />
                </a>
                <span className={styles.text}>Purchase</span>
            </div>
        </nav>
     );
}
 
export default Navbar;