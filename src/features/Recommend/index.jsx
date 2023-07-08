import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Slider from "@/commponents/Slider";
import Scroll from "@/commponents/Scroll";
import RecommendList from "./components/List";

import { fetchBannerList, fetchRecommendList } from "./store/actionCreator";

import "./index.scss";

const Recommend = () => {
  const bannerList = useSelector((state) => state.recommend.bannerList);
  const recommendList = useSelector((state) => state.recommend.recommendList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBannerList());
    dispatch(fetchRecommendList());
  }, [dispatch]);

  return (
    <div className="recommend-content">
      <Scroll onScroll={(scroll) => console.log(scroll)}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </div>
  );
};

export default Recommend;
