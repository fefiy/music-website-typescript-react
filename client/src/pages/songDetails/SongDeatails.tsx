import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import RelatedSongs from "../../components/relatedSongs/RelatedSongs";
import { setActiveSong, playPause } from "../../features/play/playerSlice";
import { RootState } from "../../features/store";
import { song } from "../../models/song";
import PlayPause from "../../components/playPause/PlayPause";

const SongDetailsWrapper = styled.div`
width: 98%;
margin: 10px auto;
background: linear-gradient(to bottom, #031b34, #040c18);
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: end;
  color: white;
  gap: 20px;
  margin-bottom:10px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin:3px 0;
  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
  }
`;

const SongImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  margin-left: 5px;
  a {
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`;


const ProfileImage = styled.img`
width:30px;
height:30px;
border-radius:50%;
object-fit:cover;
`
const SongTitle = styled.h1`
  font-weight:  bolder;
  text-transform: capitalize;;
  letter-spacing: 5px;
  padding: 5px;
  font-size: 40px;
`;

const Subtitle = styled.span`
  font-size: 14px;
  margin-top: 8px;
  text-transform: capitalize;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const Genre = styled.p`
  font-size: 14px;
  margin-top: 8px;
  padding:5px;
`;

const AristContaainer = styled.div`
display:flex;
align-items:center;
gap:10px;
padding:5px;
`
const SongDetails = () => {
  const { songs } = useSelector((state: RootState) => state.songs);
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );
  const [singleSong, setSingelSong] = useState<song | null>(null);
  const [data, setData] = useState<song[] | null>(null);
  const { songid } = useParams();
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  console.log(songid);
  console.log(songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: song) => {
    dispatch(setActiveSong({ song, data}));
    dispatch(playPause(true));
  };

  const fetchSong = async () => {
    try {
      setIsloading(true);
      const response = songs.filter(song=> song._id === songid)[0]
      setSingelSong(response);
      const relatedData = songs.filter(
        (song) =>
          song.album._id == response.album._id ||
          song.artist.some((elem) => response.artist.includes(elem))
    
      ).filter((so)=> so._id !== songid)
      console.log(relatedData);
      setData(relatedData);
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSong();
  }, [songid]);

  console.log(singleSong);
  if (isloading || !singleSong) {
    return <Loader />;
  }

  return (
    <SongDetailsWrapper>
      <HeaderContainer>
        <ImageContainer>
          <SongImage alt="song Img" src={singleSong.imageURL} />
        </ImageContainer>
        <DetailsContainer>
          <p style={{padding:"5px"}}>song</p>
          <SongTitle>{singleSong.title}</SongTitle>

          {singleSong.artist.map((artist) => (
            <AristContaainer>
              <ProfileImage  src={artist.imageURL}/>
              <Link to={`/artists/${artist._id}`}>
                <Subtitle>{artist.name}</Subtitle>
              </Link>
            </AristContaainer>
          ))}
          <Genre>
            {singleSong.genere.map((gen) => (
              <span>{gen}</span>
            ))}
          </Genre>
        </DetailsContainer>
      </HeaderContainer>

      <PlayPause 
         song={singleSong}
        handlePause={handlePauseClick}
         handlePlay={()=>handlePlayClick(singleSong)}
         size={30}
      />
      <RelatedSongs
        title="Related Songs"
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </SongDetailsWrapper>
  );
};

export default SongDetails;
