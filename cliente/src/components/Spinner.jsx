import React from 'react'

//Componente utilizado para mostrar un spinner al hacer fetch de datos
export const Spinner = ({loading}) => {
  return (
    <>
      {loading && 
        <div className="spinner_container">
          <div className="spinner"></div>
        </div>
      }
    </>
  )
}
