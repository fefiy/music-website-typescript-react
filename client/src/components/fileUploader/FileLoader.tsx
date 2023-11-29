interface fileprop{
    progress:number
}
const FileLoader = ({ progress }:fileprop) => {
    return (
      <div className="file-l-cont">
        <p className="file-text">
          {Math.round(progress) > 0 && <>{`${Math.floor(progress)} % `}</>}
        </p>
        <div className="file-progress-cont"></div>
      </div>
    );
  };

  export default FileLoader
