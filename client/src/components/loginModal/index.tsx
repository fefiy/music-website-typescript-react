// components/LoginModal.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../features/store";
import {
  loginStart,
  reset,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper = styled(motion.div)<{ isOpen: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  display:flex;
  flex-direction:column;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  background: #031B34;
  color: #042c54
   border-radius: 8px;
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
    border-color: #888;
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
`;

const LoginButton = styled.button`
  padding: 10px 16px;
  background-color:#81AFDD;
  color: white;
  
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<String>("fozi");
  const [password, setPassword] = useState<String>("fefu123");
  const dispatch = useDispatch();
  const {  loginSuccess } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (loginSuccess) {
      console.log(loginSuccess);
      onClose();
      setUsername("");
      setPassword("");
      toast.success("successfuly sign in");
      dispatch(reset());
    }
  }, [loginSuccess]);
  const handleLogin = () => {
    dispatch(loginStart({ username, password }));
    console.log("Logging in with:", { username, password });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <ModalContent
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}>
            <CloseButton onClick={onClose}>✕</CloseButton>
            <Title>Login</Title>
            <InputContainer>
              <InputLabel>Username:</InputLabel>
              <Input
                type="text"
                defaultValue={"fozi"}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Password:</InputLabel>
              <Input
                type="password"
                defaultValue={"fefu123"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
