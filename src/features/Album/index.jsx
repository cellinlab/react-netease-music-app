import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Header from "@/commponents/Header";
import Scroll from "@/commponents/Scroll";
import Loading from "@/commponents/Loading";
import { getCount, getName, isEmptyObject } from "@/utils";
import { HEADER_HEIGHT } from "@/config";
import { fetchAlbumDetail } from "./store/actionCreator";

import "./index.scss";

const Album = () => {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("Album");
  const [isMarquee, setIsMarquee] = useState(false);
  const headerEl = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentAlbum = useSelector((state) => state.album.currentAlbum);
  const enterLoading = useSelector((state) => state.album.enterLoading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAlbumDetail(id));
  }, [dispatch, id]);

  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;

      if (headerDom) {
        if (pos.y < minScrollY) {
          headerDom.style.backgroundColor = "#d44439";
          headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
          setTitle(currentAlbum.name);
          setIsMarquee(true);
        } else {
          headerDom.style.backgroundColor = "";
          headerDom.style.opacity = 1;
          setTitle("Album");
          setIsMarquee(false);
        }
      }
    },
    [currentAlbum]
  );

  const handleExit = () => {
    navigate(-1);
  };

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={handleExit}
    >
      <div className="album-container">
        <Header title={title} ref={headerEl} isMarquee={isMarquee} handleClick={handleBack} />
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              <div className="top-desc">
                <div
                  className="background"
                  style={{
                    background: `url(${currentAlbum.coverImgUrl}) no-repeat`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "0 0",
                  }}
                >
                  <div className="filter"></div>
                </div>
                <div className="img-wrapper">
                  <div className="decorate"></div>
                  <img src={currentAlbum.coverImgUrl} alt="cover" />
                  <div className="play-count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">
                      {Math.floor(currentAlbum.subscribedCount / 1000) / 10} M{" "}
                    </span>
                  </div>
                </div>
                <div className="desc-wrapper">
                  <div className="title">{currentAlbum.name}</div>
                  <div className="person">
                    <div className="avatar">
                      <img src={currentAlbum.creator.avatarUrl} alt="avatar" />
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                  </div>
                </div>
              </div>
              <div className="menu">
                <div>
                  <i className="iconfont">&#xe6ad;</i>
                  Comment
                </div>
                <div>
                  <i className="iconfont">&#xe86f;</i>
                  Like
                </div>
                <div>
                  <i className="iconfont">&#xe62d;</i>
                  Collect
                </div>
                <div>
                  <i className="iconfont">&#xe606;</i>
                  More
                </div>
              </div>
              <div className="song-list">
                <div className="first-line">
                  <div className="play-all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span>
                      Play All{" "}
                      <span className="sum">(Total {currentAlbum.tracks.length} songs)</span>
                    </span>
                  </div>
                  <div className="add-list">
                    <i className="iconfont">&#xe62d;</i>
                    <span>Collected ({getCount(currentAlbum.subscribedCount)})</span>
                  </div>
                </div>
                <ul className="song-item">
                  {currentAlbum.tracks.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.ar)} - {item.al.name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
};

export default Album;
