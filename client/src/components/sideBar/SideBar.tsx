import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddArtistModal from "../AddArtistModal";
import AddAlbumModal from "../addAlbumModal";
import AddPlayListModal from "../AddPlaylistModal";
import { getPlaylistsByUserStart } from "../../features/playlist/PlayListSlice";
import styled from "styled-components";
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { FaHeart } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { toast } from "react-toastify";
import ProfileDropdown from "./DropD";
const Container = styled.div`
  width: 20%;
  position: fixed;
  top: 0;
  background: linear-gradient(to bottom, #031b34, #040c18);
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 760px) {
    display: none;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  height: 90px;
  width: 90px;
  border-radius: 10px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(90vh - 150px);
  gap: 20px;
  text-decoration: none;
  color: white;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(65, 95, 125, 1);
    background-color: rgba(20, 70, 120, 0.5);
    border-radius: 20px;
    border: 6px solid transparent;
    box-sizing: border-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #81afdd;
  }
`;

const MenuItem = styled.div`
  color: white;
  padding: 15px 30px;
  background: #040c18;
  width: 85%;
  cursor: pointer;
  border-radius: 10px;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all ease-in 0.3s;
  &:hover {
    color: rgb(237, 209, 46);
    background-color: rgba(3, 27, 52, 0.6);
  }
`;

const SmallMediaScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #031b34, #040c18);
  height: 100vh;
  width: 50%;
  padding: 5%;
  z-index: 2000;
  display: none;
  ${MenuContainer}{
  margin-top:20px;
  max-height: calc(100vh - 100px);
    
  }
  @media (max-width: 767px) {
    display: block;
  }
`;
const OpenMemu = styled.div`
  position: fixed;
  top: 4%;
  left: 4%;
  display: none;
  z-index: 2000;
  @media (max-width: 767px) {
    display: block;
  }
`;
const DlePlContainer = styled.div`
position:absolute;
right:10%;
bottom:5%;
display: flex;
align-items: center;
justify-content: flex-end;
opacity: 0;
margin-left: 40px;
z-index:200;
`
const PlaylisContainer = styled.div`

  width: 85%;
  display: flex;
  background: #040c18;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  a {
    color: white;
    font-size: 17px;
    text-decoration: none;
  }
  &:hover {
    ${DlePlContainer}{
      opacity: 1;
    }
    color: rgb(237, 209, 46);
    background-color: rgba(3, 27, 52, 0.6);

  }
`;
const PlaylisContainerDiv = styled.div`
position:relative;
&:hover {
  ${DlePlContainer}{
    opacity: 1;
  }
}
`
const PlayListImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;
const CloseMenu = styled.div`
  position: absolute;
  left: 80%;
  top: 2%;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: rgba(157, 111, 46);
