import  { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { song } from '../../models/song';
import { RootState } from '../../features/store';
import TableSong from '../../components/tablesong';
const LikedSongs = () => {
const [likedSong, setLikedSong] = useState<song [] | null>(null)
const {songs} = useSelector((state:RootState)=> state.songs)
const {user} = useSelector((state:RootState)=> state.user )
console.log("user from liked song")
useEffect(()=>{
    if(user && songs.length > 0){
        const likeso = songs.filter((song)=> user.favsong.includes(song._id))
        setLikedSong(likeso)
    }
}, [user])
if(!likedSong){
    return <div>Loading .....</div>
}
  return (
    <Container>
        <Header>
            <LikedContainer>
               <FaHeart size={40} />
            </LikedContainer>
            <Text>{likedSong.length} Liked Songs </Text>
        </Header>
       
       {
        likedSong &&
     <TableSong songdata={likedSong}      />   
       }

     
      

    </Container>
  )
}

const Container = styled.div`
margin: 10px auto;
background: linear-gradient(to bottom, #704214, #040c18);
width: 90%;
`
const Header = styled.div`
position: relative;
width: 100%;
display: flex;
align-items: end;
color: white;
gap: 20px;
`

const LikedContainer= styled.div`
  width: 200px;
  height: 200px;
  display:flex;
  align-items: center;
  justify-content: center;
  margin:3px 0;
  background-color: rgba(157, 111, 46);

`
const Text = styled.div`
font-size:18px;
padding:20px;
`



export default LikedSongs