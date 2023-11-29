import styled from "styled-components";
import { song } from "../../models/song";
import SongTable from "../SongTable";

const RelatedSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
`;

const SongBarContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
interface relateProp {
  activeSong: song | null;
  isPlaying: boolean;
  data: song[] | null;
  handlePauseClick: () => void;
  handlePlayClick: (song: song) => void;
  title: string;
}
const RelatedSong = ({
  title,
  data,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: relateProp) => (
  <RelatedSongsContainer>
    <Title>{title}</Title>
    <hr
      style={{
        width: "20%",
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#042c54",
        backgroundColor: " #031B34",
        color: "#042c54",
      }}
    />
    <SongBarContainer>
      {data?.map((song) => (
        <SongTable
          song={song}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          activeSong={activeSong}
        />
        // <SongBar
        // isAdd
        //   key={i}
        //   song={song}
        //   i={i}
        //   isPlaying={isPlaying}
        //   activeSong={activeSong}
        //   handlePauseClick={handlePauseClick}
        //   handlePlayClick={handlePlayClick}
        // />
      ))}
    </SongBarContainer>
  </RelatedSongsContainer>
);

export default RelatedSong;
