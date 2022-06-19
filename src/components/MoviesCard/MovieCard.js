import './MovieCard.css'
import pick1 from '../../images/firstpicture.jpeg'
import { useLocation } from 'react-router-dom';

function MovieCard() {
    const location = useLocation()
    return (
        <>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
            <div className='moviecard'>
                <img src={pick1} className='moviecard__image' alt='постер фильма'></img>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>33 слова о дизайне</h2>
                    <button type='button' className={location.pathname === '/movies' ? 'moviecard__like' : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>1ч 42м</p>
            </div>
        </>
    )
}

export default MovieCard;