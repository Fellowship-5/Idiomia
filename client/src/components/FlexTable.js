import React, { useState } from 'react'
import FlexTableHeader from './FlexTableHeader'
import FlexTableCell from './FlexTableCell'
import FlexTableIconCell from './FlexTableIconCell'
import SocialMediaShare from './SocialMediaShare'

import './FlexTable.css'

const FlexTable = ({
  titleData = [],
  data = [],
  tableId,
  iconClick,
  tableType = ''
}) => {
  const [showSocialMediaBtns, setShowSocialMediaBtns] = useState({})
  return (
    <div id={tableId} className={`flexTable ${tableType}`}>
      <FlexTableHeader titleData={titleData} />
      {data.map((item, i) => (
        <div>
          <div
            className={`flexTable-row ${
              !item.adminApproval
                ? 'flexTable-row-pending'
                : 'flexTable-row-approved'
            }`}
            key={'row' + i}
          >
            {titleData.map((title, k) => {
              if (item[title.fieldName]) {
                return (
                  <FlexTableCell key={'column' + k} title={title} item={item} />
                )
              }
              return (
                <FlexTableIconCell
                  key={`icon${k + k}`}
                  title={title}
                  item={item}
                  iconClick={() => {
                    showSocialMediaBtns._id
                      ? setShowSocialMediaBtns({})
                      : setShowSocialMediaBtns(item)
                  }}
                />
              )
            })}
          </div>
          {showSocialMediaBtns._id === item._id && (
            <SocialMediaShare className='flexTable-row' item={item} />
          )}
        </div>
      ))}
    </div>
  )
}

export default FlexTable
