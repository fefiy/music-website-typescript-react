// components/AddArtistModal.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import FileLoader from "../fileUploader/FileLoader";
import FileUploader from "../fileUploader/FileUploader";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import ButonLoading from "../ButtonLoading";
import { addArtistStart } from "../../features/artist/artistSlice";
interface AddArtistModalProps {
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
color: #042c54
border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #031B34;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
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

const TextArea = styled.textarea`
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

const AddArtistButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const FileLoaderContainer = styled.div`
  position: relative;
  // width: 120px;
  border-radius: 10px;
  height: 140px;
  border: solid 1px grey;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FileImageUploaded = styled.div`
  margin-bottom: 8px;
  width: 100%;
  height: 100%;
  img {
    object-fit: cover;
    width: 100%;
    border-radius: 4px;
  }
`;

const FileDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;

const AddArtistModal: React.FC<AddArtistModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const dispatch = useDispatch();
  const { isLoading, isArtistAddSuccesfuly } = useSelector(
    (state: RootState) => state.artist
  );

  useEffect(() => {
    if (isArtistAddSuccesfuly) {
      onClose();
      setName("");
      setDescription("");
      setImageURL("");
      setProgress(0);
      toast.success("Artist added successfully");
    }
  }, [isLoading]);

  const deleteFileObject = (url: string) => {
    const deleteRef = ref(storage, url);

    setIsImgLoading(true);
    deleteObject(deleteRef).then(() => {
      setImageURL("");
      setIsImgLoading(false);
    });
  };

  const handleAddArtist = async () => {
    if (!imageURL) {
      toast.error("image url dosn't found");
    } else {
      dispatch(addArtistStart({ name, imageURL, description }));
    }
  };

  console.log("inputs", imageURL, description, name);
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
            <Title>Add Artist</Title>
            <InputContainer>
              <InputLabel>Name:</InputLabel>
              <Input
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>description:</InputLabel>
              <TextArea
                // type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></TextArea>
              {/* {err && <ErrorMessage>{err}</ErrorMessage>} */}
            </InputContainer>
            <FileLoaderContainer>
              {isImgLoading && <FileLoader progress={progress} />}
              {!isImgLoading && (
                <>
                  {!imageURL ? (
                    <FileUploader
                      updateState={setImageURL}
                      isLoading={setIsImgLoading}
                      setProgress={setProgress}
                      isImage={true}
                    />
                  ) : (
                    <>
                      <FileImageUploaded>
                        <img src={imageURL} alt="Uploaded File" />
                      </FileImageUploaded>
                      <FileDeleteButton
                        onClick={() => deleteFileObject(imageURL)}>
                        <MdDelete />
                      </FileDeleteButton>
                    </>
                  )}
                </>
              )}
            </FileLoaderContainer>
            <>
              {isImgLoading ? (
                <ButonLoading />
              ) : (
                <AddArtistButton onClick={handleAddArtist}>
                  Add Artist
                </AddArtistButton>
              )}
            </>
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default AddArtistModal;
