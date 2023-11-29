import  { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Player from "../player/Player";
import { RootState } from "../../features/store";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { nextSong } from "../../features/play/playerSlice";
const MusicPlayer = () => {
const {isPlaying, activeSong} = useSelector((state:RootState) => state.player)
  const { songs, isLoading} = useSelector((state:RootState) => state.songs);
  const [progress, setProgress] = useState<number>(0)
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  console.log("music Player callded")
  useEffect(() => {
    if (audioElem.current !== null) {
        if (isPlaying) {
          audioElem.current.play();
        } else {
          audioElem.current.pause();
        }
      }
  });
  const onPlaying = () => {
    if (audioElem.current !== null) {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setProgress(
        (ct / duration) * 100,
       );
       if(ct== duration){
         dispatch(nextSong())
       }
    }
  };


  if (isLoading || songs.length == 0) {
    return (
        <Loader />
    )
  }
  return (
    <>
      <audio
        src={activeSong?.songURL || undefined}
        ref={audioElem}
        onTimeUpdate={onPlaying}
      />
      <Player
        audioElem={audioElem}
        progress={progress}
        setProgress={setProgress}
      />
    </>
  );
};

export default MusicPlayer;

