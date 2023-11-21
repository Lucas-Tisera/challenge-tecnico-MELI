import React from 'react'

export const ErrorMessage = ({msg}) => {
  return (
    <section className='error_message_container'><h1 className='error_message_text'>{msg}</h1></section>
  )
}
