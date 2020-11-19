import React, { useState, useEffect, useCallback } from "react";
import { Pagination as PaginationBootstrap } from "react-bootstrap";
import "./Pagination.css";

const Pagination = ({
  items,
  totalPages,
  paginationClass,
  setActivePage,
  setActivePageItems,
  activePage,
  shouldResetPagination,
  setShouldResetPagination,
}) => {
  const [pages, setPages] = useState([]);
  const setPage = useCallback(
    (page) => {
      setActivePageItems(items);
      if (page < 1 || page > totalPages) {
        return;
      }
      setActivePage(page);
      const newPages = createPages();
      setPages(newPages);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  useEffect(
    function activatePagination() {
      if (shouldResetPagination) {
        setPage(1);
        return;
      }
      setPage(activePage);
    },
    [activePage, setPage, shouldResetPagination, totalPages]
  );

  useEffect(() => {
    if (items.length === 0 && activePage - 1 === totalPages && activePage > 1) {
      return setPage(activePage - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, totalPages]);

  const calculateStartAndEndPage = () => {
    const MAX_DISPLAYED_PAGE_NUMBERS = 6;
    if (totalPages <= MAX_DISPLAYED_PAGE_NUMBERS) {
      return {
        startPage: 1,
        endPage: totalPages,
      };
    }

    if (activePage <= 4) {
      return {
        startPage: 1,
        endPage: 7,
      };
    }

    if (activePage + 3 >= totalPages) {
      return {
        startPage: totalPages - 6,
        endPage: totalPages,
      };
    }

    // Default return
    return {
      startPage: activePage - 3,
      endPage: activePage + 3,
    };
  };

  const buildPagesArray = (startPage, endPage) => {
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
      return null;
    });

    return pages;
  };

  const createPages = () => {
    const { startPage, endPage } = calculateStartAndEndPage();
    return buildPagesArray(startPage, endPage);
  };

  const handleNavigatePage = (isPageReset, activePageNumber) => (e) => {
    e.preventDefault();
    setShouldResetPagination(isPageReset);
    setPage(activePageNumber);
  };

  // don't display pagination if there is only 1 page
  if (!pages || pages.length <= 1 || totalPages === 0) {
    return null;
  }

  return (
    <PaginationBootstrap className={`${paginationClass}`}>
      <PaginationBootstrap.First onClick={handleNavigatePage(false, 1)} />
      <PaginationBootstrap.Prev
        onClick={handleNavigatePage(false, activePage - 1)}
      />

      {pages.map((page, i) => (
        <PaginationBootstrap.Item
          active={page.value && activePage === page.page}
          key={"page" + i}
          onClick={page.value && handleNavigatePage(false, page.page)}
          className={!page.value ? "disabled" : ""}
        >
          {page.value ? page.page : "..."}
        </PaginationBootstrap.Item>
      ))}

      <PaginationBootstrap.Next
        onClick={handleNavigatePage(false, activePage + 1)}
      />
      <PaginationBootstrap.Last
        onClick={handleNavigatePage(false, totalPages)}
      />
    </PaginationBootstrap>
  );
};

export default Pagination;
