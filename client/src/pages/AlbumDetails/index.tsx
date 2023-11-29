import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import RelatedSongs from "../../components/relatedSongs/RelatedSongs";
import { setActiveSong, playPause } from "../../features/play/playerSlice";
import { RootState } from "../../features/store";
import { song } from "../../models/song";
import { IAlbum, fetchalbumsStart } from "../../features/album/albumSlice";

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
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin: 3px 0;
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


const SongTitle = styled.h1`
  font-weight: bolder;
  text-transform: capitalize;
  letter-spacing: 5px;
  padding: 5px;
  font-size: 40px;
`;

const AlbumDetails = () => {
  const { songs } = useSelector((state: RootState) => state.songs);
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );
  const [singleAlbum, setSingelAlbum] = useState<IAlbum | null>(null);
  const [data, setData] = useState<song[] | null>(null);
  const { albumid } = useParams();
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  console.log(albumid);
  console.log(albumid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: song) => {
    dispatch(setActiveSong({ song, data }));
    dispatch(playPause(true));
  };

  const fetchSong = async () => {
    dispatch(fetchalbumsStart());
    try {
      setIsloading(true);
      const response = songs.filter((song) => song.album._id === albumid)[0]
        .album;
      setSingelAlbum(response);
      const relatedData = songs.filter((song) => song.album._id === albumid);
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
  }, [albumid]);

  console.log(singleAlbum);
  if (isloading || !singleAlbum) {
    return <Loader />;
  }

  return (
    <SongDetailsWrapper>
      <HeaderContainer>
        <ImageContainer>
          <SongImage alt="song Img" src={singleAlbum.imageURL} />
        </ImageContainer>
        <DetailsContainer>
          <p style={{ padding: "5px" }}>song</p>
          <SongTitle>{singleAlbum.name}</SongTitle>
        </DetailsContainer>
      </HeaderContainer>

     
      <RelatedSongs
        title="Songs From The Album"
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </SongDetailsWrapper>
  );
};

export default AlbumDetails;
