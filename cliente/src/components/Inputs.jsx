import React, { useState } from 'react'
import searchLogo from '../assets/ic_Search.png'
import { Link } from 'react-router-dom'

//Creo el componente SearchInput que se encarga de la logica del input de busqueda
//Utilizo un Link para poder redirigir al usuario a la ruta de busqueda
//El componente se utiliza en el componente Navbar

export const SearchInput = () => {
  const [search, setSearch] = useState('')
    return (
    <div className="searchInput_container">
      <input onChange={e=> setSearch(e.target.value)} type="text" placeholder="Nunca dejes de buscar" className='searchInput_search'/>
      <Link to={`?q=${search}`} className='searchInput_button'>
        <img src={searchLogo} alt="Search Logo" />
      </Link>
    </div>
  )
}
