import React from "react";
import LazyLoad from "react-lazyload";

import { getCount } from "@/utils";
import defaultImg from "./music.png";

import "./index.scss";

const RecommendList = (props) => {
  const { recommendList } = props;

  return (
    <div className="list-wrapper">
      <div className="title">Recommend List</div>
      <div className="list">
        {recommendList.map((item, index) => {
          return (
            <div className="list-item" key={item.id + index}>
              <div className="img-wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={<img width="100%" height="100%" src={defaultImg} alt="music" />}
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play-count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendList;
