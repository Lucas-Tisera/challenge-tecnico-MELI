import React, { useContext } from 'react'
import { ItemsContext } from '../context/ItemsContext'
import useFetchItems from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { Item } from '../components/Item'
import { Spinner } from '../components/Spinner'
import { CategoriesLayout } from '../layout/CategoriesLayout'
import { MainLayout } from '../layout/MainLayout'

//Screen destinada al listado de productos
export const ListScreen = () => {
    const {filter, data, loading} = useContext(ItemsContext)
    useFetchItems(filter)
    return (
        <MainLayout>
            {/* Componnete para mostrar un spinner al hacer fetch de datos */}
            <Spinner loading={loading}/>

            {/* Valido el estado de la respuesta y loading es true */}
            {!loading && data ? data.error ? <title className='list_screen_error_container'><h1 className='list_screen_error_message'>{data.message}</h1></title> 
            :
            <CategoriesLayout>
                {/* Renderizo los primeros 4 items del listado */}
                {data.items.slice(0,4).map((item, index) => 
                    <Link key={item.id} state={{item: item}} to={`/items/${item.id}`}>
                        <Item data={item} index={index}/>
                    </Link>
                )}
            </CategoriesLayout>
            : null
            }
        </MainLayout>
  )
}
