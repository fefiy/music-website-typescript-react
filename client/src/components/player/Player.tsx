import React, {useState} from "react";
// import "./player.scss";
import Slider from "@mui/material/Slider";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { AiFillSound } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { playPause, nextSong, prevSong } from "../../features/play/playerSlice";
import { RootState } from "../../features/store";
import styled from "styled-components";
// import { song } from "../../models/song";
interface playerprops {
  audioElem: React.RefObject<HTMLAudioElement | null>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const Player = ({ audioElem, progress, setProgress }: playerprops) => {
  const [volume, setVolume] = useState<number>(50);
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );

  const PlayPause = () => {
    console.log(":play pause");
    dispatch(playPause(!isPlaying));
  };

  const skipBack = () => {
    console.log("skip back");
    setProgress(0);
    dispatch(prevSong());
    if (audioElem?.current) {
      audioElem.current.currentTime = 0;
    }
  };

  const skiptoNext = () => {
    console.log("skip to next");
    setProgress(0);
    dispatch(nextSong());
    if (audioElem?.current) {
      audioElem.current.currentTime = 0;
    }
  };
  const handleVolumeChange = (
    newVolume: number | number[]
    
  ) => {
    const volumeValue = Array.isArray(newVolume) ? newVolume[0] : newVolume;
    setVolume(volumeValue);
    if (audioElem?.current) {
      // Convert the volume back to a range of 0.0 to 1.0
      audioElem.current.volume = volumeValue / 100;
    }
  };

  const handleProgressChange = (newProgress: number | number[]) => {
    const progressValue = Array.isArray(newProgress) ? newProgress[0] : newProgress;
    setProgress(progressValue);
  
    if (audioElem?.current) {
      audioElem.current.currentTime = (progressValue / 100) * (audioElem?.current?.duration || 0);
    }
  };

  return (
    <Container>
      <MusicInfo>
        <ImageContainer>
          <Image src={activeSong?.imageURL} alt="Album Cover" />
        </ImageContainer>
        <div className="title">
          <p>{activeSong?.title}</p>
        </div>
      </MusicInfo>

      <ControContainer>
        <Navigation>
          <div>
            {audioElem?.current &&
             ` ${Math.floor(audioElem?.current?.currentTime / 60)}:${Math.floor(audioElem?.current?.currentTime % 60)}`}
          </div>
          <Box sx={{ width: "80%" }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center">
              <Slider
                aria-label="Progress"
                value={progress}
                onChange={(_event: Event, value: number | number[]) => handleProgressChange(value)}
              />
            </Stack>
          </Box>
          <div>
            {audioElem?.current &&
               ` ${Math.floor(audioElem?.current?.duration / 60)}: ${Math.floor(audioElem?.current?.duration % 60)}`}
          </div>
        </Navigation>
        <Controls>
          <BsFillSkipStartCircleFill
           size={25}
            onClick={skipBack}
          />
          {isPlaying ? (
            <BsFillPauseCircleFill
              onClick={PlayPause}
              size={30}
            />
          ) : (
            <BsFillPlayCircleFill
            size={30}
              onClick={PlayPause}
            />
          )}
          <BsFillSkipEndCircleFill
          size={25}
            onClick={skiptoNext}
          />
        </Controls>
      </ControContainer>

      <SoundContainer>
        <Box sx={{ width: 100 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <AiFillSound />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={(_event: Event, value: number | number[]) =>handleVolumeChange(value)}
            />
          </Stack>
        </Box>
      </SoundContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 97%;
  padding: 1rem;
  // color: rgb(218, 218, 218);
  display: flex;

  align-items: center;
`;
const MusicInfo = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 80px;
`;
const Image = styled.img`
  border-radius: 50%;
  object-fit: cover;
  height: 80px;
  width: inherit;
  animation: rotate 3s linear infinite;
`;

const ControContainer = styled.div`
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Navigation = styled.div`
display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
`
const Controls = styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:10px;
>*{
  cursor:pointer;
  &:hover{
    color: white;
  }
}
`
const SoundContainer = styled.div``;
export default Player;
