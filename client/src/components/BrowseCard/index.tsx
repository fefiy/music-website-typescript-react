import styled from 'styled-components';

const Card = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background: pink;
`;

const ImageContainer = styled.div`
  position: relative;
  left: 100px;
  top: 95px;
  width: 100px;
  height: 100px;
  transform: rotate(38deg);
  background: yellow;
`;
const Title = styled.h1`
font-size:20px;
text-align:center;
`
const BrowseCard = () => {
  return (
    <Card>
      <Title>Pop</Title>
      <ImageContainer>
        <img src="" alt="Your Alt Text" />
      </ImageContainer>
    </Card>
  );
};

export default BrowseCard;
