import { useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { prefixStyle, shuffle, getName } from "@/utils";
import { playMode } from "@/config";
import Scroll from "@/commponents/Scroll";
import Confirm from "@/commponents/Confirm";
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayList,
  changePlayMode,
  deleteSong,
  clearState,
} from "../../store/slice";
import "./index.scss";

const PlayList = () => {
  const playListRef = useRef();
  const listWrapperRef = useRef();
  const [isShow, setIsShow] = useState(false);
  const [canTouch, setCanTouch] = useState(true);
  const [startY, setStartY] = useState(0);
  const [initialed, setInitialed] = useState(0);
  const [distance, setDistance] = useState(0);

  const confirmRef = useRef();
  const listContentRef = useRef();

  const showPlayList = useSelector((state) => state.player.showPlayList);
  const currentSong = useSelector((state) => state.player.currentSong);
  const currentIndex = useSelector((state) => state.player.currentIndex);
  const playList = useSelector((state) => state.player.playList);
  const sequencePlayList = useSelector((state) => state.player.sequencePlayList);
  const mode = useSelector((state) => state.player.mode);

  const dispatch = useDispatch();

  const transform = prefixStyle("transform");

  const handleClickWrapper = () => {
    dispatch(changeShowPlayList(false));
  };

  const onEnterCb = useCallback(() => {
    setIsShow(true);
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  const onEnteringCb = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);
  const onExitingCb = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  const onExitedCb = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);

  const getPlayMode = () => {
    let content;
    let text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "Order Play";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "Loop Play";
    } else {
      content = "&#xe61b;";
      text = "Random Play";
    }

    return (
      <div>
        <i
          className="iconfont"
          onClick={(e) => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    );
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      dispatch(changePlayList(sequencePlayList));
      let index = sequencePlayList.findIndex((item) => item.id === currentSong.id);
      dispatch(changeCurrentIndex(index));
    } else if (newMode === 1) {
      dispatch(changePlayList(sequencePlayList));
    } else if (newMode === 2) {
      dispatch(changePlayList(sequencePlayList));
      let randomList = shuffle(sequencePlayList);
      let index = randomList.findIndex((item) => item.id === currentSong.id);
      dispatch(changeCurrentIndex(index));
    }
    dispatch(changePlayMode(newMode));
  };

  const handleShowClear = () => {
    confirmRef.current.show();
  };

  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id;
    const className = current ? "icon-play" : "";
    const content = current ? "&#xe6e3;" : "";

    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    dispatch(changeCurrentIndex(index));
  };

  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    dispatch(deleteSong(song));
  };

  const handleConfirmClear = () => {
    dispatch(clearState());
  };

  const handleTouchStart = (e) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current.style["transition"] = "";
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true);
  };
  const handleTouchMove = (e) => {
    if (!canTouch || !initialed) return;
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance);
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };
  const handleTouchEnd = (e) => {
    setInitialed(false);
    if (distance >= 150) {
      dispatch(changeShowPlayList(false));
    } else {
      listWrapperRef.current.style["transition"] = "all 0.3s";
      listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
    }
  };
  const handleScroll = (pos) => {
    let state = pos.y === 0;
    setCanTouch(state);
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCb}
      onEntering={onEnteringCb}
      onExiting={onExitingCb}
      onExited={onExitedCb}
    >
      <div
        className="playlist-wrapper"
        ref={playListRef}
        style={{
          display: isShow ? "block" : "none",
        }}
        onClick={handleClickWrapper}
      >
        <div
          className="list-wrapper"
          ref={listWrapperRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="list-header">
            <h1 className="title">{getPlayMode()}</h1>
            <span className="iconfont clear" onClick={handleShowClear}>
              &#xe63d;
            </span>
          </div>
          <div className="scroll-wrapper">
            <Scroll ref={listContentRef} bounceTop={false} onScroll={(pos) => handleScroll(pos)}>
              <div className="list-content">
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </div>
            </Scroll>
          </div>
        </div>
        <Confirm
          ref={confirmRef}
          text={"Are you sure to delete all songs?"}
          cancelBtnText={"Cancel"}
          confirmBtnText={"Confirm"}
          handleConfirm={handleConfirmClear}
        ></Confirm>
      </div>
    </CSSTransition>
  );
};

export default PlayList;
