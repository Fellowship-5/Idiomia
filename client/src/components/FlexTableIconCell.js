import React from 'react'
import Icon from './Icon'

const FlexTableIconCell = ({ title, item, iconClick }) => {
  return (
    <div className={`flexTable-cell ${title.fieldName}-cell`} name={item.id}>
      <div className='flexTable-cell--heading'>{title.title}</div>
      <div className={`flexTable-cell--content ${title.fieldName}-content`}>
        {title.icons?.map((icon, i) => (
          <Icon
            title={icon}
            key={i}
            icon={'fa' + icon}
            onClick={iconClick}
            id={item._id}
            size={'1x'}
            fixedWidth
          />
        ))}
      </div>
    </div>
  )
}

export default FlexTableIconCell
