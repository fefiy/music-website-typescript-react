import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./components/sideBar/SideBar";
import SongDetails from "./pages/songDetails/SongDeatails";
import AddSong from "./pages/addSong/AddSong";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "./features/store";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ArtistDetails from "./pages/ArtistDetails/ArtistDetails";
import TopBar from "./components/TopBar/TopBar";
import { ToastContainer } from "react-toastify";
import PlayListDetail from "./pages/playlistDetails";
import Search from "./pages/search";
import LikedSongs from "./pages/LikedSOngs/LikedSongs";
import UpdateSong from "./pages/updateSong";
import NotAdmin from "./components/error/NotAdmin";
import AlbumDetails from "./pages/AlbumDetails";
import GenereDetails from "./pages/GenereDetails";
// import NotAdmin from "./components/error/NotAdmin";
const Wrapper = styled.div`
  width: 100%;
`;
const ContainerPage = styled.div`  
  padding: 10px;
  margin-left: 20%;
  width: 80%;
  padding-bottom: 2.5rem;
  margin-bottom: 70px;
  @media (max-width: 760px) {
    top:0;
    margin-left: 0;
    width: 100%;
  }
`;
const MusicBottomBar = styled(motion.div)`
  position: fixed;
  height: 6rem;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    #2a2a80
  );
  backdrop-filter: blur(16px);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  z-index: 10;
  animation: slideup 0.5s ease;
  @keyframes slideup {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { activeSong, isActive } = useSelector(
    (state: RootState) => state.player
  );

  const {user} = useSelector((state:RootState)=> state.user)
  console.log("ActiveSong fromApp", activeSong);
  return (
    <>
      <Wrapper>
        <SideBar />
        <ContainerPage>
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Routes>
            <Route
              path="/"
              element={<Search serchFilter={searchTerm} />}
            />
            <Route path="/songs/:songid" element={<SongDetails />} />
            <Route path="/updatesong/:songid" element={<UpdateSong />} />
            <Route path="/addsong" element={
             !user || user.role !== "admin"? (<NotAdmin />): <AddSong />} />
            <Route path="/artists/:artistId" element={<ArtistDetails />} />
            <Route path="/albums/:albumid" element={<AlbumDetails />} />
            <Route path="/generes/:gnname" element={<GenereDetails/>} />
            <Route path="/playlist/:playlistId" element={<PlayListDetail />} />
            <Route path="/like/songs" element = {<LikedSongs />} />
          </Routes>
        </ContainerPage>
        {isActive && (
          <MusicBottomBar
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}>
            <MusicPlayer />
          </MusicBottomBar>
        )}
      </Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}


export default App;
