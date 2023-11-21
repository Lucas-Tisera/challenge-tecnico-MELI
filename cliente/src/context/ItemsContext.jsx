import { createContext, useState } from "react";

//Decidí utilizar el Context de React y no Redux ya que la aplicación no es muy compleja y no requiere de un manejo de estados muy complejo
//y utilizar Redux en este caso seria agregar complejidad innecesaria asi como tambien agregar mas dependencias al proyecto
export const ItemsContext = createContext()

//Creo un provider para poder acceder a los estados desde cualquier componente
export const ItemsProvider = ({children}) => {
    //Estado para guardar el listado de productos que se obtiene de la API
    //el estado se encuentra en el contexto para poder acceder a el desde cualquier componente
    //la variable data no se utiliza ya que no se necesita utilizar el listado de productos en ningun componente
    //sin embargo decido agregarla para poder utilizarla en un futuro si se requiere
    //como por ejemplo si se quisiera agregar un componente para mostrar los productos mas vendidos
    //asi no se deberia volver a hacer un fetch de los productos

    const [data, setData] = useState()
    const [filter, setFilter] = useState('')

    const values = {
        filter,
        setFilter,
        data,
        setData
    }

    return (
        <ItemsContext.Provider value={values}>
            {children}
        </ItemsContext.Provider>
    )
}