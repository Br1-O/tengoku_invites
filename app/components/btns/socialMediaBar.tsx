import { FacebookIcon, InstagramIcon, MailIcon, YoutubeIcon } from 'lucide-react';
import styles from './socialMediaBar.module.css';

const SocialMediaBar = () => {
  return (
    <div className={`${styles.card} flex flex-row justify-center items-center flex-wrap`}>
        <a className={`${styles.socialContainer} ${styles.containerFour}`} href="mailto: tengokuimperial@gmail.com" title='¡Mandanos un email!' aria-label='icono email'>
            <MailIcon className={`w-8 h-8 ${styles.socialIcon}`}/>
        </a>

        <a className={`${styles.socialContainer} ${styles.containerOne}`} href="https://www.instagram.com/tengokuanime" title='¡Visitanos en Instagram!' aria-label='icono instagram'>
            <InstagramIcon className={`w-8 h-8 ${styles.socialIcon}`} />        
        </a>
        
        <a className={`${styles.socialContainer} ${styles.containerTwo}`} href="https://www.facebook.com/ConvencionTengoku" title='¡Visitanos en Facebook!' aria-label='icono facebook'>
            <FacebookIcon className={`w-8 h-8 ${styles.socialIcon}`} />
        </a>          

        <a className={`${styles.socialContainer} ${styles.containerThree}`} href="https://www.youtube.com/@Tengokuimperial23" title='¡Mirá nuestros videos!' aria-label='icono youtube'>
            <YoutubeIcon className={`w-8 h-8 ${styles.socialIcon}`} />
        </a>

        <a className={`${styles.socialContainer} ${styles.containerFour}`} href="mailto: tengoku.imperial.games@gmail.com" title='¡Mandanos un email!' aria-label='icono email'>
            <MailIcon className={`w-8 h-8 ${styles.socialIcon}`} />
        </a>
    </div>             
  );
};

export default SocialMediaBar;