import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import Pagination from "../../components/Pagination";
import { useProverb, useSearch, usePagination } from "./../../redux/hooks";
import { homepageTableTitle } from "./../../helpers/flexTableData";

const ProverbList = () => {
  const { proverbs, getProverbs, totalPages } = useProverb();
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
      getProverbs(activePage, pageSize);
    },
    [getProverbs, activePage, pageSize]
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
        id="proverb-list-top-table-pagination"
        items={isActive ? filtered : proverbs}
        setActivePage={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
        paginationReset={pageReset}
        setPaginationReset={setPageReset}
        totalPages={totalPages}
      />
    <FlexTable
        data={pageOfItems}
        titleData={homepageTableTitle}
        tableId={"proverb-list-flex-table"}
        tableType="homepage-flexTable"
      />
      <Pagination
        id="proverb-list-bottom-table-pagination"
        items={isActive ? filtered : proverbs}
        setActivePage={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="proverb-list-table-pagination d-flex justify-content-center align-items-center"
        paginationReset={pageReset}
        setPaginationReset={setPageReset}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default ProverbList;
