import React, { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";

import ProgressBar from "@/commponents/ProgressBar";
import Scroll from "@/commponents/Scroll";
import { getName, prefixStyle, formatPlayTime } from "@/utils";
import { playMode } from "@/config";

import "./index.scss";

const NormalPlayer = (props) => {
  const { song, fullScreen, playing, percent, duration, currentTime, mode } = props;
  const {
    toggleFullScreen,
    clickPlaying,
    onProgressChange,
    onPrev,
    onNext,
    changeMode,
    togglePlayList,
  } = props;
  const { currentLyric, currentPlayingLyric, currentLineNum } = props;

  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  const currentState = useRef("");
  const lyricScrollRef = useRef();
  const lyricLineRefs = useRef([]);

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if (currentLineNum.current > 5) {
      let lineEl = lyricLineRefs.current[currentLineNum.current - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style.transition = "all 0.4s";
    cdWrapperDom.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style.transform = "";
    normalPlayerRef.current.style.display = "none";

    currentState.current = "";
  };

  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
    } else {
      content = "&#xe61b;";
    }
    return content;
  };

  const handleTogglePlayList = (e) => {
    togglePlayList(true);
    e.stopPropagation();
  };

  const toggleCurrentState = () => {
    if (currentState.current !== "lyric") {
      currentState.current = "lyric";
    } else {
      currentState.current = "";
    }
  };
  return (
    <CSSTransition
      in={fullScreen}
      timeout={400}
      classNames="normal"
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className="normal-player-container" ref={normalPlayerRef}>
        <div className="background">
          <img src={song.al.picUrl + "?param=300x300"} width="100%" height="100%" alt="img" />
        </div>
        <div className="background layer"></div>
        <div className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </div>
        <div className="middle" ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition timeout={400} classNames="fade" in={currentState.current !== "lyric"}>
            <div
              className="cd-wrapper"
              style={{
                visibility: currentState.current !== "lyric" ? "visible" : "hidden",
              }}
            >
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={song.al.picUrl + "?param=400x400"}
                  alt="img"
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </div>
          </CSSTransition>
          <CSSTransition timeout={400} classNames="fade" in={currentState.current === "lyric"}>
            <div className="lyric-container">
              <Scroll ref={lyricScrollRef}>
                <div
                  className="lyric-wrapper"
                  style={{
                    visibility: currentState.current === "lyric" ? "visible" : "hidden",
                  }}
                >
                  {currentLyric ? (
                    currentLyric.lines.map((item, index) => {
                      lyricLineRefs.current[index] = React.createRef();
                      return (
                        <p
                          className={`text ${currentLineNum === index ? "current" : ""}`}
                          key={item + index}
                          ref={lyricLineRefs.current[index]}
                        >
                          {item.txt}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text pure">Instrumental music, please enjoy it.</p>
                  )}
                </div>
              </Scroll>
            </div>
          </CSSTransition>
        </div>
        <div className="bottom">
          <div className="progress-wrapper">
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </div>
          <div className="operators">
            <div className="icon i-left" onClick={changeMode}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{
                  __html: getPlayMode(),
                }}
              ></i>
            </div>
            <div className="icon i-left" onClick={onPrev}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;",
                }}
              ></i>
            </div>
            <div className="icon i-right" onClick={onNext}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right" onClick={handleTogglePlayList}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NormalPlayer;
