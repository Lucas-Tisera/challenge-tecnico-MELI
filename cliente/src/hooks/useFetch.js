import { useCallback, useContext, useEffect } from "react"
import { ItemsContext } from "../context/ItemsContext"
const { REACT_APP_BASEURL } = process.env;
//useFetchItems es un hook que se encarga de hacer la llamada a la API para obtener los items
//Recibe como parametro el query que se quiere buscar
//Devuelve un objeto con la informacion de los items
const useFetchItems = async (quer) => {
    const { setData, setLoading } = useContext(ItemsContext)
    const querySearch = new URLSearchParams(window.location.search)

    //Si no se especifica un query se obtiene el query de la url
    const query = quer ? quer : querySearch.get("q")
    
    //Si no se utiliza useCallback, filtered se crea cada vez que se renderiza el componente y se vuelve a ejecutar el useEffect
    const filtered = useCallback(() => {
        //Se llama a la funcion fetchItems que se encarga de hacer la llamada a la API
        fetchItems(query)
        .then((data) => {
            setData(data ? data : {error: true, message: "No se encontraron resultados"})
        }).catch((error) => {
            setData({error: true, message: error.message})
        }).finally(() => {
            setLoading(false)
        })
        
    }, [query, setData, setLoading])
    
    useEffect(() => {
        setLoading(true)
        filtered()
    }, [query, setLoading, filtered])
    
}

//fetchItems es una funcion que se encarga de hacer la llamada a la API para obtener los items
async function fetchItems (query) {
    try {
        const response = await fetch(`${REACT_APP_BASEURL}/?q=${query}`)
        const data = await response.json()
        console.log(data)
        if (data.items.length > 0) {
            return {error: false,  ...data}
        } else {
            console.log("error")
            return { error: true , message: "No se encontraron resultados"}
        }
    } catch (error) {
        return { error: true , message: "No se encontraron resultados"}
    }
}


//useFetchItemId es un hook que se encarga de hacer la llamada a la API para obtener el detalle de un item
//Recibe como parametro el id del item que se quiere obtener
//Devuelve un objeto con la informacion del item
//Si no se encuentra el item devuelve un objeto con error en true y un mensaje de error
export const useFetchItemId = async (id) => {
    const { setItem, setLoading } = useContext(ItemsContext)

    //Si no se utiliza useCallback, getItem se crea cada vez que se renderiza el componente y se vuelve a ejecutar el useEffect
    const getItem = useCallback(() => {
        //Se llama a la funcion fetchItemById que se encarga de hacer la llamada a la API
        fetchItemById(id)
        .then((data) => {
            if (data.error) {
                throw new Error(data.message)
            }
            setItem(data)
        }).catch((error) => {
            setItem({error: true, message: error.message})
        }).finally(() => {
            setLoading(false)
        })

    }, [id, setItem, setLoading])

    useEffect(() => {
        setLoading(true)
        getItem()
    }, [id, setLoading, getItem])

}

//fetchItemById es una funcion que se encarga de hacer la llamada a la API para obtener el detalle de un item
//Recibe como parametro el id del item que se quiere obtener
async function fetchItemById (id) {
    try {
        const response = await fetch(`${REACT_APP_BASEURL}/${id}`)
        const data = await response.json()
        if (data.item) {
            return {error: false,  ...data.item}
        } else {
            return { error: true , message: "No se encontraron resultados"}
        }
    } catch (error) {
        return { error: true , message: "No se encontraron resultados"}
    }
}

export default useFetchItems