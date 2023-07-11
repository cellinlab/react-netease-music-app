import { useEffect, useRef, useState } from "react";

import "./index.scss";

const ProgressBar = (props) => {
  const { percentChange, percent } = props;

  const progressBarRef = useRef();
  const progress = useRef();
  const progressBtn = useRef();
  const [touch, setTouch] = useState({});

  const progressBtnWidth = 16;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent]);

  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  };

  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  };

  const progressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };
  return (
    <div className="progress-bar-wrapper">
      <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
