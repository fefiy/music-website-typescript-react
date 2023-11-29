import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { song } from "../../models/song";
import  { useSelector} from "react-redux";
import { RootState } from "../../features/store";
interface playpause{
  song:song
  handlePause:()=>void,
  handlePlay:()=>void,
  size:number;
}

const PlayPause = ({ song, handlePause, handlePlay, size }:playpause) =>{
 const {isPlaying, activeSong} = useSelector((state:RootState)=> state.player)
return(
<>
{isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={size} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={size} className="text-gray-300" onClick={handlePlay} />
  )}
</>
)
 
  }
export default PlayPause;
