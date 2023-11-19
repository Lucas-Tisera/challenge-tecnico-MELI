import { createContext, useState } from "react";

//Decidí utilizar el Context de React y no Redux ya que la aplicación no es muy compleja y no requiere de un manejo de estados muy complejo
//y utilizar Redux en este caso seria agregar complejidad innecesaria asi como tambien agregar mas dependencias al proyecto
export const ItemsContext = createContext()

//Creo un provider para poder acceder a los estados desde cualquier componente
export const ItemsProvider = ({children}) => {
    const [data, setData] = useState()
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')

    const values = {
        filter,
        setFilter,
        data,
        setData,
        loading,
        setLoading,
        item,
        setItem
    }

    return (
        <ItemsContext.Provider value={values}>
            {children}
        </ItemsContext.Provider>
    )
}