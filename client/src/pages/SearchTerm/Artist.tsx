import styled from 'styled-components'
import ArtistCard from '../../components/Cards/ArtistCard'
import { IArtist } from '../../features/artist/artistSlice'
const ArtistsContainer = styled.div`
display:flex;
align-items:center;
gap:30px;
justify-content:center;
flex-wrap:wrap;
`

interface ArtistProp{
  artists:IArtist [] |null
}
const Artist = ({artists}:ArtistProp) => {
  return (
    <div>Artist
      {
        artists && artists.length > 0 && 
        <ArtistsContainer>
          {
            artists.map((artist)=>
          <ArtistCard artist={artist} />
            )
          }
        </ArtistsContainer>
      }
    </div>
  )
}

export default Artist