import React, { useContext } from 'react'
import { ItemsContext } from '../context/ItemsContext'
import { Categories } from '../components/Categories'

//Layout para renderizar las categorias y los componentes children
export const CategoriesLayout = ({categoryList, children}) => {
    const {data} = useContext(ItemsContext)
    return (
        <>
            {
            <Categories categories={categoryList ? categoryList : data.categories}/>}
            {children}
        </>
    )
}
