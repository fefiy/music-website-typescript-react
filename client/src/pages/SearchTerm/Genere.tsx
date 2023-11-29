import styled from "styled-components";
import { genereobj } from "../../data";
import GenereCard from "../../components/SliderCard/GenereCard";



interface prop {
  generes: string[];
}
const GenereContainer = styled.div``;

const Genere = ({ generes }: prop) => {
  return (
    <GenereContainer>
      {genereobj
        .filter((genere) => generes.includes(genere.name))
        .map((gn) => (
          <GenereCard  bg={gn.bg} img={gn.image}   genre={gn.name}/>
        ))}
    </GenereContainer>
  );
};

export default Genere;
