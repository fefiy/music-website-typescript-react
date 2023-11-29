import styled from "styled-components";
import { IArtist } from "../../features/artist/artistSlice";
import {  useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { Link } from "react-router-dom";
const Container = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  height: 270px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.5);
  gap: 15px;
  &:hover {
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ArtistInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h2`
  text-transform: capitalize;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Text = styled.p`
  text-transform: capitalize;
`;
interface ArtistProp {
  artist: IArtist;
}
const ArtistCard = ({ artist }: ArtistProp) => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log("user from artist card", user);

 
  return (
    <Container>
      <ImageContainer>
        <Image src={artist.imageURL} />
      </ImageContainer>
      <ArtistInfo>
        <Title>
          <Link to= {`/artists/${artist._id}`}> {artist.name}</Link>
        </Title>
        <Text>Artist</Text>
      </ArtistInfo>
    </Container>
  );
};

export default ArtistCard;
