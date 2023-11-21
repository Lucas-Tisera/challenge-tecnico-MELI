import { useCallback, useContext, useEffect, useState } from "react"
import { ItemsContext } from "../context/ItemsContext"

//useFetch es un hook que se encarga de hacer la llamada a la API para obtener los items e informacion de los mismos
//Recibe como parametro el query que se quiere buscar
//Devuelve un objeto con la informacion de los items
//Query es el parametro que se utiliza para hacer la llamada a la API
//list es el parametro que se utiliza para definir que accion se va a realizar
const useFetch = (query, action) => {
    const { setData } = useContext(ItemsContext)

    //Se utiliza el hook useState para manejar el estado de la llamada a la API
    //Se inicializa el estado con un array vacio, loading en true y error en null
    const [dataState, setDataState] = useState({
        data: [],
        loading: true,
        error: null
    })
    
    //Si no se utiliza useCallback, handleFetch se crea cada vez que se renderiza el componente y se vuelve a ejecutar el useEffect
    const handleFetch = useCallback(async () => {
        try {
            const response = await fetch(query);
            const dataApi = await response.json();

            //Se utiliza un switch para definir que accion se va a realizar
            //list: se utiliza para obtener los items
            //detail: se utiliza para obtener la informacion de un item en particular
            switch (action) {
                case "list":
                    //Si la respuesta de la API contiene items se setea el estado con los items
                    //Si no se encontraron resultados se setea el estado con un mensaje de error
                    if ( dataApi && dataApi.items.length > 0) {
                        //Se setea el estado de los items en el contexto para poder acceder a la informacion desde cualquier componente
                        setData(dataApi);
                        setDataState( prev => ({
                            ...prev,
                            loading: false,
                            data: dataApi
                        }));
                    } else {
                        setDataState( prev => ({
                            ...prev,
                            loading: false,
                            error: "No se encontraron resultados"
                        }))
                    }
                    break;
                case "detail":
                    //Si la respuesta de la API contiene información del item se setea el estado con la informacion del mismo
                    //Si no se encontraron resultados se setea el estado con un mensaje de error
                    if ( dataApi ) {
                        //Se setea el estado de los items en el contexto para poder acceder a la informacion desde cualquier componente
                        setDataState( prev => ({
                            ...prev,
                            loading: false,
                            data: dataApi.item
                        }));
                    } else {
                        setDataState( prev => ({
                            ...prev,
                            loading: false,
                            error: "No se encontraron resultados"
                        }))
                    }
                    break;
                default:
                    setDataState( prev => ({
                        ...prev,
                        loading: false,
                        error: "No se encontraron resultados"
                    }))
                    break;
            }
           
            
        } catch (error) {
            console.log(error)
            //Si hubo un error al consumir el servicio se setea el estado con un mensaje de error
            setDataState( prev => ({
                ...prev,
                loading: false,
                error: "Error al consumir servicio"
            }));
        }
      },
        [query, setData, action]
    )

    //Se utiliza el hook useEffect para ejecutar la funcion handleFetch cada vez que se cambia el filtro
    useEffect(() => {
        setDataState({
            data: [],
            loading: true,
            error: null
        })
        handleFetch();
    }, [query, handleFetch])

    return { ...dataState}
    
}

export default useFetch