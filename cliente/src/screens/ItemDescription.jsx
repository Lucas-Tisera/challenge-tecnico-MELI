import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { CategoriesLayout } from '../layout/CategoriesLayout'
import { MainLayout } from '../layout/MainLayout'
import { ProductLayout } from '../layout/ProductLayout'
import { useFetchItemId } from '../hooks/useFetch'
import { ItemsContext } from '../context/ItemsContext'
import { Spinner } from '../components/Spinner'
import shipping from '../assets/ic_shipping.png'


//Screen destinada a mostrar la descripcion de un producto
export const ItemDescription = () => {
  const {item, loading} = useContext(ItemsContext)
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  // useFetchItemId es un hook que se encarga de hacer el fetch de la descripcion del producto
  // recibe como parametro el id del producto que se encuentra en la url
  useFetchItemId(id)
  const formatedAmount = item && new Intl.NumberFormat('es-AR').format(item.price.amount)
  
  return (
    <MainLayout>
      <Spinner loading={loading}/>
            {
              ! loading && item &&
        <CategoriesLayout categoryList={item ? item.category: []}>
          <ProductLayout>
              <>
                <div className='item_breadcrumb'>
                <img src={item.picture} className='item_image' alt={item.title} />
                <div className='item_data'>
                  <p className='item_condition'>{item.condition} - {item.sold_quantity} vendidos</p>
                  <p className='item_title'>{item.title}</p>
                  <div className='item_info_priceShipping'>
                    <p className='item_price'>$ {formatedAmount}</p>
                    {item.free_shipping && <><img src={shipping} alt="Free Shipping" className='item_shipping_image' /><p className='item_shipping_text'>Envio gratis!</p></>}
                  </div>
                  <button className='item_button'>Comprar</button>
                </div>
                </div>
                <div className='item_description'>
                  <p className='item_description_title'>Descripción del producto</p>
                  <p className='item_description_text'>{item.description}</p>
                </div>
              </>
          </ProductLayout>
        </CategoriesLayout>
          }
    </MainLayout>
  )
}
