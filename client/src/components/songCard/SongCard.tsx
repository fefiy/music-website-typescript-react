import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PlayPause from "../playPause/PlayPause";
import { playPause, setActiveSong } from "../../features/play/playerSlice";
// import { BiTrashAlt } from "react-icons/bi";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { deleteMusic } from "../../features/music/musicSlice";
import Swal from "sweetalert2";
import { song} from "../../models/song"

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

const Overlay = styled.div<{ active: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `}
  &:hover {
    opacity: 1;
  }
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardSubtitle = styled.p`
  font-size: 0.8rem;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


interface songCardprop{
    song:song;
    activeSong:song |null;
    isPlaying:boolean;
    data:song[],
    i:number
}

const SongCard = ({ song, isPlaying, activeSong, data, i }:songCardprop) => {
  const dispatch = useDispatch();
  console.log("isPlaying FROM SONG CARD", isPlaying);
  const handlePauseClick = () => {
    console.log("pase Click From Card");
    dispatch(playPause(false));
  };
  const handleDelete = (song:song) => {
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
  const handlePlayClick = () => {
    console.log("play click");
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  console.log("activesong ", activeSong);
  return (
    <>
      <CardContainer>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "200px",
            border: "black solid 1px",
          }}>
          <Overlay active={activeSong?.title === song.title}>
            <PlayPause
              song={song}
              size={20}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
            <motion.div
              style={{
                position: "absolute",
                bottom: "2%",
                left: "2%",
                color: "red",
              }}
              onClick={() => handleDelete(song)}>
              <BsTrash />
            </motion.div>
            {song && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "2%",
                  right: "2%",
                  color: "blue",
                }}>
                <Link to={{ pathname: `/updatesong/${song._id}`}}>
                  <BsPencilSquare />
                </Link>
              </motion.div>
            )}
          </Overlay>
          <CardImage alt="song_img" src={song.imageURL} />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <CardTitle>
            <Link to={`/songs/${song?._id}`}>{song.title}</Link>
          </CardTitle>
          <CardSubtitle>
            {song?.artist?.map((arti, i) => (
              <span key={i}>
                {" "}
                <Link to={`/artists/${arti}`}>{arti.name}</Link>
              </span>
            ))}
          </CardSubtitle>
        </div>
      </CardContainer>
    
    </>
  );
};

export default SongCard;
