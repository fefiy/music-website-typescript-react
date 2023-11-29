import styled from 'styled-components';
import  loader  from "../../assets/loader.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.25rem; /* Equivalent to text-2xl in Tailwind CSS */
  color: white;
  margin-top: 0.5rem;
`;

const Loader = () => (
  <Container>
    <Image src={loader} alt="loader" />
    <Title>{'Loading'}</Title>
  </Container>
);

export default Loader;
