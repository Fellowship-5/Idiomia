import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import FlexTable from '../../components/FlexTable'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import { useProverb, useSearch, usePagination } from './../../redux/hooks'
import { homepageTableTitle } from './../../helpers/flexTableData'

const ProverbList = () => {
  const [showSocialMediaBtns, setShowSocialMediaBtns] = useState(null)
  const searchTimeOut = useRef(null)
  const {
    loading,
    approvedProverbs,
    getApprovedProverbs,
    totalPages,
    searchApprovedProverbs
  } = useProverb()
  const { searchTerm, field: searchField } = useSearch()
  const {
    activePage,
    pageSize,
    pageItems,
    setPage,
    setPageItems,
    pageReset,
    setPageReset
  } = usePagination()

  useEffect(
    function fetchApprovedProverbs () {
      if (!searchTerm) {
        getApprovedProverbs(activePage, pageSize)
      }
    },
    [getApprovedProverbs, activePage, pageSize, searchTerm]
  )

  useEffect(
    function searchProverbs () {
      searchTimeOut.current = setTimeout(() => {
        if (searchTerm) {
          searchApprovedProverbs(activePage, pageSize, searchTerm, searchField)
        }
      }, 300)

      return () => {
        clearTimeout(searchTimeOut.current)
      }
    },
    [activePage, pageSize, searchField, searchTerm, searchApprovedProverbs]
  )

  if (loading && approvedProverbs.length === 0) {
    return (
      <div className='position-absolute' style={{ top: '50%', left: '50%' }}>
        <Spinner animation='grow' />
      </div>
    )
  }

  const handleSocialButtons = e => {
    const id = e.target?.id
    showSocialMediaBtns
      ? setShowSocialMediaBtns(null)
      : setShowSocialMediaBtns(id)
  }

  return (
    <Container>
      <Pagination
        id='proverb-list-top-table-pagination'
        items={approvedProverbs}
        setActivePage={setPage}
        setActivePageItems={setPageItems}
        pageSize={pageSize}
        activePage={activePage}
        paginationClass='proverb-list-table-pagination d-flex justify-content-center align-items-center'
        shouldResetPagination={pageReset}
        setShouldResetPagination={setPageReset}
        totalPages={totalPages}
      />
      {totalPages > 0 && (
        <FlexTable
          data={pageItems}
          titleData={homepageTableTitle}
          tableId={'proverb-list-flex-table'}
          tableType='homepage-flexTable'
          rowFooter={showSocialMediaBtns}
          iconClick={handleSocialButtons}
        />
      )}
    </Container>
  )
}

export default ProverbList
