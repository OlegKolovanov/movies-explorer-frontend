import React from "react"
import "./Logo.css"
import { Link } from "react-router-dom"
import header from '../../images/header.svg'

function Logo() {
    return(
        <Link  to="/"><img className='logo' src = {header} alt='лого'/></Link>
    )
    
}

export default Logo;