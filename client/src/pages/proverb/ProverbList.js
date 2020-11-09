<<<<<<< HEAD
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
=======
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import { useProverb, useSearch } from "./../../redux/hooks";
import { homepageTableTitle } from "./../../helpers/flexTableData";

const ProverbList = () => {
  const { proverbs, getProverbs } = useProverb();
  const { filtered, isActive, searchTerm, setSearch } = useSearch();

>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
  useEffect(
    function fetchAllProverbs () {
      getProverbs()
    },
    [getProverbs]
  )

  useEffect(
    function searchProverbs() {
      searchTerm && setSearch(searchTerm, proverbs);
    },
    [searchTerm, setSearch, proverbs]
  );

  return (
    <Container>
      <FlexTable
<<<<<<< HEAD
        data={proverbs}
        titleData={title}
        tableId={'proverb-list-flex-table'}
=======
        data={isActive ? filtered : proverbs}
        titleData={homepageTableTitle}
        tableId={"proverb-list-flex-table"}
        tableType="homepage-flexTable"
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
      />
    </Container>
  )
}

export default ProverbList
