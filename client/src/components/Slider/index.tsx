import BrowseCard from "../BrowseCard";
import { Swiper, SwiperSlide } from "swiper/react";
const Slider = () => {
  
  return (
    <div style={{ width: "800px", overflow: "hidden", margin: "0 auto" }}>
      Search
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        <SwiperSlide>
          {" "}
          <BrowseCard />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <BrowseCard />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <BrowseCard />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <BrowseCard />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <BrowseCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
