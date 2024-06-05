import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import PlayPause from "../playPause/PlayPause";
import { song } from "../../models/song";
import { RootState } from "../../features/store";
import Heart from "../Heart";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { ref, deleteObject } from "firebase/storage";
import { useDispatch } from "react-redux";
import { storage } from "../../config/firebase.config";
import { deleteMusic, reset } from "../../features/music/musicSlice";
import { favouriteSong } from "../../features/user/userSlice";
const PlayPauseContainer = styled.div`
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.2s ease-in;
  &:hover {
    opacity: 1;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeartContainer = styled.div`
  opacity: 0;
  cursor: pointer;
`;
const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ isActive }) => (isActive ? "#4c426e" : "transparent")};
  padding: 5px;
  border-radius: 8px;
  &:hover {
    background-color: rgba(3, 27, 52, 0.6);
    ${PlayPauseContainer} {
      opacity: 1;
    }
    ${HeartContainer} {
      opacity: 1;
    }
  }
  ${({ isActive }) =>
    isActive &&
    css`
      ${PlayPauseContainer} {
        opacity: 1;
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      ${PlayPauseContainer} {
        opacity: 1;
      }
    `}
`;

const ContainerLeft = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  margin: 0 12px;
  align-items: center;
  gap: 40px;
  text-align: left;
`;

const Title = styled.p`
  width: 150px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-top: 4px;
`;
const ArtistName = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumName = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const HovCotainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
interface songProp {
  song: song;
  activeSong: song | null;
  handlePauseClick: () => void;
  handlePlayClick: (song: song) => void;
}
const SongTable = ({
  song,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: songProp) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleDelete = (song: song) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteImage = ref(storage, song.imageURL);
          const deleteSong = ref(storage, song.songURL);

          // Delete from Firebase Storage
          await deleteObject(deleteImage);
          await deleteObject(deleteSong);

          // Delete from MongoDB using Redux
          dispatch(deleteMusic(song._id));
          dispatch(reset());
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting: ", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the file.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleSongLike = (songId: string) => {
    const userId = user?._id;
    dispatch(favouriteSong({ userId, songId }));
  };
  return (
    <Container isActive={activeSong?.title === song?.title}>
      <ContainerLeft>
        <Image src={song?.imageURL} />
        <PlayPauseContainer>
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song)}
            size={30}
          />
        </PlayPauseContainer>
      </ContainerLeft>
      <TextContainer>
        <ArtistName>
          <Title>
            <Link to={`/songs/${song._id}`}>{song?.title}</Link>
          </Title>
          <Subtitle>{song.artist[0].name}</Subtitle>
        </ArtistName>
        <AlbumName>
          <Subtitle>{song.album.name}</Subtitle>
        </AlbumName>
        <HeartContainer>
          <HovCotainer>
            <div onClick={() => handleSongLike(song._id)}>
              <Heart size={20} isFav={user && user.favsong.includes(song._id)} />
            </div>
            {user?.role === "admin" && (
              <>
                <Link to={`/updatesong/${song._id}`}>
                  <GoPencil color={"white"} size={20} />
                </Link>
                <div onClick={() => handleDelete(song)}>
                  <AiOutlineDelete size={20} />
                </div>
              </>
            )}
          </HovCotainer>
        </HeartContainer>
      </TextContainer>
    </Container>
  );
};

export default SongTable;
