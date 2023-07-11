import { useState, useEffect, useMemo, useRef } from "react";

import { debounce } from "@/utils";

import "./index.scss";

const SearchBox = (props) => {
  const { newQuery } = props;
  const { handleQuery, back } = props;

  const [query, setQuery] = useState("");
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.focus();
  }, []);

  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setQuery(value);
  };

  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  const clearQuery = () => {
    setQuery("");
    queryRef.current.focus();
  };

  return (
    <div className="searchbox-wrapper">
      <div
        className="iconfont back"
        onClick={() => {
          back();
        }}
      >
        &#xe655;
      </div>
      <input
        type="text"
        className="box"
        placeholder="Search for songs, singers, albums"
        value={query}
        ref={queryRef}
        onChange={handleChange}
      />
      <i className="iconfont icon-delete" onClick={clearQuery}>
        &#xe600;
      </i>
    </div>
  );
};

export default SearchBox;
