import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";

import Slider from "@/commponents/Slider";
import Scroll from "@/commponents/Scroll";
import Loading from "@/commponents/Loading";
import RecommendList from "./components/List";

import { fetchBannerList, fetchRecommendList } from "./store/actionCreator";

import "./index.scss";

const Recommend = () => {
  const bannerList = useSelector((state) => state.recommend.bannerList);
  const recommendList = useSelector((state) => state.recommend.recommendList);
  const enterLoading = useSelector((state) => state.recommend.enterLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBannerList());
    dispatch(fetchRecommendList());
  }, [dispatch]);

  return (
    <div className="recommend-content">
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
      <Outlet />
    </div>
  );
};

export default Recommend;
