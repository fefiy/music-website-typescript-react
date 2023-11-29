import  { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import { IArtist, fetchArtistsStart } from "../../features/artist/artistSlice";
import { RootState } from "../../features/store";
import SliderArtist from "./SliderArtist";
import SliderAlbum from "./SliderAlbums";
import { IAlbum, fetchalbumsStart } from "../../features/album/albumSlice";
import SliderGenere from "./SliderGener";
import styled, { css } from "styled-components";
import { FilterConstants } from "../../data";
import { useNavigate } from "react-router-dom";
import { song } from "../../models/song";
import All from "../SearchTerm/All";
import { getMusic } from "../../features/music/musicSlice";
import Artist from "../SearchTerm/Artist";
import Song from "../SearchTerm/Song";
import Album from "../SearchTerm/Album";
import Genere from "../SearchTerm/Genere";
import { musicGenres} from "../../data";
interface searchProp {
  serchFilter: string;
}
const Search = ({ serchFilter }: searchProp) => {
  const dispatch = useDispatch();
  console.log(" serach filter from top bar", serchFilter);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  // const [serchFilter, setserchFilter] = useState<string>("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { songs , isMusicDelSuccesfuly } = useSelector((state: RootState) => state.songs);
  const { albums } = useSelector((state: RootState) => state.album);
  const { artists } = useSelector((state: RootState) => state.artist);
  const [filterSong, setFilterSong] = useState<song[] | null>(null);
  const [filterAlbums, setFilterAlbums] = useState<IAlbum[] | null>(null);
  const [filterArtists, setFilterArtists] = useState<IArtist[] | null>(null);
  const [filterGenres, setFilterGeners] = useState<string[] | null>(null);
  const {activeSong, isPlaying, } = useSelector((state:RootState) => state.player)
  const navigate = useNavigate();
  console.log("activeSong from idex search "  , activeSong, isPlaying)
  useEffect(() => {
    console.log("UseEffect callded inside Searh Term Componentes");
    dispatch(getMusic());
    dispatch(fetchArtistsStart());
    dispatch(fetchalbumsStart());
    if (songs.length > 0) {
      const filsong = songs.filter((song) =>
        song.title.toLowerCase().includes(serchFilter.toLowerCase())
      );
      console.log("filter song", filsong);
      setFilterSong(filsong);
    }
    if (albums.length > 0) {
      const filalb = albums.filter((so) =>
        so.name.toLowerCase().includes(serchFilter.toLowerCase())
      );
      setFilterAlbums(filalb);
    }
    if (albums.length > 0) {
      const filarti = artists.filter((so) =>
        so.name.toLowerCase().includes(serchFilter.toLowerCase())
      );
      setFilterArtists(filarti);
    }
    if (albums.length > 0) {
      const filgener = musicGenres.filter((so) =>
        so.toLowerCase().includes(serchFilter.toLowerCase())
      );
      setFilterGeners(filgener);
    }
    if (searchRef.current) {
      searchRef.current.focus();
    }
    // if(activeFilter === ""){

    // }
  }, [serchFilter, navigate, isMusicDelSuccesfuly]);

  console.log("artist from search", artists);
  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
  };
  console.log("filter songs", filterSong);
  return (
    <Container>
      {serchFilter === "" ? (
        <div>
          <SliderContainer>
            <Title>Artist</Title>
            {artists.length > 0 && <SliderArtist artists={artists} />}
            <Title>Albums</Title>
            {albums.length > 0 && <SliderAlbum albums={albums} />}
            <Title>Geners</Title>
            <SliderGenere />
          </SliderContainer>
        </div>
      ) : (
        <div>
          <FilterButtons>
            {FilterConstants.map((item, index) => (
              <FiterItems
                key={index}
                onClick={() => handleWorkFilter(item)}
                active={activeFilter === item}>
                {item}
              </FiterItems>
            ))}
          </FilterButtons>
          {activeFilter === "All" && (
            <All
              artists={filterArtists}
              filtersongs={filterSong}
              generes={filterGenres}
              albums={filterAlbums}
            />
          )}
          {activeFilter === "Albums" && <Album albums={filterAlbums} />}
          {activeFilter === "Artists" && <Artist artists={filterArtists} />}
          {activeFilter === "Songs" && <Song songsdata={filterSong} />}
          {activeFilter === "Generes" && <Genere generes={filterGenres} />}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 98%;
  margin: 2px auto;
  background: linear-gradient(to bottom, #031b34, #040c18);

`;
const SliderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Title = styled.h1`
  margin: 20px 0px;
  color: white;
  font-size: 20;
  font-weight: bold;
  text-transform: capitalize;
`;
const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  position: sticky;
  top: 70px;
  z-index: 500;
  @media (max-width: 520px) {
    margin: 5px;
  }
`;
const FiterItems = styled.div<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #000;
  font-weight: 800;

  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover {
    background-color: gold;
    color: #fff;
  }
  ${(props) =>
    props.active &&
    css`
      background-color: gold;
      color: #fff;
    `}
  @media(max-width:510px) {
    margin: 5px;
    font-size: 20px;
    font-weight: 600;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
  }
  @media(max-width:453px) {
    margin: 5px;
    font-size: 17px;
    font-weight: 600;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
  }
  @media(max-width:453px) {
    margin: 3px;
    font-size: 14px;
    font-weight: 600;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
  }
`;

export default Search;
