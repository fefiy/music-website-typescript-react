import { Swiper, SwiperSlide } from "swiper/react";
import styled from 'styled-components';
import AlbumCard from '../../components/SliderCard/AlbumCard';
import { IAlbum } from '../../features/album/albumSlice';
import { sliderSettings } from '../../utils/common';
import "swiper/css";
interface SliderAlbumprop{
    albums:IAlbum []
}
const Container = styled.div`
`;

const SliderAlbum = ({albums}:SliderAlbumprop) => {
  return (
    <Container>
      <Swiper
      {...sliderSettings}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {
            albums.length > 0 &&
            albums.map((album)=> 
            <SwiperSlide>
              <AlbumCard  album={album}/>
            </SwiperSlide>
            )
        }
      
      </Swiper>
    </Container>
  )
}

export default SliderAlbum