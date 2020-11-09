import React from 'react'
import FlexTableHeader from './FlexTableHeader'
import FlexTableCell from './FlexTableCell'
import FlexTableIconCell from './FlexTableIconCell'
import './FlexTable.css'

const FlexTable = ({
  titleData = [],
  data = [],
  tableId,
  iconClick,
  tableType = "",
}) => {
  return (
<<<<<<< HEAD
    <div
      id={tableId}
      className='flexTable flexTable--5cols flexTable--collapse'
    >
      <FlexTableHeader titleData={titleData} />
      {data.map((item, i) => (
        <div className='flexTable-row' key={'row' + i}>
=======
    <div id={tableId} className={`flexTable ${tableType}`}>
      <FlexTableHeader titleData={titleData} />
      {data.map((item, i) => (
        <div
          className={`flexTable-row ${
            !item.adminApproval
              ? "flexTable-row-pending"
              : "flexTable-row-approved"
          }`}
          key={"row" + i}
        >
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
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
                iconClick={iconClick}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default FlexTable
