import React from 'react'
import { useLocation } from 'react-router-dom'
import { CategoriesLayout } from '../layout/CategoriesLayout'
import { MainLayout } from '../layout/MainLayout'
import { ProductLayout } from '../layout/ProductLayout'
import useFetch from '../hooks/useFetch'
import { Spinner } from '../components/Spinner'
import shipping from '../assets/ic_shipping.png'
import { ErrorMessage } from '../components/ErrorMessage'
const { REACT_APP_BASEURL } = process.env;

//Screen destinada a mostrar la descripcion de un producto
export const ItemDescription = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  // useFetchItemId es un hook que se encarga de hacer el fetch de la descripcion del producto
  // recibe como parametro el id del producto que se encuentra en la url
  const {data, loading, error} = useFetch(`${REACT_APP_BASEURL}/${id}`, false)
  

  //showData es una funcion que se encarga de renderizar los datos del producto
  const showData =  () => {

    /* Componnete para mostrar un spinner al hacer fetch de datos */
    if (loading) return <Spinner loading={loading}/>

    /* Valido el estado de la respuesta y si contiene un error */
    if (error) return <ErrorMessage msg={error}/>

    // Formateo el precio del producto
    const formatedAmount = new Intl.NumberFormat('es-AR').format(data.price.amount)
    
    // Renderizo el componente CategoriesLayout y le paso como props el listado de categorias
    // y el componente ProductLayout que se encarga de renderizar los datos del producto
    return <CategoriesLayout categoryList={data.category}>
    <ProductLayout>
        <>
          <div className='item_container'>
            <img src={data.picture} className='item_image' alt={data.title} />
            <div className='item_data'>
              <span className='item_condition'>{data.condition} - {data.sold_quantity} vendidos</span>
              <h1 className='item_title'>{data.title}</h1>
              <div className='item_info_priceShipping'>
                <p className='item_price'>$ {formatedAmount} </p>
                {data.free_shipping && <><img src={shipping} alt="Free Shipping" className='item_shipping_image' /><b className='item_shipping_text'>Envio gratis!</b></>}
              </div>
              <button className='item_button'>Comprar</button>
            </div>
          </div>
          <div className='item_description'>
            <h2 className='item_description_title'>Descripción del producto</h2>
            <p className='item_description_text'>{data.description}</p>
          </div>
        </>
    </ProductLayout>
  </CategoriesLayout>
}
  
  return (
    <MainLayout>
      {
          showData()
      }
    </MainLayout>
  )
}
