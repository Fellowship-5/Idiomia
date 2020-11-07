import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import { useProverb, useSearch } from "./../../redux/hooks";
import { homepageTableTitle } from "./../../helpers/flexTableData";

const ProverbList = () => {
  const { proverbs, getProverbs } = useProverb();
  const { filtered, isActive, searchTerm, setSearch } = useSearch();

  useEffect(
    function fetchAllProverbs() {
      getProverbs();
    },
    [getProverbs]
  );

  useEffect(
    function searchProverbs() {
      searchTerm && setSearch(searchTerm, proverbs);
    },
    [searchTerm, setSearch, proverbs]
  );

  return (
    <Container>
      <FlexTable
        data={isActive ? filtered : proverbs}
        titleData={homepageTableTitle}
        tableId={"proverb-list-flex-table"}
        tableType="homepage-flexTable"
      />
    </Container>
  );
};

export default ProverbList;
