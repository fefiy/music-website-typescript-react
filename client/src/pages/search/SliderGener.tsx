import { Swiper, SwiperSlide } from "swiper/react";
import GenereCard from '../../components/SliderCard/GenereCard';
import styled from 'styled-components';
import { musicGenres, colors, genereimage } from '../../data';
import { sliderSettings } from '../../utils/common';
import "swiper/css";
const Container = styled.div`
  // width:1000px;
  // display: flex;
  // align-items: center;
  // justify-content:center;
  // border-radius: 20px;
  // overflow: hidden;
  // margin: 0 auto;   
  
  // @media (max-width: 760px) {
  //   width: 650px;
  //   background: yellow;
  // }
  // @media (max-width: 600px) {
  //   width: 450px;
  //   background: yellow;
  // }
  // @media (max-width: 480px) {
  //   width: 440px;
  // }
  // @media (max-width: 400px) {
  //   width: 300px;
  // }
`;

const SliderGenere = () => {
  return (
    <Container>
      <Swiper
        {...sliderSettings}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {
            musicGenres.length > 0 &&
            musicGenres.map((genere, i)=> 
            <SwiperSlide>
              <GenereCard genre={genere} img={genereimage[i]} bg={colors[i]} />
            </SwiperSlide>
            )
        }
      
      </Swiper>
    </Container>
  )
}

export default SliderGenere