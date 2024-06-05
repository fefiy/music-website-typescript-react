// components/RegisterModal.tsx
import  { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import { registerStart , reset} from "../../features/user/userSlice";
import { toast } from "react-toastify";
interface RegisterModalProps {
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

const RegisterButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const dispatch = useDispatch()
  const { isLoading, registrationSuccess, err } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(()=>{
    if(registrationSuccess){
      console.log(registrationSuccess)
      onClose()
      setUsername("")
      setPassword("")
      toast.success("Registered successfuly please sign in")
      dispatch(reset())
    }

  },[registrationSuccess])

  const handleRegister = async() => {
   await dispatch(registerStart({ username, password }));
    console.log("reg", registrationSuccess)
    if(registrationSuccess){
      console.log(registrationSuccess)
      // onClose()
      // setUsername("")
      // setPassword("")
      // toast.success("Registered successfuly please sign in")
    }
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
            <Title>Register</Title>
            <InputContainer>
              <InputLabel>Username:</InputLabel>
              <Input
                type="text"
                // value={username}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Password:</InputLabel>
              <Input
                type="password"
                // value={password}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              {
                err && <div style={{color:"red"}}>{err}</div>
              }
            </InputContainer>
            {isLoading? <button disabled={true}>isLoading</button>:
            <RegisterButton onClick={handleRegister}>Register</RegisterButton>
        }
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
