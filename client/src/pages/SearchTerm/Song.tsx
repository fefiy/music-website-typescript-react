import { song } from '../../models/song';
import TableSong from '../../components/tablesong';
interface tableProp{
    songsdata:song []|null; 
}
const Song = ({songsdata}:tableProp) => {
  return (
    <div>
     {
        songsdata && songsdata.length > 0 &&
        <TableSong songdata={songsdata} />
     }
    </div>
  )
}

export default Song