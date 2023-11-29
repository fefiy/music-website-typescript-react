import styled from "styled-components";
import { IArtist } from "../../features/artist/artistSlice";
import { Link } from "react-router-dom";
interface artistprop {
  artist: IArtist;
}
const Card = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background: #042c54;
`;

const ImageContainer = styled.div`
  position: relative;
  left: 75px;
  top: 50px;
  width: 120px;
  height: 120px;
  transform: rotate(38deg);
`;
const Title = styled.h1`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  text-transform: capitalize;
  padding: 10px;
  color: #81afdd;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ArtistCard = ({ artist }: artistprop) => {
  return (
    <>
      <Link to={`/artists/${artist._id}`}>
        <Card>
          <Title>{artist.name}</Title>
          <ImageContainer>
            <Image src={artist.imageURL} alt="Your Alt Text" />
          </ImageContainer>
        </Card>
      </Link>
    </>
  );
};

export default ArtistCard;
