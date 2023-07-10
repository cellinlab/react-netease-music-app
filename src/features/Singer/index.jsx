import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Loading from "@/commponents/Loading";
import Header from "@/commponents/Header";
import Scroll from "@/commponents/Scroll";
import SongList from "@/features/SongList";
import { HEADER_HEIGHT } from "@/config";

import { fetchSingerInfo } from "./store/actionCreator";
import "./index.scss";

const Singer = () => {
  const [showStatus, setShowStatus] = useState(true);
  const collectBtnRef = useRef();
  const imgWrapperRef = useRef();
  const songScrollWrapperRef = useRef();
  const songScrollRef = useRef();
  const headerRef = useRef();
  const layerRef = useRef();

  const initialHeight = useRef(0);
  const OFFSET = 5;

  const artist = useSelector((state) => state.singer.artist);
  const songsOfArtist = useSelector((state) => state.singer.songsOfArtist);
  const loading = useSelector((state) => state.singer.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingerInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    const h = imgWrapperRef.current.offsetHeight;
    songScrollWrapperRef.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    layerRef.current.style.top = `${h - OFFSET}px`;
    songScrollRef.current.refresh();
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos) => {
    const height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imgWrapperRef.current;
    const buttonDOM = collectBtnRef.current;
    const headerDOM = headerRef.current;
    const layerDOM = layerRef.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;

      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;

      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;

      headerDOM.style.zIndex = 100;

      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <div className="singer-container">
        <Header title={artist.name} handleClick={setShowStatusFalse} ref={headerRef} />
        <div
          ref={imgWrapperRef}
          className="img-wrapper"
          style={{
            backgroundImage: `url(${artist.picUrl})`,
            backgroundSize: "cover",
          }}
        >
          <div className="filter"></div>
        </div>
        <div className="collect-btn" ref={collectBtnRef}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">Collect</span>
        </div>
        <div className="bg-layer" ref={layerRef}></div>
        <div className="songlist-wrapper" ref={songScrollWrapperRef}>
          <Scroll ref={songScrollRef} onScroll={handleScroll}>
            <SongList songs={songsOfArtist} showCollect={false} />
          </Scroll>
        </div>
        {loading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
};

export default Singer;
