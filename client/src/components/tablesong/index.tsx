import styled, { css } from "styled-components";
import { RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { song } from "../../models/song";
import { playPause, setActiveSong } from "../../features/play/playerSlice";
import PlayPause from "../playPause/PlayPause";
import Heart from "../Heart";
import { favouriteSong } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { deleteMusic, reset } from "../../features/music/musicSlice";
interface tableProp {
  songdata: song[];
}

const TableSong = ({ songdata }: tableProp) => {
  const dispatch = useDispatch();

  const { activeSong, songsToPlay, currentIndex } = useSelector(
    (state: RootState) => state.player
  );
  console.log("songsToPlay", songsToPlay);
  console.log("current Index from react", currentIndex);
  const { user } = useSelector((state: RootState) => state.user);
  const handlePlayClick = (song: song) => {
    if (songdata.length > 0) {
      dispatch(setActiveSong({ song, data: songdata }));
      dispatch(playPause(true));
    }
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handleSongLike = (songId: string) => {
    const userId = user?._id;
    dispatch(favouriteSong({ userId, songId }));
  };

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
          dispatch(reset())
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
  return (
    <StyledTable>
      <thead>
        <StyledRowHeader>
          <StyledHeader>#</StyledHeader>
          <StyledHeader>Title</StyledHeader>
          <StyledHeader>Album</StyledHeader>
          <StyledHeader>Artist</StyledHeader>
          <StyledHeader></StyledHeader>
        </StyledRowHeader>
      </thead>
      <tbody>
        {songdata.map((song, index) => (
          <StyledRowBody key={index} active={activeSong?._id === song._id}>
            <StyledCellnum>{index + 1}</StyledCellnum>
            <StyledCellhov>
              <PlayPause
                song={song}
                size={15}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song)}
              />
            </StyledCellhov>
            <StyledCell>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ImageSong src={song.imageURL} />
                <p>{song.title}</p>
              </div>
            </StyledCell>
            <StyledCell>{song.album.name}</StyledCell>
            <StyledCell>{song.artist[0].name}</StyledCell>
            {user && (
              <StyledCellhov >
                <HovCotainer>
                  <div onClick={() => handleSongLike(song._id)}>
                    <Heart size={20} isFav={user.favsong.includes(song._id)} />
                  </div>
                  {user?.role === "admin" && (
                    <>
                      <Link to={`/updatesong/${song._id}`}>
                        <GoPencil color={"white"} size={20} />
                      </Link>
                      <div onClick={()=> handleDelete(song)}>
                        <AiOutlineDelete size={20} />
                      </div>
                    </>
                  )}
                </HovCotainer>
              </StyledCellhov>
            )}
          </StyledRowBody>
        ))}
      </tbody>
    </StyledTable>
  );
};

const HovCotainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  padding: 15px;
  width: 40%;
  height: 40%;
  text-align: left;
  display: none;
`;

const StyledCellnum = styled.div`
  padding: 15px;
  text-align: left;
`;

const StyledRowHeader = styled.tr`
  &:hover {
  }
`;
const ImageSong = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
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
    border-radius: 20px;

    // background-color: rgba(191, 189, 189, 0.3);
    background-color: rgba(3, 27, 52, 0.6);
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
  padding: 15px;
  text-align: left;
`;

export default TableSong;
