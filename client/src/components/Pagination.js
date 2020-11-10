import React, { useState, useEffect, useCallback } from "react";
import { Pagination as PaginationBootstrap } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({
  items,
  totalPages,
  paginationClass,
  setActivePage,
  isSearchActive,
  activePage,
  paginationReset,
  setPaginationReset,
}) => {
  const [pages, setPages] = useState([]);

  const setPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) {
        return;
      }
      setActivePage(page, items);
      const newPages = createPages();
      setPages(newPages);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  useEffect(
    function activatePagination() {
      if ((items && items.length) || isSearchActive) {
        if (paginationReset) {
          setPage(1);
        } else {
          setPage(activePage);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePage, isSearchActive, items, setPage]
  );

  const createPages = () => {
    let startPage, endPage;

    if (totalPages <= 6) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (activePage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (activePage + 3 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = activePage - 3;
        endPage = activePage + 3;
      }
    }

    // create an array of pages
    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => {
      if (i === 0) {
        return { page: 1, value: true };
      }
      if (activePage >= 5 && i === 1) {
        return { page: startPage + i, value: false };
      }
      if (activePage + 3 >= totalPages && i >= 4) {
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

    return pages;
  };
  // don't display pagination if there is only 1 page
  if (!pages || pages.length <= 1) {
    return null;
  }
  return (
    <PaginationBootstrap className={`${paginationClass}`}>
      <PaginationBootstrap.First onClick={() => setPage(1)} />
      <PaginationBootstrap.Prev
        onClick={() => {
          setPaginationReset(false);
          setPage(activePage - 1);
        }}
      />

      {pages.map((page, i) => (
        <PaginationBootstrap.Item
          active={page.value && activePage === page.page}
          key={"page" + i}
          onClick={() => {
            setPaginationReset(false);
            page.value && setPage(page.page);
          }}
          className={!page.value ? "disabled" : ""}
        >
          {page.value ? page.page : "..."}
        </PaginationBootstrap.Item>
      ))}

      <PaginationBootstrap.Next
        onClick={() => {
          setPaginationReset(false);
          setPage(activePage + 1);
        }}
      />
      <PaginationBootstrap.Last onClick={() => setPage(totalPages)} />
    </PaginationBootstrap>
  );
};

export default Pagination;
