import React from 'react'
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
  tableType = '',
  rowFooter
}) => {
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
            key={'rows' + i}
          >
            {titleData.map((title, k) => {
              if (item[title.fieldName]) {
                return (
                  <FlexTableCell key={'columns' + k} title={title} item={item} />
                )
              }
              return (
                <FlexTableIconCell
                  key={`iconcell${k + k}`}
                  title={title}
                  item={item}
                  iconClick={iconClick}
                />
              )
            })}
          </div>
          {rowFooter === item._id && <SocialMediaShare item={item} />}
        </div>
      ))}
    </div>
  )
}

export default FlexTable
