import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface GenreProp {
  genre: string;
  bg: string;
  img: string;
}

const Card = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
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
  padding: 10px;
  color: #81AFDD;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GenreCard = ({ genre, bg, img }: GenreProp) => {
  return (
    <>
    <Link to={`/generes/${genre}`}>
    <Card style={{ backgroundColor: `${bg}` }}>
      <Title>{genre}</Title>
      <ImageContainer>
        <Image src={img} alt="Genre" />
      </ImageContainer>
    </Card>
    </Link>
    </>
  );
};

export default GenreCard;
