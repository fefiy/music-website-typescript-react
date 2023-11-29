import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { song} from "../../models/song";
import RelatedSongs from "../../components/relatedSongs/RelatedSongs";
import { setActiveSong, playPause } from "../../features/play/playerSlice";
import { RootState } from "../../features/store";
import { IArtist, fetchArtistsStart } from "../../features/artist/artistSlice";
const Container = styled.div`
width: 98%;
margin: 10px auto;
background: linear-gradient(to bottom, #031b34, #040c18);
`

const HeaderContainer = styled.div`
position: relative;
width: 100%;
display: flex;
align-items: end;
color: white;
gap: 20px;

margin-bottom:40px;
padding:30px;
border-radius:10px;
`;

const ImageContainer = styled.div`
width: 200px;
height: 200px;
align-items: center;
justify-content: center;
margin:3px 0;
@media (max-width: 640px) {
}
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid;
  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
  }
`;

const DetailsContainer = styled.div`
  margin-left: 5px;
`;

const ArtistName = styled.p`
  font-weight: bold;
  font-size: 40px;
  letter-spacing:2px;
  text-transform:capitalize;
  padding:8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-top: 8px;
  @media (min-width: 640px) {
    font-size: 16px;
  }
`;



const ArtistDetails = () => {
  const { songs } = useSelector((state: RootState) => state.songs);
  const { artists} = useSelector((state: RootState) => state.artist);
 const [singleArtist, setSingleArtist] = useState<IArtist | null>(null)
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );
  const [data, setData] = useState<song[] | null>(null);
  const { artistId} = useParams() 
  ;
  const dispatch = useDispatch();
  console.log(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song:song) => {
    dispatch(setActiveSong({ song, data}));
    dispatch(playPause(true));
  };

  useEffect(() => {
    dispatch(fetchArtistsStart())
    if (songs.length > 0) {
      const relatedData:song[] = songs.filter((song) =>
        song.artist.some(so=> so._id=== artistId)
      );
      console.log("related data", relatedData);
      setData(relatedData);
    }
    if(artists.length > 0){
      setSingleArtist(artists.filter(ar=> ar._id === artistId)[0])
    }
  }, [songs, artistId]);
  console.log(data);
  console.log("artist from artistDetails" , artists );
  console.log("single from artistDetails" , singleArtist );
  console.log("artistId from artistDetails" , artistId);

  if (!data || artists.length == 0 || !singleArtist) {
    return <Loader />;
  }

  return (
    <Container>
    {
      singleArtist &&
      <HeaderContainer>
        <ImageContainer>
          <ProfileImage src={singleArtist.imageURL} />
        </ImageContainer>

          <DetailsContainer>
            <ArtistName>{singleArtist.name}</ArtistName>
            <Subtitle>{singleArtist.description}</Subtitle>
          </DetailsContainer>
      </HeaderContainer>
    }
      <RelatedSongs
        title={"Artist songs"}
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </Container>
  );
};

export default ArtistDetails;
