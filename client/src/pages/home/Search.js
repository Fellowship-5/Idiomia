import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import Badge from "../../components/Badge";
import { useSearch, useLocation } from "../../redux/hooks";
import "./Search.css";

const Search = () => {
  const { setSearchTerm, searchTerm, isActive, filtered } = useSearch();
  const { setLocationChanged } = useLocation();
  const searchInput = useRef(null);
  const [searchIcon, setSearchIcon] = useState({
    isClicked: false,
  });
  const history = useHistory();

  useEffect(
    function listenLocationChanges() {
      return history.listen(() => {
        setLocationChanged();
      });
    },
    [history, setLocationChanged]
  );

  const handleChange = (e) => setSearchTerm(e.target.value);
  const handleIconClick = (e) => {
    e.preventDefault();
    searchInput.current.focus();
    setSearchIcon((prevSt) => ({ isClicked: !prevSt.isClicked }));
    searchIcon.isClicked && setSearchTerm("");
  };

  return (
    <>
      <div className="search-icon-container mr-3">
        <Icon
          title="Search"
          icon={searchIcon.isClicked ? "faTimes" : "faSearch"}
          onClick={handleIconClick}
          id="home-search-icon"
          size="1x"
          fixedWidth
          color="rgb(51, 51, 51)"
        />
      </div>
      <div
        className={
          searchIcon.isClicked
            ? "search-form-container active"
            : "search-form-container"
        }
      >
        <Input
          type="text"
          placeholder="Search Proverb"
          className="search-bar"
          pClassName="search-bar-container"
          onChange={handleChange}
          value={isActive ? searchTerm : ""}
          id="homepage-search-proverb"
          inputRef={searchInput}
        />
      </div>
      {isActive ? (
        <Badge
          variant="secondary"
          label="Found:"
          className="mx-2"
          labelClassName="search-result-label"
          text={filtered.length}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
