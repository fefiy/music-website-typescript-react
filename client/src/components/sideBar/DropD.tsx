import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { deletePlaylistStart, reset } from "../../features/playlist/PlayListSlice";
import { IPlayList } from "../../models/playlist";
interface props{
    playlist: IPlayList;
}
const ProfileDropdown = ({ playlist}:props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 const  handleDeletePlaylist = async()=>{
    // delete from firebase
    const deleteImage = ref(storage,  playlist.imageURL);
    
    // Delete from Firebase Storage
    await deleteObject(deleteImage);
    // delete from mongo 
    dispatch(deletePlaylistStart(playlist._id))
    dispatch(reset())
    handleClose();
 }
  return (
    <div>
      <IconButton onClick={handleClick}>
        <BsThreeDots size={20} color={"white"} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDeletePlaylist}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
            <TiDeleteOutline size={20} /> Delete Playlist
            </div>
        </MenuItem>
       
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
