import styled, {css} from "styled-components";
import { IAlbum } from "../../features/album/albumSlice";
import { Link } from "react-router-dom";
const Container = styled.div<{isAll:boolean}>`
  position: relative;
  width: 200px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:15px 10px;
  flex-direction: column;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.5);
  gap: 15px;
  &:hover {
  }
  ${({ isAll }) =>
    isAll &&
    css`
    box-shadow:none;
    `}
`;

const ImageContainer = styled.div`
  margin-top: 10px;
  padding:5px;
  width: 150px;
  height: 150px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4%;
`;

const AlbumInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h2`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Text = styled.p`
  text-transform: capitalize;
`;
interface albumProp {
  album: IAlbum;
  isAll:boolean;
}
const AlbumCard = ({ album, isAll }: albumProp) => {
  return (
    <>
    <Link to={`/albums/${album._id}`} >
    <Container isAll={isAll}>
      <ImageContainer>
        <Image src={album.imageURL} />
      </ImageContainer>
      <AlbumInfo>
        <Title>{album.name}</Title>
        <Text>Album</Text>
      </AlbumInfo>
    </Container>
    </Link>
    </>
  );
};

export default AlbumCard;
