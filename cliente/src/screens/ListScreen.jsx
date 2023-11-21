import React, { useContext } from 'react'
import { ItemsContext } from '../context/ItemsContext'
import { Link } from 'react-router-dom'
import { Item } from '../components/Item'
import { Spinner } from '../components/Spinner'
import { CategoriesLayout } from '../layout/CategoriesLayout'
import { MainLayout } from '../layout/MainLayout'
import { ErrorMessage } from '../components/ErrorMessage'
import useFetch from '../hooks/useFetch'
const { REACT_APP_BASEURL } = process.env;

//Screen destinada al listado de productos
export const ListScreen = () => {
    const {filter} = useContext(ItemsContext)

    // useFetch es un hook que se encarga de hacer el fetch de los productos
   const { data, loading, error } = useFetch(`${REACT_APP_BASEURL}?q=${filter}`)

    const showData =  () => {
        /* Componnete para mostrar un spinner al hacer fetch de datos */
        if (loading) return <Spinner loading={loading}/>

        /* Valido el estado de la respuesta y si contiene un error */
        if (error) return <ErrorMessage msg={error}/>

        return <CategoriesLayout categoryList={data.categories}>
        {/* Renderizo los primeros 4 items del listado */}
        {data.items.slice(0,4).map((item, index) => 
            <Link key={item.id} state={{item: item}} to={`/items/${item.id}`}>
                <Item data={item} index={index}/>
            </Link>
        )}
        </CategoriesLayout>
    }

    return (
        <MainLayout>
            {
                showData()
            }
        </MainLayout>
  )
}
