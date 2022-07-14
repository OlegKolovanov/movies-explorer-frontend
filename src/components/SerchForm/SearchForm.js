import { React, useState, useEffect } from 'react';
import './SearchForm.css'
import { useLocation } from 'react-router-dom';

function SearchForm(props) {

    const location = useLocation()

    const [input, setInput] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (input.length > 0) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [input])



    function handleInput(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (isValid === true) {
            location.pathname === '/movies' ? props.handleSearchForm(input) : props.handleSaveSearchForm(input)
            setError(false)
        } else {
            setError(true)
        }
    }
    return (
        <>
            <form className='search' onSubmit={handleSubmit}>
                <input className={error ? 'search__input search__input_error' : 'search__input'} name='search' placeholder='Фильм' required value={input} onChange={handleInput}></input>
                <button type='submit' className='search__button' >Поиск</button>
                <div className='search__container'>
                    <span className={error ? 'search__error_active' : 'search__error'}>Введите ключевое слово</span>
                </div>
            </form>
            <div className="search__checkbox">
                <input
                    className="search__checkbox-input"
                    type="checkbox"
                    name="filter-checkbox"
                    id="filter-checkbox"
                    value='false'
                    onChange={location.pathname === '/movies' ? props.sortMovie : props.sortSaveMovie}
                    checked={location.pathname === '/movies' ? props.checked : props.checkedSave}
                />
                <label
                    htmlFor="filter-checkbox"
                    className="search__checkbox-label"
                >
                    Короткометражки
                </label>
            </div>
        </>
    )
}

export default SearchForm;