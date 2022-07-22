import './AboutMe.css';
import photo from '../../images/photo.jpg'
import linkSite from '../../images/link-site.svg'

function AboutMe() {
    return (
        <section className='aboutMe'>

            <h2 className='aboutMe__title'>Студент</h2>
            <div className='aboutMe__container'>
                <div className='aboutMe__container-profile'>
                    <p className='aboutMe__name'>Олег</p>
                    <p className='aboutMe__work'>Фронтенд-разработчик, 23 года</p>

                    <p className='aboutMe__description'>Здесь могла быть моя история, но ее не будет.</p>
                    <div >
                        <a href='https://github.com/OlegKolovanov' target='_blank' rel="noreferrer" className='aboutMe__link'>Github</a>
                        <a href='https://tlgg.ru/@OlegKolovanov' target='_blank' rel="noreferrer" className='aboutMe__link'>Telegram</a>
                    </div>
                </div>
                <img className='aboutMe__photo' src={photo} alt='Моя фотография' />
            </div>
            <h3 className='aboutMe__subtitle'>Портфолио</h3>
            <div className='aboutMe__container-portfolio'>
                <p className='aboutMe__site'>Статичный сайт</p>
                <a className='aboutMe__site-button' target="_blank" href=' https://olegkolovanov.github.io/how-to-learn/' rel="noreferrer"><img src={linkSite} alt='Ссылка' /></a>
            </div>
            <div className='aboutMe__container-portfolio'>
                <p className='aboutMe__site'>Адаптивный сайт</p>
                <a className='aboutMe__site-button' target="_blank" href='https://olegkolovanov.github.io/russian-travel/' rel="noreferrer"><img src={linkSite} alt='Ссылка' /></a>
            </div>
            <div className='aboutMe__container-portfolio'>
                <p className='aboutMe__site'>Одностраничное приложение</p>
                <a className='aboutMe__site-button' target="_blank" href='https://olegkolovanovfront.nomoredomains.xyz/' rel="noreferrer"><img src={linkSite} alt='Ссылка' /></a>
            </div>
        </section>
    );
}

export default AboutMe;