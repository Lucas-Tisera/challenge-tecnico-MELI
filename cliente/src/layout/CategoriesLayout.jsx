import React from 'react'
import { Categories } from '../components/Categories'

//Layout para renderizar las categorias y los componentes children
export const CategoriesLayout = ({categoryList, children}) => {
    console.log(categoryList)
    return (
        <>
            <Categories categories={categoryList}/>
            {children}
        </>
    )
}
