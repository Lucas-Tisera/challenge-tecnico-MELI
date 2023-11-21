import React, { memo } from 'react'
import { Item } from '../components/Item'
import { Link } from 'react-router-dom'

export const ItemsLayout = memo(({data}) => {
  return (
    <>
        {data.items.slice(0,4).map((item, index) => 
            <Link key={item.id} state={{item: item}} to={`/items/${item.id}`}>
                <Item data={item} index={index}/>
            </Link>
        )}
    </>
  )
})
