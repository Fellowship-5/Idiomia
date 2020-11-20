import React from 'react'
import './Section.css'

const Section = ({ children, title, id, className = '', containerClass }) => {
  return (
    <section id={id} className={`section-custom ${className}`}>
      <div
        className={`d-flex justify-content-between flex-column flex-lg-row mx-5 align-items-center ${containerClass}`}
      >
        <h1 className='text-center'>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export default Section
