import React from "react";
import styled from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IArtist } from "../../features/artist/artistSlice";
import { toast } from "react-toastify";

interface MultipleInputProps {
  teams: string[];
  label: string;
  options: string[] | IArtist[];
  setTeams: React.Dispatch<React.SetStateAction<string[]>>;
  isArtist: boolean;
}

const AddMultipleInput = ({
  teams,
  setTeams,
  label,
  options,
  isArtist,
}: MultipleInputProps) => {
  
  const handleAddTeam = () => {
    
    const newTeamValue = teams[teams.length - 1];

    if (teams.slice(0, -1).includes(newTeamValue)) {
      // Show an error if the value is repeated
    toast.error(" Field is repeated!");
    } else {
      // Add the new team only if it's not repeated
      setTeams((prevTeams) => [...prevTeams, ""]);
    }
  };

  const handleRemoveTeam = (index: number) => {
    if (teams.length > 1) {
      setTeams((prevTeams) => {
        const updatedTeams = [...prevTeams];
        updatedTeams.splice(index, 1);
        return updatedTeams;
      });
    }
  };

  const handleTeamInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setTeams((prevTeams) => {
      const updatedTeams = [...prevTeams];
      updatedTeams[index] = value;
      return updatedTeams;
    });
  };
  console.log("teams", teams);

  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      {teams.map((team, index) => (
        <InputContainer key={index}>
          <Select
            required
            value={team}
            placeholder={`${label}`}
            onChange={(event) => handleTeamInputChange(index, event)}>
            <option  value="" selected={true} disabled hidden>
              {`${label}`}
            </option>
            {isArtist && options.length > 0 ? (
              (options as IArtist[]).map((option, i) => (
                <option key={i} value={option._id}>
                  {option.name}
                </option>
              ))
            ) : (
              <>
                {options.length > 0 &&
                  (options as string[]).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
              </>
            )}
          </Select>
          {index === teams.length - 1 && index > 0 && (
            <MinusButton onClick={() => handleRemoveTeam(index)}>
              <AiOutlineMinus />
            </MinusButton>
          )}
        </InputContainer>
      ))}
      <PlusButton onClick={handleAddTeam}>
        <AiOutlinePlus />
      </PlusButton>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px auto;
  width: 40%;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.div`
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const InputContainer = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
`;

const MinusButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
`;

const PlusButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
`;

export default AddMultipleInput;
