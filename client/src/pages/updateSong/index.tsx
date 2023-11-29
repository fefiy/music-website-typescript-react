import React, { useEffect, useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import FileLoader from "../../components/fileUploader/FileLoader";
import FileUploader from "../../components/fileUploader/FileUploader";
import { languages, musicGenres } from "../../data";
import { MdDelete } from "react-icons/md";
import { storage } from "../../config/firebase.config";
import AddMultipleInput from "../../components/AddInput/AddMultipleInput";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {reset, updateMusic } from "../../features/music/musicSlice";
import ButonLoading from "../../components/ButtonLoading";
import {fetchArtistsStart } from "../../features/artist/artistSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { fetchalbumsStart } from "../../features/album/albumSlice";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateSong = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const privateAxios = useAxiosPrivate();
  const navigate = useNavigate()
  const [imageURL, setImageURL] = useState<string>("");
  const [isimageLoading, setIsimageLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [issongLoading, setIssongLoading] = useState(false);
  const [songURL, setSongURL] = useState<string>("");
  const [genere, setGenere] = useState<string[]>([""]);
  const [artist, setArtist] = useState<string[]>([""]);
  const [lyrics, setLyrics] = useState<string>("");
  console.log("image URL url", imageURL);
  console.log(isimageLoading);
  const { artists } = useSelector((state: RootState) => state.artist);
  const { albums } = useSelector((state: RootState) => state.album);
  const { songs, isMusicAddSuccesfuly } = useSelector((state: RootState) => state.songs);
  const deleteFileObject = (url: string, isImage: boolean) => {
    const deleteRef = ref(storage, url);
    if (isImage) {
      setIsimageLoading(true);
      deleteObject(deleteRef).then(() => {
        setImageURL("");
        setIsimageLoading(false);
      });
    } else {
      setIssongLoading(true);
      deleteObject(deleteRef).then(() => {
        setSongURL("");
        setIssongLoading(false);
      });
    }
  };

  const onHandleClick = async () => {
    const { language, title, album } = initialnput;
    if (imageURL === "" || songURL === "") {
      toast.error("Please upload both image and song URL.");
    }
    if (
      artist.includes("") ||
      genere.includes("") ||
      !language ||
      !title ||
      !album
    ) {
      toast.error("Please fill all fields.");
    }
    try {
      const data = {
        ...initialnput,
        imageURL,
        songURL,
        artist,
        genere,
        lyrics,
      };
      console.log(data);
      const res = dispatch(updateMusic({ data, songid, privateAxios }));
      console.log(res);
    } catch (err) {
      toast.error("Error while updating the song");
      console.log(err);
    }
  };

  const [initialnput, setInitialInput] = useState({
    language: "",
    title: "",
    album: "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInitialInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSong = async () => {
    try {
      setIsLoading(true);

      const songg = songs.filter((so) => so._id === songid)[0];
      // setSongURL(response.data);
      setInitialInput({
        language: songg?.language || " ",
        title: songg?.title || "",
        album: songg?.album._id || "",
      });
      setArtist(songg?.artist.map((ar) => ar._id));
      setGenere(songg?.genere.map((g) => g.toUpperCase()) || [""]);
      setImageURL(songg?.imageURL || "");
      setSongURL(songg?.songURL || "");
      setIsLoading(false);
      if (songg.lyrics) {
        setLyrics(songg?.lyrics);
      }
    } catch (err) {
      setIsimageLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if(isMusicAddSuccesfuly){
      toast.success("music Updated Succefully")
      dispatch(reset())
      navigate("/songs/"+songid)
    }
  }, [isMusicAddSuccesfuly]);
  useEffect(() => {
    if (artists.length == 0 || albums.length == 0) {
      dispatch(fetchArtistsStart());
      dispatch(fetchalbumsStart());
    }
    fetchSong();
  }, [songid]);
  console.log("album", albums);
  console.log("artists", artists);
  if (isLoading) {
    return <div>isLoading ....</div>;
  }
  return (
    <Container>
      <AddContainer>
        <FormControl>
          <Label>Select Language</Label>
          <Select
            name="language"
            onChange={(e) => handleChangeInput(e)}
            required={true}
            value={initialnput.language}>
            <option disabled value="">
              Language
            </option>
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Label>select album</Label>
          <Select
            placeholder="Album"
            name="album"
            onChange={(e) => handleChangeInput(e)}
            // type="text"
            required={true}
            value={initialnput.album}>
            {" "}
            <option disabled value="">
              Album
            </option>
            {albums &&
              albums.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>
      </AddContainer>
      <AddContainer>
        <AddMultipleInput
          teams={genere}
          setTeams={setGenere}
          label={"Select Geners"}
          options={musicGenres}
          isArtist={false}
        />

        <AddMultipleInput
          teams={artist}
          setTeams={setArtist}
          label={"select artist"}
          isArtist={true}
          options={artists.length > 0 && artists}
        />
      </AddContainer>
      <AddContainer>
        <FormControl>
          <Input
            placeholder="Title"
            name="title"
            onChange={(e) => handleChangeInput(e)}
            type="text"
            required={true}
            value={initialnput.title}
          />
        </FormControl>
      </AddContainer>
      <TextAreaContainer>
        <Label>Lyrics(optinal)</Label>
        <TextArea
          onChange={(e) => setLyrics(e.target.value)}
          rows={6}
          value={lyrics}
          placeholder="Lyrics (Optional)"></TextArea>
      </TextAreaContainer>
      <FileLoaderContainer>
        {isimageLoading && <FileLoader progress={progress} />}
        {!isimageLoading && (
          <>
            {!imageURL ? (
              <FileUploader
                updateState={setImageURL}
                isLoading={setIsimageLoading}
                setProgress={setProgress}
                isImage={true}
              />
            ) : (
              <>
                <FileImageUploaded>
                  <img src={imageURL} alt="URL" />
                </FileImageUploaded>
                <FileDeleteButton>
                  <MdDelete onClick={() => deleteFileObject(imageURL, true)} />
                </FileDeleteButton>
              </>
            )}
          </>
        )}
      </FileLoaderContainer>

      <FileLoaderContainer>
        {issongLoading && <FileLoader progress={progress} />}
        {!issongLoading && (
          <>
            {!songURL ? (
              <FileUploader
                updateState={setSongURL}
                isLoading={setIssongLoading}
                setProgress={setProgress}
                isImage={false}
              />
            ) : (
              <>
                <FileImageUploaded>
                  <CustomAudio src={songURL} controls />
                </FileImageUploaded>
                <FileDeleteButton>
                  <MdDelete onClick={() => deleteFileObject(songURL, false)} />
                </FileDeleteButton>
              </>
            )}
          </>
        )}
      </FileLoaderContainer>

      {issongLoading || isimageLoading ? (
        <ButonLoading />
      ) : (
        <AddButton onClick={onHandleClick}>Add Song</AddButton>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 3% auto;
  color: white;
  border: 1px solid white;
  width: 80%;
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddContainer = styled.div`
  display: flex;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 40%;
  margin: 0 5%;
  margin-bottom: 10px;
`;

const TextAreaContainer = styled.div`
  display: flex;
  width: 90%;

  flex-direction: column;
  margin: 0 auto;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 8px;

  /* Add your select styles here */
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const FileLoaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  border-radius: 10px;
  height: 200px;
  border: 1px dashed white;
  margin: 10px auto;
  overflow: hidden;
`;

const FileImageUploaded = styled.div`
  display: flex;
  align-items: center;
  justify-content: centr;
`;

const FileDeleteButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 12px;
  font-size: 20px;
`;

const AddButton = styled.button`
  width: 30%;
  padding: 10px;
  margin: 10px auto;
  border-radius: 10px;
  border: none;
  background-color: rgba(2, 0, 128, 0.5);
`;
const CustomAudio = styled.audio`
  width: 200px;
  &::-webkit-media-controls-panel {
    width: 50px; /* Adjust this value to your desired size */
  }

  &::-webkit-media-controls-volume-slider {
    width: 50px; /* Adjust this value to your desired size */
  }
`;
export default UpdateSong;
