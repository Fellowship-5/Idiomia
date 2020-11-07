import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import Pagination from "../../components/Pagination";
import { useProverb, useSearch, usePagination } from "./../../redux/hooks";
import { homepageTableTitle } from "./../../helpers/flexTableData";

const ProverbList = () => {
  const { proverbs, getProverbs } = useProverb();
  const { filtered, isActive, searchTerm, setSearch } = useSearch();
  const {
    activePage,
    pageSize,
    pageOfItems,
    setPageItems,
    setPage,
    pageReset,
    setPageReset,
  } = usePagination();

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
      <Pagination
        id={"proverb-list-table-pagination"}
        items={isActive ? filtered : proverbs}
        onChangePage={setPageItems}
        setActivePage={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
        paginationReset={pageReset}
        setPaginationReset={setPageReset}
      />
      <FlexTable
        data={pageOfItems}
        titleData={homepageTableTitle}
        tableId={"proverb-list-flex-table"}
        tableType="homepage-flexTable"
      />
      <Pagination
        id={"proverb-list-table-pagination"}
        items={isActive ? filtered : proverbs}
        onChangePage={setPageItems}
        setActivePage={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
        paginationReset={pageReset}
        setPaginationReset={setPageReset}
      />
    </Container>
  );
};

export default ProverbList;
