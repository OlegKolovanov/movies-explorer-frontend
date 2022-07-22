import "./NavTab.css"
import { Link } from "react-router-dom";

function NavTab() {
  return (
    <nav className='nav'>
      <Link className='nav__signup' to='/signup'>Регистрация</Link>
      <Link className='nav__signin' to='/signin'>Войти</Link>
    </nav>
  )
}

export default NavTab;