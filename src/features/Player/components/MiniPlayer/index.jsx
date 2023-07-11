import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import ProgressCircle from "@/commponents/ProgressCircle";
import { getName } from "@/utils";
import "./index.scss";

const MiniPlayer = (props) => {
  const { song, fullScreen, playing, percent } = props;
  const { toggleFullScreen, clickPlaying, togglePlayList } = props;

  const miniPlayerRef = useRef();

  const handleTogglePlayList = (e) => {
    e.stopPropagation();
    togglePlayList(true);
  };

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <div
        className="mini-player-container"
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="img-wrapper">
            <img
              src={song.al.picUrl}
              alt="img"
              width="40"
              height="40"
              className={`play ${playing ? "" : "pause"}`}
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i className="iconfont icon-mini icon-pause" onClick={(e) => clickPlaying(e, false)}>
                &#xe650;
              </i>
            ) : (
              <i className="iconfont icon-mini icon-play" onClick={(e) => clickPlaying(e, true)}>
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </div>
    </CSSTransition>
  );
};

export default MiniPlayer;
