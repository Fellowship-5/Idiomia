import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import FlexTable from '../../components/FlexTable'
import { useProverb } from './../../redux/hooks'

const title = [
  {
    title: 'Proverb',
    fieldName: 'proverb',
    className: 'col-xs-2'
  },
  {
    title: 'Translation',
    fieldName: 'translation',
    className: 'col-xs-2'
  },
  {
    title: 'Explanation',
    fieldName: 'explanation',
    className: 'col-xs-3'
  }
]

const ProverbList = () => {
  const { proverbs, getProverbs } = useProverb()
  // Fetch All Proverbs
  useEffect(
    function fetchAllProverbs () {
      getProverbs()
    },
    [getProverbs]
  )

  return (
    <Container>
      <FlexTable
        data={proverbs}
        titleData={title}
        tableId={'proverb-list-flex-table'}
      />
    </Container>
  )
}

export default ProverbList
