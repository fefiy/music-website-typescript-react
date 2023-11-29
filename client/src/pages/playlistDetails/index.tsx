import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { IPlayList } from "../../models/playlist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import styled, { css } from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getMusic } from "../../features/music/musicSlice";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { fetchalbumsStart } from "../../features/album/albumSlice";
import { fetchArtistsStart } from "../../features/artist/artistSlice";
import SongBar from "../../components/songBar/SongBar";
import { setActiveSong, playPause } from "../../features/play/playerSlice";
import { song } from "../../models/song";
import { easeInOut, motion } from "framer-motion";
import {
  addSongToPlaylistStart,
  removeSongFromPlaylistStart,
} from "../../features/playlist/PlayListSlice";
import PlayPause from "../../components/playPause/PlayPause";

const PlayListDetail = () => {
  const { playlistId } = useParams();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [singlePlaylist, setSinglePlaylist] = useState<IPlayList | null>(null);
  const { playlists } = useSelector((state: RootState) => state.playlist);
  const { songs } = useSelector((state: RootState) => state.songs);
  const { albums } = useSelector((state: RootState) => state.album);
  const { artists } = useSelector((state: RootState) => state.artist);
  const {  activeSong } = useSelector(
    (state: RootState) => state.player
  );
  const [filter, setFilter] = useState<string>("");
  const dispatch = useDispatch();
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  
  const handleToggleAlbum = (albumName: string) => {
    setExpandedAlbum((prevAlbum) =>
      prevAlbum === albumName ? null : albumName
    );
  };
  const handleToggleartist = (artistName: string) => {
    setExpandedArtist((prevArtist) =>
      prevArtist === artistName ? null : artistName
    );
  };
  useEffect(() => {
    dispatch(fetchalbumsStart());
    dispatch(fetchArtistsStart());
    dispatch(getMusic());
    if (playlists) {
      const pl = playlists.filter((ply) => ply._id === playlistId);
      setSinglePlaylist(pl[0]);
    }
  }, [playlists, playlistId]);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  
  const handlePlayClick = (song: song) => {
    if (singlePlaylist && singlePlaylist?.songs.length > 0) {
      dispatch(setActiveSong({ song, data: singlePlaylist?.songs }));
      dispatch(playPause(true));
    }
  };
  console.log("full playList", playlists);
  const handleaddSongToplayList = (songId: string) => {
    console.log("add song to playlit callded");
    console.log(songId, playlistId);
    dispatch(addSongToPlaylistStart({ songId, playlistId }));
  };

  const removeSongFromPlaylist = (songId: string) => {
    dispatch(removeSongFromPlaylistStart({ songId, playlistId }));
  };
  console.log("single playlist song ", singlePlaylist);
  console.log("filter", filter);
  console.log("albums from play list", albums);
  console.log("");
  return (
    <Container>
      <Header>
        <ImageContainer>
          <img
            src={singlePlaylist?.imageURL || "placeholder-image-url"}
            alt="Playlist Cover"
          />
        </ImageContainer>
        <Title>
          <h1>{singlePlaylist?.name}</h1>
        </Title>
      </Header>
      <div style={{ marginBottom: 50 }}>
        {singlePlaylist
          ? singlePlaylist.songs.length > 0 && (
              <StyledTable>
                <thead>
                  <StyledRowHeader>
                    <StyledHeader>#</StyledHeader>
                    <StyledHeader>Title</StyledHeader>
                    <StyledHeader>Album</StyledHeader>
                    <StyledHeader>Artist</StyledHeader>
                    <StyledHeader>remove</StyledHeader>
                  </StyledRowHeader>
                </thead>
                <tbody>
                  {singlePlaylist.songs.map((song, index) => (
                    <StyledRowBody
                      key={index}
                      active={activeSong?._id === song._id}>
                      <StyledCellnum>{index + 1}</StyledCellnum>
                      <StyledCellhov>
                        <PlayPause
                          song={song}
                          size={15}
                          handlePause={handlePauseClick}
                          handlePlay={() => handlePlayClick(song)}
                        />
                      </StyledCellhov>
                      <StyledCell>{song.title}</StyledCell>
                      <StyledCell>
                       {song.album.name}
                      </StyledCell>
                      <StyledCell>
                        {song.artist[0].name}
                      </StyledCell>
                      <StyledCell>
                        <button
                          onClick={() =>
                            song._id && removeSongFromPlaylist(song?._id)
                          }>
                          Remove
                        </button>
                      </StyledCell>
                    </StyledRowBody>
                  ))}
                </tbody>
              </StyledTable>
            )
          : null}
      </div>
      <SearchBar inputRef={searchRef} filter={filter} setFilter={setFilter} />

      <div style={{ marginTop: 50 }}>
        {filter &&
          songs
            .filter(
              (so) =>
                !playlists
                  .find((pl) => pl._id === playlistId)
                  ?.songs.some((son) => son._id === so._id)
            )
            .filter((song) =>
              song.title.toLowerCase().includes(filter.toLowerCase())
            )
            .map((filteredSong, index) => {
              console.log(filteredSong);
              return (
                <SongBar
                  i={index}
                  activeSong={activeSong}
                  isAdd={true}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={handlePlayClick}
                  song={filteredSong}
                  handleAddClick={handleaddSongToplayList}
                />
              );
            })}
        {filter &&
          albums.length > 0 &&
          albums
            .filter((album) =>
              album.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((album) => {
              const isAlbumExpanded = expandedAlbum === album.name;
              return (
                <div className="filter-cont" key={album.name}>
                  <AlbumContainer>
                    <AlbumImgContainer
                      transition={{ duration: 0.2, ease: easeInOut }}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}>
                      <AlbumImg
                        src={album.imageURL}
                        alt={`Album: ${album.name}`}
                      />
                    </AlbumImgContainer>
                    <div>
                      <SubTitle>{album.name}</SubTitle>
                      <p>Album</p>
                    </div>
                    <div onClick={() => handleToggleAlbum(album.name)}>
                      {isAlbumExpanded ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                  </AlbumContainer>
                  {isAlbumExpanded && (
                    <div>
                      {songs
                        .filter(
                          (so) =>
                            !playlists
                              .find((pl) => pl._id === playlistId)
                              ?.songs.some((son) => son._id === so._id)
                        )
                        .filter((song) => song.album.name === album.name)
                        .map((song, index) => (
                          <SongBar
                            i={index}
                            activeSong={activeSong}
                            isAdd={true}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={handlePauseClick}
                            song={song}
                            handleAddClick={handleaddSongToplayList}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            })}

        {filter &&
          artists.length > 0 &&
          artists
            .filter((artst) =>
              artst.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((artist) => {
              const isartistExpanded = expandedArtist === artist.name;
              return (
                <div className="filter-cont" key={artist.name}>
                  <ArtistContainer>
                    <ArtistImgContainer>
                      <ArtistImg
                        src={artist.imageURL}
                        alt={`artist: ${artist.name}`}
                      />
                    </ArtistImgContainer>
                    <ArtistInfo>
                      <SubTitle>{artist.name}</SubTitle>
                      <p>Artist</p>
                    </ArtistInfo>
                    <div onClick={() => handleToggleartist(artist.name)}>
                      {isartistExpanded ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </div>
                  </ArtistContainer>
                  {isartistExpanded && songs.length > 0 && (
                    <div>
                      {songs
                        .filter(
                          (so) =>
                            !playlists
                              .find((pl) => pl._id === playlistId)
                              ?.songs.some((son) => son._id === so._id)
                        )
                        .filter((song) =>
                          song.artist.some((arti) => arti.name === artist.name)
                        )
                        .map((song, index) => (
                          <SongBar
                            i={index}
                            activeSong={activeSong}
                            isAdd={true}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={handlePauseClick}
                            handleAddClick={handleaddSongToplayList}
                            song={song}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: white;
  width: 90%;
  background: linear-gradient(to bottom, #031b34, #040c18);
  margin: 10px auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5%;
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 20px;
  height: 260px;
  margin-bottom: 20px;
  padding: 20px;
`;

const ImageContainer = styled.div`
  width: 35%;
  height: 80%;
  overflow: hidden;
  postion: absolute;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  text-transform: capitalize;
  font-size: 30px;
  font-weight: bold;
  h1 {
    margin: 0;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const StyledHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;
const StyledCellhov = styled.div`
  padding: 8px;
  width: 40%;
  height: 40%;
  text-align: left;
  display: none;
`;
const SubTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const StyledCellnum = styled.div`
  padding: 8px;
  text-align: left;
`;

const StyledRowHeader = styled.tr`
  &:hover {
  }
`;

const StyledRowBody = styled.tr<{ active: boolean }>`
  &:hover {
    ${StyledCellnum} {
      opacity: 0;
      display: none;
    }
    ${StyledCellhov} {
      display: block;
    }
    background-color: rgba(0, 0, 0, 0.1);
  }
  ${(props) =>
    props.active &&
    css`
      ${StyledCellnum} {
        opacity: 0;
        display: none;
      }
      ${StyledCellhov} {
        display: block;
      }
      background-color: rgba(0, 0, 0, 0.1);
    `}
`;

const StyledCell = styled.td`
  padding: 8px;
  text-align: left;
`;

const AlbumContainer = styled.div`
  margin-bottom: 10px;
  width: 80%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3 ease-in;
`;
const AlbumImgContainer = styled(motion.div)`
  width: 52px;
  height: 90%;
`;
const AlbumImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
const ArtistContainer = styled.div`
  width: 80%;
  height: 60px;
  display: flex;
  padding: 0 5px;
  align-items: center;
  justify-content: space-between;
`;
const ArtistImgContainer = styled.div`
  width: 50px;
  height: 90%;
`;
const ArtistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const ArtistInfo = styled.div``;
export default PlayListDetail;
