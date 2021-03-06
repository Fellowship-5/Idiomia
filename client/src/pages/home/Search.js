import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import Badge from "../../components/Badge";
import Checkbox from "../../components/Checkbox";

import { useSearch, useProverb, usePagination } from "../../redux/hooks";
import "./Search.css";

const Search = () => {
  const {
    setSearchTerm,
    searchTerm,
    isActive,
    field,
    setSearchIconClicked,
    isButtonClicked,
    setSearchField,
  } = useSearch();
  const { setPageReset } = usePagination();
  const { totalFound } = useProverb();
  const searchInput = useRef(null);
  const { t } = useTranslation("homePage");

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPageReset(true);
  };
  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.name);
    setSearchTerm("");
    setPageReset(true);
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    searchInput.current.focus();
    setSearchIconClicked(!isButtonClicked);
    isButtonClicked && setSearchTerm("");
  };

  return (
    <>
      <div className="d-flex flex-column">
        {isButtonClicked ? (
          <div className="d-flex search-fields">
            <Checkbox
              id="search-field-proverb"
              label={t("Proverb")}
              checked={field === "proverb"}
              name="proverb"
              onChange={handleSearchFieldChange}
              className="input-form-label"
            />
            <Checkbox
              id="search-field-translation"
              label={t("Translation")}
              checked={field === "translation"}
              name="translation"
              onChange={handleSearchFieldChange}
              className="input-form-label ml-2"
            />
            <Checkbox
              id="search-field-explanation"
              label={t("Explanation")}
              checked={field === "explanation"}
              name="explanation"
              onChange={handleSearchFieldChange}
              className="input-form-label ml-2"
            />
          </div>
        ) : (
          <> </>
        )}
        <div className="d-flex flex-row">
          <div className="search-icon-container mr-3">
            <Icon
              title="Search"
              icon={isButtonClicked ? "faTimes" : "faSearch"}
              onClick={handleIconClick}
              id="home-search-icon"
              size="1x"
              fixedWidth
              color="rgb(51, 51, 51)"
            />
          </div>
          <div
            className={
              isButtonClicked
                ? "search-form-container active"
                : "search-form-container"
            }
          >
            <Input
              type="text"
              placeholder={t("Search in ") + `${field}`}
              className="search-bar"
              pClassName="search-bar-container"
              onChange={handleSearchInputChange}
              value={isActive ? searchTerm : ""}
              id="homepage-search-proverb"
              inputRef={searchInput}
            />
          </div>
        </div>
      </div>
      {isActive ? (
        <Badge
          variant="secondary"
          label="Found:"
          className="mx-2"
          labelClassName="search-result-label"
          text={totalFound}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
