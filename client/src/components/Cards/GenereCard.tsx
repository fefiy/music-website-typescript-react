import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const GenereInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h2`
  margin-bottom: 5px;
`;
const Text = styled.p``;
const GenereCard = () => {
  return (
    <Container>
        <ImageContainer>
            <Image>

            </Image>
        </ImageContainer>
        <GenereInfo>
            <Title>

            </Title>
            <Text>

            </Text>
        </GenereInfo>
    </Container>
  )
}

export default GenereCard