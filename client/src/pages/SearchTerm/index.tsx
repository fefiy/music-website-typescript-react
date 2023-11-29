import { useEffect, useRef, useState } from 'react';
import { FilterConstants, musicGenres } from '../../data';
import styled, { css } from 'styled-components';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import { song } from '../../models/song';
import { IAlbum, fetchalbumsStart } from '../../features/album/albumSlice';
import { IArtist, fetchArtistsStart } from '../../features/artist/artistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import All from './All';

const SearchTerm = () => {
  const { searchterm } = useParams<{ searchterm?: string }>();
  const {songs} = useSelector((state:RootState)=> state.songs)
  const {albums} = useSelector((state:RootState)=> state.album)
  const {artists} = useSelector((state:RootState)=> state.artist)
  const [searchTerm, setSearchTerm] = useState<string>(searchterm ?? ''); // Provide default value if searchterm is undefined
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filterSong, setFilterSong] = useState<song []| null>(null)
  const [filterAlbums, setFilterAlbums] = useState<IAlbum []| null>(null)
  const [filterArtists, setFilterArtists] = useState<IArtist []| null>(null)
  const [filterGenres, setFilterGeners] = useState<string []| null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(searchTerm)
  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
  };

console.log("SearchTemr", searchTerm)

  useEffect(()=>{
    console.log("UseEffect callded inside Searh Term Componentes")
    dispatch(fetchArtistsStart())
    dispatch(fetchalbumsStart())
    if(!searchTerm){
        navigate(`/search/${searchTerm}`)
    }
   if(songs.length > 0){
    const filsong = songs.filter((so)=> so.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilterSong(filsong)
   }
   if(albums.length > 0){
    const filalb = albums.filter((so)=> so.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilterAlbums(filalb)
   }
   if(albums.length > 0){
    const filarti = artists.filter((so)=> so.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilterArtists(filarti)
   }
   if(albums.length > 0){
    const filgener = musicGenres.filter((so)=> so.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilterGeners(filgener)
   }
   if (searchRef.current) {
    searchRef.current.focus();
  }
  },[searchTerm, navigate])
  return (
    <div>
      <SearchBar inputRef={searchRef} setFilter={setSearchTerm} filter={searchTerm} />
      <FilterButtons>
        {FilterConstants.map((item, index) => (
          <FiterItems
            key={index}
            onClick={() => handleWorkFilter(item)}
            active={activeFilter === item}
          >
            {item}
          </FiterItems>

        ))}
      </FilterButtons>

      { activeFilter === "All" &&
          <All artists={filterArtists} filtersongs={filterSong} generes={filterGenres} albums={filterAlbums} />

      }
    </div>
  );
};

const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 4rem 0 2rem;
`;

const FiterItems = styled.div<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #000;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover {
    background-color: gold;
    color: #fff;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: gold;
      color: #fff;
    `}
`;

export default SearchTerm;