`;

const SideBar = () => {
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState<boolean>(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] =
    useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { playlists , isPlaylostDeleteSuccefully} = useSelector((state: RootState) => state.playlist);
  const [openSideBarMenu, setOpenSideBarMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const closeArtistModal = () => {
    setIsArtistModalOpen(false);
  };
  const closeAlbumModal = () => {
    setIsAlbumModalOpen(false);
  };
  const closePlaylistModal = () => {
    setIsPlaylistModalOpen(false);
  };
  useEffect(() => {
    console.log("use effect from side bar callded");
    if (user) {
      console.log("use effect from side bar callded user exist");
      console.log("userId", user._id);
      const userId = user._id;
      dispatch(getPlaylistsByUserStart(userId));
    }
  }, [isPlaylostDeleteSuccefully]);
  console.log("playlist from sidebar", playlists);
  const handleCreatePlayList = () => {
    if (user) {
      setIsPlaylistModalOpen(true);
    } else {
      toast.error("You Have to log in first");
    }
  };
  return (
    <>
      <Container>
        <LogoContainer>
          <LogoImage src={logo} />
        </LogoContainer>
        <MenuContainer>
          <Link to="/">
            <MenuItem>
              <HiOutlineHome size={25} />
              <div>Discover</div>
            </MenuItem>
          </Link>
          <MenuItem>
            <BiSolidPlaylist size={25} />
            <div onClick={handleCreatePlayList}>Create Playlist</div>
          </MenuItem>
          {/* {user && user.role === "admin" ? ( */}
          {user && (
            <>
              {playlists.length > 0 &&
                playlists.map((pl) => (
                  <PlaylisContainerDiv>
                  <Link to={`/playlist/${pl._id}`}>
                    <PlaylisContainer>
                      <PlayListImage src={pl.imageURL} />
                      <div key={pl._id}>{pl.name}</div>
                      </PlaylisContainer>
                  </Link>
                      <DlePlContainer>
                        <ProfileDropdown playlist={pl}/>                      
                      </DlePlContainer>
                 </PlaylisContainerDiv>
                ))}
              {user?.favsong.length > 0 && (
                <Link to="/like/songs">
                  <PlaylisContainer>
                    <LikeContainer>
                      <FaHeart />
                    </LikeContainer>
                    <div>
                      <p>Liked Songs</p>
                      <p>
                        <small>{user.favsong.length} songs</small>
                      </p>
                    </div>
                  </PlaylisContainer>
                </Link>
              )}
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link to="/addsong">
                <MenuItem>
                  <MdOutlineAddBox />
                  <span>Add Songs</span>
                </MenuItem>
              </Link>

              <MenuItem>
                <MdOutlineAddBox />
                <div onClick={() => setIsArtistModalOpen(true)}>AddArtist</div>
              </MenuItem>

              <MenuItem>
                <MdOutlineAddBox />
                <div onClick={() => setIsAlbumModalOpen(true)}>AddAlbum</div>
              </MenuItem>
            </>
          )}
        </MenuContainer>
      </Container>
      {!openSideBarMenu && (
        <OpenMemu onClick={() => setOpenSideBarMenu(true)}>
          <IoMdMenu style={{ color: "white" }} size={30} />
        </OpenMemu>
      )}
      {openSideBarMenu && (
        <SmallMediaScreen onClick={() => setOpenSideBarMenu(false)}>
          <CloseMenu>
            <FaTimes size={30} onClick={() => setOpenSideBarMenu(false)} />
          </CloseMenu>
          <MenuContainer>
          <Link to="/">
            <MenuItem>
              <HiOutlineHome size={25} />
              <div>Discover</div>
            </MenuItem>
          </Link>
          <MenuItem>
            <BiSolidPlaylist size={25} />
            <div onClick={handleCreatePlayList}>Create Playlist</div>
          </MenuItem>
          {/* {user && user.role === "admin" ? ( */}
          {user && (
            <>
              <MenuItem>
                <BiSolidPlaylist size={25} />
                <div onClick={() => setIsPlaylistModalOpen(true)}>
                  Create Playlist
                </div>
              </MenuItem>

              {playlists.length > 0 &&
                playlists.map((pl) => (
                  <Link to={`/playlist/${pl._id}`}>
                    <PlaylisContainer>
                      <PlayListImage src={pl.imageURL} />
                      <div key={pl._id}>{pl.name}</div>
                    </PlaylisContainer>
                  </Link>
                ))}
              {user?.favsong.length > 0 && (
                <Link to="/like/songs">
                  <PlaylisContainer>
                    <LikeContainer>
                      <FaHeart />
                    </LikeContainer>
                    <div>
                      <p>Liked Songs</p>
                      <p>
                        <small>{user.favsong.length} songs</small>
                      </p>
                    </div>
                  </PlaylisContainer>
                </Link>
              )}
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link to="/addsong">
                <MenuItem>
                  <MdOutlineAddBox />
                  <span>Add Songs</span>
                </MenuItem>
              </Link>

              <MenuItem>
                <MdOutlineAddBox />
                <div onClick={() => setIsArtistModalOpen(true)}>AddArtist</div>
              </MenuItem>

              <MenuItem>
                <MdOutlineAddBox />
                <div onClick={() => setIsAlbumModalOpen(true)}>AddAlbum</div>
              </MenuItem>
            </>
          )}
        </MenuContainer>
        </SmallMediaScreen>
      )}

      <AddArtistModal isOpen={isArtistModalOpen} onClose={closeArtistModal} />
      <AddAlbumModal isOpen={isAlbumModalOpen} onClose={closeAlbumModal} />
      <AddPlayListModal
        isOpen={isPlaylistModalOpen}
        onClose={closePlaylistModal}
      />
    </>
  );
};

export default SideBar;
