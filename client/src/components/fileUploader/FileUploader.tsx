import { BiCloudUpload } from "react-icons/bi";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import styled from "styled-components";

interface fileUploaderProps {
  updateState: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isImage: boolean;
}

const FileUploadContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FileUploadContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const FileUploadText = styled.p`
  margin-left: 10px;
  color:black;
`;

const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}: fileUploaderProps) => {
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    isLoading(true);
    const uploadedFile = e.target.files && e.target.files[0];
    console.log(uploadedFile);
    if (uploadedFile) {
      const storageRef = ref(
        storage,
        `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile?.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
      uploadTask.on(
        "state_changed",

        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateState(downloadURL);
            isLoading(false);
          });
        }
      );
    }
  };

  return (
    <FileUploadContainer>
      <FileUploadContent>
        <BiCloudUpload style={{color:"black"}} />
        <FileUploadText>Upload {isImage ? "image" : "an audio"}</FileUploadText>
      </FileUploadContent>
      <input
        type="file"
        style={{
          width: 0,
          height: 0,
        }}
        onChange={uploadFile}
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
      />
    </FileUploadContainer>
  );
};

export default FileUploader;