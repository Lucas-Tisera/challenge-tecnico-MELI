import React from 'react'

export const MainLayout = ({children}) => {
  return (
    <section className='main_layout'>
        <div className='main_layout_screen_container'>
            {children}
        </div>
    </section>
  )
}
