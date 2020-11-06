import React from 'react'

const FlexTableCell = ({ title, item }) => {
  return (
    <div className={`flexTable-cell ${title.fieldName}-cell`}>
      <div className='flexTable-cell--heading'>{title.title}</div>
      <div className={`flexTable-cell--content ${title.fieldName}-content`}>
        {item[title.fieldName]?.name || item[title.fieldName]}
      </div>
    </div>
  )
}

export default FlexTableCell
