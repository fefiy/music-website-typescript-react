import styled from "styled-components";
import { useRef, useState } from "react";
import LoginModal from "../loginModal";
import RegisterModal from "../registerModal";
import { RootState } from "../../features/store";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import MenuSimple from "./DropDown";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const Container = styled.div`
  position: sticky;
  top: 0;
  width: 98%;
  right: 25%;
  height: 65px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  background-color: #031b34;
  margin-left: 1%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  z-index: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const ButtonSignin = styled.button`
  background: white;
  padding: 8px 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;
const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 760px) {
    margin-left: 60px;
    width: 100%;
  }
`;
const ButtonSignup = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;
interface topBarprops {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const TopBar = ({ searchTerm, setSearchTerm }: topBarprops) => {
  const searchRef = useRef<HTMLElement | null>(null);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [isSinupmodalOpen, setisSinupmodalOpen] = useState<boolean>(false);
  const [isSininmodalOpen, setisSininmodalOpen] = useState<boolean>(false);

  const closeSinupmodal = () => {
    setisSinupmodalOpen(false);
  };
  const closeSininmodal = () => {
    setisSininmodalOpen(false);
  };

  return (
    <>
      <Container>
        <SearchBarContainer>
          <SearchBar
            inputRef={searchRef}
            setFilter={setSearchTerm}
            filter={searchTerm}
          />
        </SearchBarContainer>

        {user !== null && isAuthenticated ? (
          <>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`${user.username}`}>
              <MenuSimple />
            </a>
            <Tooltip id="my-tooltip" />
          </>
        ) : (
          <ButtonContainer>
            <ButtonSignup onClick={() => setisSinupmodalOpen(true)}>
              signup
            </ButtonSignup>
            <ButtonSignin onClick={() => setisSininmodalOpen(true)}>
              signin
            </ButtonSignin>
          </ButtonContainer>
        )}
      </Container>
      <LoginModal isOpen={isSininmodalOpen} onClose={closeSininmodal} />
      <RegisterModal isOpen={isSinupmodalOpen} onClose={closeSinupmodal} />
    </>
  );
};

export default TopBar;
