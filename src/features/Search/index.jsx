import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import LazyLoad, { forceCheck } from "react-lazyload";

import SearchBox from "@/commponents/SearchBox";
import Scroll from "@/commponents/Scroll";
import Loading from "@/commponents/Loading";
import MusicNote from "@/commponents/MusicNote";
import { getName } from "@/utils";

import defaultMusicImg from "./music.png";
import defaultSingerImg from "./singer.png";
import { fetchHotKeyWords, fetchSuggestList } from "./store/actionCreator";
import { changeEnterLoading } from "./store/slice";
import { getSongDetail } from "@/features/Player/store/actionCreator";
import "./index.scss";

const Search = () => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const musicNoteRef = useRef();

  const hotList = useSelector((state) => state.search.hotList);
  const suggestList = useSelector((state) => state.search.suggestList);
  const songsCount = useSelector((state) => state.player.playList.length);
  const songsList = useSelector((state) => state.search.songsList);
  const enterLoading = useSelector((state) => state.search.enterLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
    if (!hotList.length) {
      dispatch(fetchHotKeyWords());
    }
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q) => {
    setQuery(q);
    if (!q) return;
    dispatch(changeEnterLoading(true));
    dispatch(fetchSuggestList(q));
  };

  const selectItem = (e, id) => {
    dispatch(getSongDetail(id));
    musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
    e.stopPropagation();
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => {
        navigate(-1);
      }}
    >
      <div
        className="search-container"
        style={{
          bottom: songsCount ? "60px" : "",
        }}
      >
        <div className="search-box-wrapper">
          <SearchBox newQuery={query} handleQuery={handleQuery} back={searchBack} />
        </div>
        <div
          className="shortcut-wrapper"
          style={{
            display: query ? "none" : "",
          }}
        >
          <Scroll>
            <div>
              <div className="hot-keyword">
                <h1 className="title">Popular Search</h1>
                <ul>
                  {hotList.map((item) => {
                    return (
                      <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                        <span>{item.first}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Scroll>
        </div>
        <div
          className="shortcut-wrapper"
          style={{
            display: query ? "" : "none",
          }}
        >
          <Scroll onScroll={forceCheck}>
            <div>
              {suggestList.artists && suggestList.artists.length && (
                <div className="list">
                  <h1 className="title">Related Singers</h1>
                  {suggestList.artists.map((item, index) => {
                    return (
                      <div
                        className="list-item"
                        key={item.accountId + "" + index}
                        onClick={() => navigate(`/singers/${item.id}`)}
                      >
                        <div className="img-wrapper">
                          <LazyLoad
                            placeholder={
                              <img width="100%" height="100%" src={defaultSingerImg} alt="singer" />
                            }
                          >
                            <img src={item.picUrl} width="100%" height="100%" alt="singer" />
                          </LazyLoad>
                        </div>
                        <span className="name">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {suggestList.playlists && suggestList.playlists.length && (
                <div className="list">
                  <h1 className="title">Related Albums </h1>
                  {suggestList.playlists.map((item, index) => {
                    return (
                      <div
                        className="list-item"
                        key={item.accountId + "" + index}
                        onClick={() => navigate(`/album/${item.id}`)}
                      >
                        <div className="img-wrapper">
                          <LazyLoad
                            placeholder={
                              <img width="100%" height="100%" src={defaultMusicImg} alt="music" />
                            }
                          >
                            <img src={item.coverImgUrl} width="100%" height="100%" alt="music" />
                          </LazyLoad>
                        </div>
                        <span className="name">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {songsList.length && (
                <ul
                  className="song-list"
                  style={{
                    paddingLeft: "20px",
                  }}
                >
                  {songsList.map((item, index) => {
                    return (
                      <li
                        className="song-item"
                        key={item.id + "" + index}
                        onClick={(e) => selectItem(e, item.id)}
                      >
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.artists)} - {item.album.name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Scroll>
        </div>
        {enterLoading ? <Loading /> : null}
        <MusicNote ref={musicNoteRef} />
      </div>
    </CSSTransition>
  );
};

export default Search;
