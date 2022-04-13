import React, {useState, Fragment, useEffect, useRef} from "react";
import UploadService from "../services/FileUploadService";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [previewImages, setPreviewImages] = useState([])
  const progressInfosRef = useRef(null)

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setProgressInfos({ val: [] });
    let images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]))
    }
    setPreviewImages(images);
  };

  const uploadFiles = () => {
    const files = Array.from(selectedFiles);
    let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));
    progressInfosRef.current = {
      val: _progressInfos,
    }
    const uploadPromises = files.map((file, i) => upload(i, file));
    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then((files) => {
        setFileInfos(files.data);
      });
    setMessage([]);
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => ([
          ...prevMessage,
          "Uploaded the file successfully: " + file.name,
        ]));
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });
        setMessage((prevMessage) => ([
          ...prevMessage,
          "Could not upload the file: " + file.name,
        ]));
      });
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);
  
  return (
    <Fragment>
      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" multiple onChange={selectFiles} />
          </label>
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadFiles}
          >
            Upload
          </button>
        </div>
      </div>
      {previewImages && (
        <div>
          {previewImages.map((img, i) => {
            return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
          })}
        </div>
      )}
    </Fragment>
  );
};
export default UploadFile;

