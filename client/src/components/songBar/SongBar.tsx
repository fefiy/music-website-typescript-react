import { Link } from "react-router-dom";
import styled from "styled-components";
import {  useSelector } from "react-redux";
import PlayPause from "../playPause/PlayPause";
import { song } from "../../models/song";
import { RootState } from "../../features/store";
const PlayPauseContainer = styled.div`
  margin: 0 10px;
  opacity: 0;
  transition: 0.2s ease-in;
  &:hover {
    opacity: 1;
  }
`;
const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ isActive }) => (isActive ? "#4c426e" : "transparent")};
  padding: 16px;
  justify-content:space-between;
  border-radius: 8px;
  &:hover {
    background-color: #4c426e;
    ${PlayPauseContainer} {
      opacity: 1;
    }
  }
`;

const Addbtn = styled.button`
  background-color:white;
  color: #040c18;
  border:none;
  padding: 8px 20px;
  border-radius:15px;
  font-size: 14px;
  cursor:pointer;
  transition: 0.2s all ease-in;
  &:hover{
    color:white;
    background-color: #040c18;
    transform:scale(0.9);
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const TextContainer = styled.div`
  display: flex;
  margin: 0 12px;
  gap:40px;
  align-items: center;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-top: 4px;
`;

interface songProp {
  song: song;
  i: number;
  activeSong: song | null;
  handlePauseClick: () => void;
  handlePlayClick: (song: song) => void;
  isAdd: boolean;
  handleAddClick?: (songId: string) => void;
}
const SongBar = ({
  song,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  handleAddClick,
}: songProp) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Container isActive={activeSong?.title === song?.title}>
     

      <TextContainer>
      <PlayPauseContainer>
        <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song)}
          size={30}
        />
      </PlayPauseContainer>
        <Image src={song.imageURL} alt={song?.title} />
        <div>
          <Link to={`/songs/${song._id}`}>
            <Title>{song?.title}</Title>
          </Link>
          <Subtitle>{song.album.name}</Subtitle>
        </div>
      </TextContainer>
      {user && song._id && (
        <Addbtn
          onClick={() =>
            song?._id && handleAddClick && handleAddClick(song._id)
          }>
          Add
        </Addbtn>
      )}
    </Container>
  );
};

export default SongBar;
