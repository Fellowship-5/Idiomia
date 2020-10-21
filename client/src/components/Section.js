import React from "react";
import './Section.css'

const Section = ({ children, title, id, className, containerClass }) => {
  return (
    <section id={id} className={`section-custom ${className}`}>
      <div className={containerClass}>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default Section;
