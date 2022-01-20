import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import { MdDuo } from 'react-icons/md'

import styles from './Footer.module.css'

function Footer() {
  return(
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><MdDuo /></li>
        <li><FaFacebook /></li>
        <li><FaInstagram /></li>
        <li><FaLinkedin /></li>
        <li><FaYoutube /></li>
      </ul>
      <p className={styles.copy_right}>
        <span>Is Project</span> &copy; 2022
      </p>
    </footer>
  );
}

export default Footer;