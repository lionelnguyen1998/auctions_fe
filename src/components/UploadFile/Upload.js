import React, {useState} from 'react';
import UploadService from "../services/FileUploadService";
import './upload.css'

function Upload({images, setImages, index, t}) {
    const [imagePreview, setImagePreview] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [currentFiles, setCurrentFiles] = useState(undefined);
    const [show, setShow] = useState(true)

    const selectFile = (event) => {
        setSelectedFile(event.target.files);
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImagePreview(file)
    };

    const upload = () => {
        let currentFile = selectedFile[0];
        setProgress(0);
        setCurrentFiles(currentFile);
        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
            })
            .then((response) => {
                setImages([...images, response.data[0]]);
            })
            .catch(() => {
              setProgress(0);
              setCurrentFiles(undefined);
            })
        setSelectedFile(undefined);
    };
    const handleRemoveImage = (id) => {
        // console.log(images)
        const s = images.filter((image, index) => index !== id)
        setImages(s)
        setShow(false)
    }
    return(
        <>
        {
            (show) && (
                <div className="form-group" key={index}>
                    {currentFiles && (
                        <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                        >
                            {progress}%
                        </div>
                        </div>
                    )}
                    <div className="row my-4">
                        <div className="col-8">
                            <label className="btn btn-default p-0">
                                <input type="file" onChange={selectFile} />
                                {
                                    <input hidden name="images" value={images}/>
                                }
                            </label>
                        </div>
                        <div className="col-3">
                            <p
                                className="btn btn-success btn-sm"
                                disabled={!selectFile}
                                onClick={upload}
                            >
                                {t('input_item.upload')}
                            </p>
                            
                        </div>
                        <div className="col-1">
                        <a class="btn-check" onClick={() => handleRemoveImage(index)}>
                                <i class="fa fa-times" style={{color:'#dc3545'}}></i>
                            </a>
                        </div>
                    </div>
                    {
                        imagePreview && (
                            <img src={imagePreview.preview} alt="" width="30%"/>
                        )
                    }
                     
                </div>
            )
        }
       
        </>
    )
}

export default Upload;