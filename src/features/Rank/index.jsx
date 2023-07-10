import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Scroll from "@/commponents/Scroll";
import Loading from "@/commponents/Loading";
import { fetchRankList } from "./store/actionCreator";
import { findFirstNoTrackIndex } from "@/utils";

import "./index.scss";

const SongList = (props) => {
  const { list } = props;

  return list.length ? (
    <ul className="song-list">
      {list.map((item, index) => {
        return (
          <li key={index} className="song-item">
            {index + 1}. {item.first} - {item.second}
          </li>
        );
      })}
    </ul>
  ) : null;
};

const RankList = (props) => {
  const { list, global } = props;

  return (
    <ul className="rank-list" style={global ? { display: "flex" } : { display: "block" }}>
      {list.map((item, index) => {
        return (
          <li
            className="list-item"
            key={item.coverImgId + "" + index}
            style={global ? { display: "block" } : { display: "flex" }}
          >
            <div
              className="img_wrapper"
              style={global ? { width: "32vw", height: "32vw" } : { width: "27vw", height: "27vw" }}
            >
              <img src={item.coverImgUrl} alt="cover" />
              <div className="decorate"></div>
              <span className="update_frequency">{item.updateFrequency}</span>
            </div>
            <SongList list={item.tracks} />
          </li>
        );
      })}
    </ul>
  );
};

const Rank = () => {
  const rankList = useSelector((state) => state.rank.rankList);
  const loading = useSelector((state) => state.rank.loading);

  const globalStartIndex = findFirstNoTrackIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!rankList.length) {
      dispatch(fetchRankList());
    }
  }, [dispatch]);

  return (
    <div className="rank-container">
      <Scroll>
        <div>
          <h1 className="official">Official Rank</h1>
          <RankList list={officialList} />
          <h1 className="global">Global Rank</h1>
          <RankList list={globalList} global={true} />
          {loading ? (
            <div className="loading">
              <Loading />
            </div>
          ) : null}
        </div>
      </Scroll>
      <Outlet />
    </div>
  );
};

export default Rank;
