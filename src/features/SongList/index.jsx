import { forwardRef, memo } from "react";

import { getName } from "@/utils";

import "./index.scss";

const SongList = forwardRef((props, ref) => {
  const { collectCount, showCollect, songs } = props;
  const totalCount = songs.length;

  const selectItem = (e, index) => {
    console.log(e, index);
  };

  return (
    <div className="song-list" ref={ref}>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            Play All <span className="sum">(total {totalCount} songs)</span>
          </span>
        </div>
        {showCollect ? (
          <div className="add-list">
            <i className="iconfont">&#xe62d;</i>
            <span>Collect ({Math.floor(collectCount / 1000) / 10}M)</span>
          </div>
        ) : null}
      </div>
      <ul className="song-item">
        {songs.map((item, index) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, index)}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
                  {item.al ? item.al.name : item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default memo(SongList);
