import styled from "styled-components";
import { IAlbum } from "../../features/album/albumSlice";
import { Link } from "react-router-dom";
interface Albumprop {
  album: IAlbum;
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
  font-size: 17px;
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
  padding: 13px;
  color: #81afdd;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AlbumCard = ({ album }: Albumprop) => {
  return (
    <>
      <Link to={`/albums/${album._id}`}>
        <Card>
          <Title>{album.name}</Title>
          <ImageContainer>
            <Image src={album.imageURL} alt="Your Alt Text" />
          </ImageContainer>
        </Card>
      </Link>
    </>
  );
};

export default AlbumCard;
