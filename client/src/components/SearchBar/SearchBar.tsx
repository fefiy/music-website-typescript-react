import React, { useEffect } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0px 10px;
`;

const Input = styled.input`
  width: 100%;
  width: 100%;
  color: white;
  padding: 10px;
  background: transparent;
  border: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

interface SearchBarProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLElement | null>;
}

const SearchBar = ({ filter, setFilter, inputRef }: SearchBarProps) => {
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SearchBarContainer>
      <CiSearch style={{ color: "white", fontWeight:"bold" }} size={20} />
      <Input
        placeholder="What do you want to hear"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
