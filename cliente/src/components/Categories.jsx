import React from 'react'

//componente utilizado para renderizar las categorias
export const Categories = ({categories}) => {
  return (
    <div className="categories_container">
        {categories.map((category, index) => {
          //Renderizo las categorias y agrego el separador »
            return (
                <>
                    <p key={index} className={index < categories.length - 1 ? "categories_list categories_firsts" : "categories_list categories_last" }>{category}</p>
                    {index < categories.length - 1 && <p className="categories_list">»</p>}
                </>
            )
        })}
    </div>
  )
}
