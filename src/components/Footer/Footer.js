import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation()
  return (
    <footer className={location.pathname === '/' ? 'footer footer_landing' : 'footer'}>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум x BeatFilm</h2>
      <div className='footer__container'>
        <p className='footer__data'>@2022</p>
        <div className='footer__container-link'>
          <a className='footer__link' target="_blank" rel="noreferrer" href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          <a className='footer__link' target="_blank" rel="noreferrer" href='https://github.com/OlegKolovanov'
          >Github</a>
          <a className='footer__link' target="_blank" rel="noreferrer" href='https://tlgg.ru/@OlegKolovanov'>Telegram</a>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
