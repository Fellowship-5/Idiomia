import React from 'react'
import Icon from './Icon'

const FlexTableIconCell = ({ title, item, iconClick }) => {
  return (
    <div className={`flexTable-cell ${title.fieldName}-cell`} name={item.id}>
      <div className='flexTable-cell--heading'>{title.title}</div>
      <div className={`flexTable-cell--content ${title.fieldName}-content`}>
        {title.icons?.map((icon, i) => (
          <Icon
<<<<<<< HEAD
            key={i}
            name={item.id}
            icon={'fa' + icon}
            onClick={iconClick}
            id={icon}
            size={'1x'}
=======
            title={icon}
            key={i}           
            icon={"fa" + icon}
            onClick={iconClick}
            id={item.id}
            size={"1x"}
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
            fixedWidth
          />
        ))}
      </div>
    </div>
  )
}

export default FlexTableIconCell
