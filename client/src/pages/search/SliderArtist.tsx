import { IArtist } from '../../features/artist/artistSlice'
import { Swiper, SwiperSlide } from "swiper/react";
import ArtistCard from '../../components/SliderCard/ArtistCard';
import styled from 'styled-components';
import { sliderSettings } from '../../utils/common';
import "swiper/css";
interface SliderArtistprop{
    artists:IArtist []
}
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
const SliderArtist = ({artists}:SliderArtistprop) => {
  return (
    <Container>
      <Swiper
       {...sliderSettings}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {
            artists.length > 0 &&
            artists.map((artist)=> 
            <SwiperSlide>
              <ArtistCard  artist={artist}/>
            </SwiperSlide>
            )
        }
      
      </Swiper>
    </Container>
  )
}

export default SliderArtist