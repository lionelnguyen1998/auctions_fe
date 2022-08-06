import React, {useState} from 'react';
import UploadService from "../../components/services/FileUploadService";
import './index.css'

function Upload({file, setFile,t}) {
    const [imagePreview, setImagePreview] = useState();
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [currentFiles, setCurrentFiles] = useState(undefined);

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
                setFile(response.data[0]);
            })
            .catch(() => {
              setProgress(0);
              setCurrentFiles(undefined);
            })
        setSelectedFile(undefined);
    };

    return(
        <>
        {
            <div className="form-group">
                <label htmlFor="file"><b>{t('contacts.image')}</b></label>
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
                                <input hidden name="file" value={file}/>
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
                </div>
                {
                    imagePreview && (
                        <img src={imagePreview.preview} alt="" width="30%"/>
                    ) 
                }
                    
            </div>
        }
       
        </>
    )
}

export default Upload;