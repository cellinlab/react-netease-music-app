import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Toast from "@/commponents/Toast";
import MiniPlayer from "./components/MiniPlayer";
import NormalPlayer from "./components/NormalPlayer";
import PlayList from "./components/PlayList";
import { getSongUrl, isEmptyObject, shuffle } from "@/utils";
import { playMode } from "@/config";

import {
  changeFullScreen,
  changePlayingState,
  changeCurrentSong,
  changeCurrentIndex,
  changePlayList,
  changePlayMode,
  changeShowPlayList,
} from "./store/slice";

const Player = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState("");
  const audioRef = useRef();
  const toastRef = useRef();
  const songReady = useRef(true);

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const fullScreen = useSelector((state) => state.player.fullScreen);
  const playing = useSelector((state) => state.player.playing);
  const currentSong = useSelector((state) => state.player.currentSong);
  const currentIndex = useSelector((state) => state.player.currentIndex);
  const playList = useSelector((state) => state.player.playList);
  const mode = useSelector((state) => state.player.mode);
  const sequencePlayList = useSelector((state) => state.player.sequencePlayList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    ) {
      return;
    }
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current);
    songReady.current = false;
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play().then(() => {
        songReady.current = true;
      });
    });
    dispatch(changePlayingState(true));
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const handleToggleFullScreen = (fullScreen) => {
    dispatch(changeFullScreen(fullScreen));
  };

  const handleClickPlaying = (e, state) => {
    e.stopPropagation();
    dispatch(changePlayingState(state));
  };

  const handleUpdateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changePlayingState(true));
    }
  };

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlayingState(true));
    audioRef.current.play();
  };

  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }

    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(changePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }

    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(changePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleChangeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      dispatch(changePlayList(sequencePlayList));
      let index = sequencePlayList.findIndex((item) => item.id === currentSong.id);
      dispatch(changeCurrentIndex(index));
      setModeText("Order Play");
    } else if (newMode === 1) {
      dispatch(changePlayList(sequencePlayList));
      setModeText("Single Play");
    } else if (newMode === 2) {
      let newList = shuffle(sequencePlayList);
      let index = newList.findIndex((item) => item.id === currentSong.id);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
      setModeText("Random Play");
    }
    dispatch(changePlayMode(newMode));
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const handleError = () => {
    songReady.current = true;
    alert("Play Error");
  };

  const togglePlayList = (show) => {
    dispatch(changeShowPlayList(show));
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          percent={percent}
          toggleFullScreen={handleToggleFullScreen}
          clickPlaying={handleClickPlaying}
          togglePlayList={togglePlayList}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          mode={mode}
          toggleFullScreen={handleToggleFullScreen}
          clickPlaying={handleClickPlaying}
          onProgressChange={handleProgressChange}
          onPrev={handlePrev}
          onNext={handleNext}
          changeMode={handleChangeMode}
          togglePlayList={togglePlayList}
        />
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={handleUpdateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <PlayList />
      <Toast text={modeText} ref={toastRef} />
    </div>
  );
};

export default Player;
