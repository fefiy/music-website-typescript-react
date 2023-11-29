import { IAlbum } from '../../features/album/albumSlice'
import styled from 'styled-components'
import AlbumCard from '../../components/Cards/AlbumCard'
const AlbumsContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:20px;
flex-wrap:wrap;
`

interface albumProp{
  albums:IAlbum [] |null
}
const Album = ({albums}:albumProp) => {
  return (
    <div>Album
      {
        albums && albums.length > 0 && 
        <AlbumsContainer>
          {
            albums.map((album)=>
          <AlbumCard isAll={false} album={album} />
            )
          }
        </AlbumsContainer>
      }
    </div>
  )
}

export default Album