import React from 'react'
import { SearchInput } from './Inputs'
import logoML from '../assets/Logo_ML.png'

//Creo el componente navbar donde se encuentra el logo y el input de busqueda
const Navbar = () => {
  return (
  <nav className='navbar_mainContainer' role='navigation' aria-label='Main Navigation'>
    <div className='navbar_menu'>
    <div className='navbar_brand'>
      <img src={logoML} alt='Ironhack Logo' />
    </div>
    <SearchInput />
    </div>
  </nav>
  )
}

export default Navbar