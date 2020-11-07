import React, { useState, useEffect, useCallback } from "react";
import { Pagination as PaginationBootstrap } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({
  items,
  pageSize,
  initialPage = 1,
  onChangePage,
  paginationClass,
  setActivePage,
  isSearchActive,
  activePage,
  paginationReset,
  setPaginationReset,
}) => {
  const [pager, setPager] = useState({});

  const setPage = useCallback(
    (page, size) => {
      const pager = getPager(items.length, page, size);
      if (page < 1 || page > pager.totalPages) {
        return;
      }
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      setActivePage(page);
      setPager(pager);
      onChangePage(pageOfItems);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  useEffect(
    function activatePagination() {
      if ((items && items.length) || isSearchActive) {
        if (paginationReset) {
          setPage(initialPage, pageSize);
        } else {
          setPage(activePage, pageSize);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialPage, isSearchActive, items, pageSize, setPage]
  );

  const getPager = (totalItems, currentPage = 1, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 6) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 3;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages
    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => {
      if (i === 0) {
        return { page: 1, value: true };
      }
      if (currentPage >= 5 && i === 1) {
        return { page: startPage + i, value: false };
      }
      if (currentPage + 3 >= totalPages && i >= 4) {
        return { page: startPage + i, value: true };
      }
      if (i < 5) {
        return { page: startPage + i, value: true };
      }
      if (i < 6) {
        return { page: startPage + i, value: false };
      }
      if (i === 6) {
        return { page: totalPages, value: true };
      }
    });

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };
  // don't display pagination if there is only 1 page
  if (!pager.pages || pager.pages.length <= 1) {
    return null;
  }
  return (
    <PaginationBootstrap className={`${paginationClass}`}>
      <PaginationBootstrap.First onClick={() => setPage(1, pager.pageSize)} />
      <PaginationBootstrap.Prev
        onClick={() => {
          setPaginationReset(true);
          setPage(pager.currentPage - 1, pager.pageSize);
        }}
      />

      {pager.pages.map((page, i) => (
        <PaginationBootstrap.Item
          active={page.value && pager.currentPage === page.page}
          key={"page" + i}
          onClick={() => {
            setPaginationReset(true);
            page.value && setPage(page.page, pager.pageSize);
          }}
          className={!page.value ? "disabled" : ""}
        >
          {page.value ? page.page : "..."}
        </PaginationBootstrap.Item>
      ))}

      <PaginationBootstrap.Next
        onClick={() => {
          setPaginationReset(true);
          setPage(pager.currentPage + 1, pager.pageSize);
        }}
      />
      <PaginationBootstrap.Last
        onClick={() => setPage(pager.totalPages, pager.pageSize)}
      />
    </PaginationBootstrap>
  );
};

export default Pagination;
