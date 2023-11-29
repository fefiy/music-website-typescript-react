import styled from "styled-components";
import { IArtist } from "../../features/artist/artistSlice";
import { song } from "../../models/song";
import { IAlbum } from "../../features/album/albumSlice";
import { playPause, setActiveSong } from "../../features/play/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import AlbumCard from "../../components/Cards/AlbumCard";
import ArtistCard from "../../components/Cards/ArtistCard";
import SliderArtist from "../search/SliderArtist";
import SliderAlbum from "../search/SliderAlbums";
import SongTable from "../../components/SongTable";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  background-color:  #042c54;
  display: flex;
  gap: 40px;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const TopResult = styled.div`
 
`;
const TopResultDiv = styled.div`
hieght: 180px;
width: 350px;
@media(max-width:1000){
  width:320px;
}
$:hover{

}
`;
const SongsContainer = styled.div`
  width:90%;
  @media(max-width:1000){
    width:80%
  }
  @media(max-width:760){
    width:80%
  }
`;

const ArtistSliderContainer = styled.div`
  /* Add your styles for ArtistSliderContainer here */
`;

const AlbumSlideContainer = styled.div`
  /* Add your styles for AlbumSlideContainer here */
`;

const GenereSliderContainer = styled.div`
  /* Add your styles for GenereSliderContainer here */
`;

interface allProp {
  artists: IArtist[] | null;
  filtersongs: song[] | null;
  albums: IAlbum[] | null;
  generes: string[] | null;
}
const All = ({ artists, filtersongs, albums, generes }: allProp) => {
  const { songs } = useSelector((state: RootState) => state.songs);

  const dispatch = useDispatch();
  const handlePlayClick = (song: song) => {
    if (songs.length > 0) {
      dispatch(setActiveSong({ song, data: songs }));
      dispatch(playPause(true));
    }
  };
  const handlePauseClick = () => {
    console.log("pase Click From Card");
    dispatch(playPause(false));
  };
  const {  activeSong } = useSelector(
    (state: RootState) => state.player
  );
  return (
    <Container>
      <Header>
        <TopResult>
          <h1>TopResult</h1>
          {albums && albums.length > 0 ? (
            <Link to="/al">
            <TopResultDiv>
              <AlbumCard isAll={true} album={albums[0]} />
            </TopResultDiv>
            </Link>
          ) : (
            <>
              {generes && generes.length > 0 ? (
                <TopResultDiv>
                  genere found
                  {/* <GenereCard img={}  /> */}
                </TopResultDiv>
              ) : (
                <>
                  {artists && artists.length > 0 && (
                    <TopResultDiv>
                      artist foundeddddd
                      <ArtistCard artist={artists[0]} />
                    </TopResultDiv>
                  )}
                </>
              )}
            </>
          )}
        </TopResult>
        <SongsContainer>
          {filtersongs && <>
          {
            filtersongs.length > 4 ?
            <div>
            <h1>Songs</h1>
            {
              filtersongs.slice(0,4).map((so) => (
                <SongTable
                  song={so}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(so)}
                />
              ))}
          </div>:
             <div>
             <h1>Songs</h1>
             {filtersongs.length > 0 &&
               filtersongs.map((so) => (
                 <SongTable
                   song={so}
                   activeSong={activeSong}
                   handlePauseClick={handlePauseClick}
                   handlePlayClick={() => handlePlayClick(so)}
                 />
               ))}
           </div>
          }
          </>
          }
        </SongsContainer>
      </Header>

      <ArtistSliderContainer>
        <h1>Artists</h1>
        {artists && artists?.length > 0 && (
          <>
            <SliderArtist artists={artists} />
          </>
        )}
      </ArtistSliderContainer>
      <AlbumSlideContainer>
     <h1>Albums</h1>
        {albums && albums.length > 0 && (
          <>
            <SliderAlbum albums={albums} />
          </>
        )}
      </AlbumSlideContainer>
      <GenereSliderContainer>
        <h1>Geners</h1>
        {generes && generes.length > 0 && <>{/* <SliderGenere   /> */}</>}
      </GenereSliderContainer>
    </Container>
  );
};

export default All;

