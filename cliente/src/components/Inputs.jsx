import React, { useContext, useState } from 'react'
import searchLogo from '../assets/ic_Search.png'
import { Link } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

//Creo el componente SearchInput que se encarga de la logica del input de busqueda
//Utilizo un Link para poder redirigir al usuario a la ruta de busqueda
//El componente se utiliza en el componente Navbar

export const SearchInput = () => {
  const [search, setSearch] = useState('')
  const {setFilter} = useContext(ItemsContext)

  //Detectar presion de enter
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      setFilter(search)
    }
  }

  //almaceno el valor del input en el estado search y lo paso como parametro a la funcion setFilter
  //setFilter se encarga de cambiar el estado filter en el contexto ItemsContext
  return (
    <div className="searchInput_container" onKeyDown={(e)=>handleKeyPress(e)}>
      <input onChange={e=> setSearch(e.target.value)} type="text" placeholder="Nunca dejes de buscar" className='searchInput_search'/>
      <Link to={`/items?q=${search}`} className='searchInput_button' onClick={()=>setFilter(search)}>
        <img src={searchLogo} alt="Search Logo" />
      </Link>
    </div>
  )
}
