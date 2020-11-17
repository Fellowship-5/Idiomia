import React, { Suspense } from 'react'
import './Section.css'
import { useTranslation } from 'react-i18next'

const Section = ({ children, title, id, className, containerClass }) => {
  return (
    <section id={id} className={`section-custom ${className}`}>
      <div className={containerClass}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export default Section
