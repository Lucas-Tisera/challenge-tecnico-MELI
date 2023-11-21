import React from 'react'

export const ErrorMessage = ({msg}) => {
  return (
    <section className='list_screen_error_container'><h1 className='list_screen_error_message'>{msg}</h1></section>
  )
}
