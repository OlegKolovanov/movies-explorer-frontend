import './SearchForm.css'

function SearchForm() {
    return (
        <form className='search'>
            <input className='search__input' placeholder='Фильм'></input>
            <button type='button' className='search__button'>Поиск</button>
            <button type='button' className='search__checkbox'>Короткометражки</button>
        </form>
    )
}

export default SearchForm;