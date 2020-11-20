import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

export default function Icon ({ icon, title, ...props }) {
  return (
    <FontAwesomeIcon
      title={title}
      icon={icons[icon]}
      style={{ cursor: 'pointer', marginRight: '6px', pointerEvents: 'stroke' }}
      {...props}
    />
  )
}
