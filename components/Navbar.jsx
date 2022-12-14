import styles from '../styles/Home.module.css'
import Image from 'next/image'


const Navbar = () => {
    return ( 
        <nav className='.nav'>
            <div style={{ padding: '0px' }} className={styles.logo_container}>
                <a href="https://basketcoin.io">
                    <Image className={styles.logo} src={'/logo.png'} width='204' height='43' priority />
                </a>
                <span className={styles.text}>Wymiana</span>
            </div>
        </nav>
     );
}
 
export default Navbar;
