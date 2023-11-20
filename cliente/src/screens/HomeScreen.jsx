import React from 'react'

export const HomeScreen = () => {
  return (
      <section className='home_screen_container'>
        <h1 className='home_screen_title'>Bienvenido a Mercado Libre</h1>
        <h2 className='home_screen_subtitle'>Ingrese algun valor de busqueda para comenzar</h2>
        <p className='home_screen_paragraph'>
          Esta aplicación esta basada en un test de Mercado Libre, la cual consiste en crear una aplicación que permita buscar productos y ver sus detalles.
          La aplicación esta desarrollada en React JS, con el uso de Hooks, Context API, React Router, entre otras librerias.
        </p>
      </section> 
  )
}
