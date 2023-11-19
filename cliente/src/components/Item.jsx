import React from 'react'
import shipping from '../assets/ic_shipping.png'
import { ProductLayout } from '../layout/ProductLayout'

//componente utilizado para renderizar cada producto del listado
export const Item = ({data, index}) => {
  
  //Hago un format del precio para que sea mas legible
  const formatPrice = new Intl.NumberFormat('es-AR').format(data.price.amount)
  
  //renderizo el componente con los datos del producto
  return (
    <ProductLayout>
    <article className='product_container'>
        <img className='product_image' src={data.picture} alt={data.title}/>
        <div className='product_info'>
            <div className='product_info_priceShipping'>
            <p className='product_info_price'>$ {formatPrice}</p>
            {data.free_shipping && <img src={shipping} alt="Free Shipping" />}
            </div>
            <div>
              <h1 className='product_info_title'>{data.title}</h1>
              <p className='product_info_condition'>{data.condition}</p>
            </div>
        </div>
        <p className='product_location'>{data.address}</p>
    </article>
    {index < 3 && <span className='product_separator'/>}
    </ProductLayout>
  )
}
