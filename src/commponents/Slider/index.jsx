import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

const Slider = (props) => {
  const { bannerList } = props;

  return (
    <div className="slider-container-wrapper">
      <div className="before"></div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="slider-container"
        autoplay={true}
        loop={true}
      >
        {bannerList.map((slider, index) => {
          return (
            <SwiperSlide key={slider.imageUrl + index}>
              <div className="slider-nav">
                <img src={slider.imageUrl} width="100%" height="100%" alt="Recommend" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
