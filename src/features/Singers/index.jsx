import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";

import Horizen from "@/commponents/Horizen";
import { categoryTypes, alphaTypes } from "@/config";
import Scroll from "@/commponents/Scroll";
import Loading from "@/commponents/Loading";
import {
  fetchSingerList,
  fetchMoreSingerList,
  fetchHotSingerList,
  fetchMoreHotSingerList,
} from "./store/actionCreator";
import {
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading,
} from "./store/slice";
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from "./data";

import defaultSingPic from "./singer.png";
import "./index.scss";

const Singers = () => {
  const { data: categoryData, dispatch: categoryDataDispatch } = useContext(CategoryDataContext);

  const { category, alpha } = categoryData;
  const singerList = useSelector((state) => state.singers.singerList);
  const enterLoading = useSelector((state) => state.singers.enterLoading);
  const pullUpLoading = useSelector((state) => state.singers.pullUpLoading);
  const pullDownLoading = useSelector((state) => state.singers.pullDownLoading);
  const pageCount = useSelector((state) => state.singers.pageCount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!singerList.length) {
      dispatch(fetchHotSingerList());
    }
  }, [dispatch]);

  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(fetchSingerList({ category, alpha }));
  };

  const pullUpRefreshDispatch = (category, alpha, hot, pageCount) => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (hot) {
      dispatch(fetchMoreHotSingerList({ pageCount }));
    } else {
      dispatch(fetchMoreSingerList({ category, alpha, pageCount }));
    }
  };

  const pullDownRefreshDispatch = (category, alpha) => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === "" && alpha === "") {
      dispatch(fetchHotSingerList());
    } else {
      dispatch(fetchSingerList({ category, alpha }));
    }
  };

  const handleUpdateAlpha = (val) => {
    categoryDataDispatch({ type: CHANGE_ALPHA, payload: val });
    updateDispatch(category, alpha);
  };

  const handleUpdateCategory = (val) => {
    categoryDataDispatch({ type: CHANGE_CATEGORY, payload: val });
    updateDispatch(category, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  return (
    <div className="singers-page">
      <div className="singer-nav">
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          oldVal={category}
          handleClick={handleUpdateCategory}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={handleUpdateAlpha}
        ></Horizen>
      </div>
      <div className="list-container">
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          <div className="list">
            {singerList.map((item, index) => {
              return (
                <div className="list-item" key={item.accountId + "" + index}>
                  <div className="img-wrapper">
                    <LazyLoad
                      placeholder={
                        <img width="100%" height="100%" src={defaultSingPic} alt="music" />
                      }
                    >
                      <img
                        src={`${item.picUrl}?param=300x300`}
                        width="100%"
                        height="100%"
                        alt="music"
                      />
                    </LazyLoad>
                  </div>
                  <span className="name">{item.name}</span>
                </div>
              );
            })}
          </div>
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </div>
    </div>
  );
};

export default Singers;
