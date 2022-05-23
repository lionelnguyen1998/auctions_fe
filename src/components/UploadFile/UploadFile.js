// import React, {useState, Fragment, useEffect, useRef} from "react";
// import UploadService from "../services/FileUploadService";

// const UploadFile = () => {
//   const [selectedFiles, setSelectedFiles] = useState(undefined);
//   const [progressInfos, setProgressInfos] = useState({ val: [] });
//   const [message, setMessage] = useState([]);
//   const [fileInfos, setFileInfos] = useState([]);
//   const [previewImages, setPreviewImages] = useState([])
//   const progressInfosRef = useRef(null)

//   const selectFiles = (event) => {
//     setSelectedFiles(event.target.files);
//     setProgressInfos({ val: [] });
//     let images = [];
//     for (let i = 0; i < event.target.files.length; i++) {
//       images.push(URL.createObjectURL(event.target.files[i]))
//     }
//     setPreviewImages(images);
//   };

//   const uploadFiles = () => {
//     const files = Array.from(selectedFiles);
//     let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));
//     progressInfosRef.current = {
//       val: _progressInfos,
//     }
//     const uploadPromises = files.map((file, i) => upload(i, file));
//     Promise.all(uploadPromises)
//       .then(() => UploadService.getFiles())
//       .then((files) => {
//         setFileInfos(files.data);
//       });
//     setMessage([]);
//   };

//   const upload = (idx, file) => {
//     let _progressInfos = [...progressInfosRef.current.val];
//     return UploadService.upload(file, (event) => {
//       _progressInfos[idx].percentage = Math.round(
//         (100 * event.loaded) / event.total
//       );
//       setProgressInfos({ val: _progressInfos });
//     })
//       .then(() => {
//         setMessage((prevMessage) => ([
//           ...prevMessage,
//           "Uploaded the file successfully: " + file.name,
//         ]));
//       })
//       .catch(() => {
//         _progressInfos[idx].percentage = 0;
//         setProgressInfos({ val: _progressInfos });
//         setMessage((prevMessage) => ([
//           ...prevMessage,
//           "Could not upload the file: " + file.name,
//         ]));
//       });
//   };

//   useEffect(() => {
//     UploadService.getFiles().then((response) => {
//       setFileInfos(response.data);
//     });
//   }, []);
  
//   return (
//     <Fragment>
//       <div className="row my-3">
//         <div className="col-8">
//           <label className="btn btn-default p-0">
//             <input type="file" multiple onChange={selectFiles} />
//           </label>
//         </div>
//         <div className="col-4">
//           <button
//             className="btn btn-success btn-sm"
//             disabled={!selectedFiles}
//             onClick={uploadFiles}
//           >
//             Upload
//           </button>
//         </div>
//       </div>
//       {previewImages && (
//         <div>
//           {previewImages.map((img, i) => {
//             return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
//           })}
//         </div>
//       )}
//     </Fragment>
//   );
// };
// export default UploadFile;

// {/* <div className="form-group">
//                     <label htmlFor="images"><b>写真 </b></label>
//                     {currentFiles && (
//                       <div className="progress">
//                         <div
//                           className="progress-bar progress-bar-info progress-bar-striped"
//                           role="progressbar"
//                           aria-valuenow={progress1}
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                           style={{ width: progress1 + "%" }}
//                         >
//                           {progress1}%
//                         </div>
//                       </div>
//                     )}
//                     <div className="row my-3">
//                       <div className="col-8">
//                         <label className="btn btn-default p-0">
//                           <input type="file" onChange={selectFile} />
//                           {
//                               <input hidden name="images" value={images}/>
//                           }
//                         </label>
//                       </div>
//                       <div className="col-4">
//                         <p
//                           className="btn btn-success btn-sm"
//                           disabled={!selectFile}
//                           onClick={upload}
//                         >
//                           アップ
//                         </p>
//                       </div>
//                     </div>
//                     {
//                         imagePreview1 && (
//                             <img src={imagePreview1.preview} alt="" width="30%"/>
//                         )
//                     }
//                 </div>
//                 <div className="form-group">
//                     {currentFiles2 && (
//                       <div className="progress">
//                         <div
//                           className="progress-bar progress-bar-info progress-bar-striped"
//                           role="progressbar"
//                           aria-valuenow={progress2}
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                           style={{ width: progress2 + "%" }}
//                         >
//                           {progress2}%
//                         </div>
//                       </div>
//                     )}
//                     <div className="row my-3">
//                       <div className="col-8">
//                         <label className="btn btn-default p-0">
//                           <input type="file" onChange={selectFile2} />
//                           {
//                               <input hidden name="images" value={images}/>
//                           }
//                         </label>
//                       </div>
//                       <div className="col-4">
//                         <p
//                           className="btn btn-success btn-sm"
//                           disabled={!selectFile2}
//                           onClick={upload2}
//                         >
//                           アップ
//                         </p>
//                       </div>
//                     </div>
//                     {
//                         imagePreview2 && (
//                             <img src={imagePreview2.preview} alt="" width="30%"/>
//                         )
//                     }
//                 </div>
//                 <div className="form-group">
//                     {currentFiles3 && (
//                       <div className="progress">
//                         <div
//                           className="progress-bar progress-bar-info progress-bar-striped"
//                           role="progressbar"
//                           aria-valuenow={progress3}
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                           style={{ width: progress3 + "%" }}
//                         >
//                           {progress3}%
//                         </div>
//                       </div>
//                     )}
//                     <div className="row my-3">
//                       <div className="col-8">
//                         <label className="btn btn-default p-0">
//                           <input type="file" onChange={selectFile3} />
//                           {
//                               <input hidden name="images" value={images}/>
//                           }
//                         </label>
//                       </div>
//                       <div className="col-4">
//                         <p
//                           className="btn btn-success btn-sm"
//                           disabled={!selectFile3}
//                           onClick={upload3}
//                         >
//                           アップ
//                         </p>
//                       </div>
//                     </div>
//                     {
//                         imagePreview3 && (
//                             <img src={imagePreview3.preview} alt="" width="30%"/>
//                         )
//                     }
//                 </div>

//                 <div className="form-group">
//                     {currentFiles4 && (
//                       <div className="progress">
//                         <div
//                           className="progress-bar progress-bar-info progress-bar-striped"
//                           role="progressbar"
//                           aria-valuenow={progress4}
//                           aria-valuemin="0"
//                           aria-valuemax="100"
//                           style={{ width: progress4 + "%" }}
//                         >
//                           {progress4}%
//                         </div>
//                       </div>
//                     )}
//                     <div className="row my-4">
//                       <div className="col-8">
//                         <label className="btn btn-default p-0">
//                           <input type="file" onChange={selectFile4} />
//                           {
//                               <input hidden name="images" value={images}/>
//                           }
//                         </label>
//                       </div>
//                       <div className="col-4">
//                         <p
//                           className="btn btn-success btn-sm"
//                           disabled={!selectFile4}
//                           onClick={upload4}
//                         >
//                           アップ
//                         </p>
//                       </div>
//                     </div>
//                     {
//                         imagePreview4 && (
//                             <img src={imagePreview4.preview} alt="" width="30%"/>
//                         )
//                     }
//                 </div> */}


//                 useEffect(() => {
//                   return () => {
//                       imagePreview1 && URL.revokeObjectURL(imagePreview1.preview)
//                   }
//                 }, [imagePreview1])
            
//                 useEffect(() => {
//                   return () => {
//                       imagePreview2 && URL.revokeObjectURL(imagePreview2.preview)
//                   }
//                 }, [imagePreview2])
            
//                 useEffect(() => {
//                   return () => {
//                       imagePreview3 && URL.revokeObjectURL(imagePreview3.preview)
//                   }
//                 }, [imagePreview3])
            
//                 useEffect(() => {
//                   return () => {
//                       imagePreview4 && URL.revokeObjectURL(imagePreview4.preview)
//                   }
//                 }, [imagePreview4])
            
//                 const selectFile = (event) => {
//                     setSelectedFile1(event.target.files);
//                     const file1 = event.target.files[0];
//                     file1.preview = URL.createObjectURL(file1);
//                     setImagePreview1(file1)
//                 };
            
//                 const selectFile2 = (event) => {
//                   setSelectedFile2(event.target.files);
//                   const file2 = event.target.files[0];
//                   file2.preview = URL.createObjectURL(file2);
//                   setImagePreview2(file2)
            
//                 };
            
//                 const selectFile3 = (event) => {
//                   setSelectedFile3(event.target.files);
//                   const file3 = event.target.files[0];
//                   file3.preview = URL.createObjectURL(file3);
//                   setImagePreview3(file3)
            
//                 };
            
//                 const selectFile4 = (event) => {
//                   setSelectedFile4(event.target.files);
//                   const file4 = event.target.files[0];
//                   file4.preview = URL.createObjectURL(file4);
//                   setImagePreview4(file4)
            
//                 };
//                 const upload = () => {
//                     let currentFile1 = selectedFile1[0];
//                     setProgress1(0);
//                     setCurrentFiles(currentFile1);
//                     UploadService.upload(currentFile1, (event) => {
//                         setProgress1(Math.round((100 * event.loaded) / event.total));
//                         })
//                         .then((response) => {
//                             return setFile([...images, response.data[0]]);
//                         })
//                         .catch(() => {
//                           setProgress1(0);
//                           setCurrentFiles(undefined);
//                         })
//                     setSelectedFile1(undefined);
//                 };
            
//                 const upload2 = () => {
//                   let currentFile2 = selectedFile2[0];
//                   setProgress2(0);
//                   setCurrentFiles2(currentFile2);
//                   UploadService.upload(currentFile2, (event) => {
//                       setProgress2(Math.round((100 * event.loaded) / event.total));
//                       })
//                       .then((response) => {
//                           return setFile([...images, response.data[0]]);
//                       })
//                       .catch(() => {
//                         setProgress2(0);
//                         setCurrentFiles2(undefined);
//                       })
//                   setSelectedFile2(undefined);
//                 };
//                 const upload3 = () => {
//                   let currentFile3 = selectedFile3[0];
//                   setProgress3(0);
//                   setCurrentFiles3(currentFile3);
//                   UploadService.upload(currentFile3, (event) => {
//                       setProgress3(Math.round((100 * event.loaded) / event.total));
//                       })
//                       .then((response) => {
//                           return setFile([...images, response.data[0]]);
//                       })
//                       .catch(() => {
//                         setProgress3(0);
//                         setCurrentFiles3(undefined);
//                       })
//                   setSelectedFile3(undefined);
//                 };
//                 const upload4 = () => {
//                   let currentFile4 = selectedFile4[0];
//                   setProgress4(0);
//                   setCurrentFiles4(currentFile4);
//                   UploadService.upload(currentFile4, (event) => {
//                       setProgress4(Math.round((100 * event.loaded) / event.total));
//                       })
//                       .then((response) => {
//                           return setFile([...images, response.data[0]]);
//                       })
//                       .catch(() => {
//                         setProgress4(0);
//                         setCurrentFiles4(undefined);
//                       })
//                   setSelectedFile4(undefined);
//                 };


// const [imagePreview1, setImagePreview1] = useState([]);
// const [selectedFile1, setSelectedFile1] = useState(undefined);
// const [progress1, setProgress1] = useState(0);
// const [currentFiles, setCurrentFiles] = useState(undefined);
// const [imagePreview2, setImagePreview2] = useState([]);
// const [selectedFile2, setSelectedFile2] = useState(undefined);
// const [progress2, setProgress2] = useState(0);
// const [currentFiles2, setCurrentFiles2] = useState(undefined);
// const [imagePreview3, setImagePreview3] = useState([]);
// const [selectedFile3, setSelectedFile3] = useState(undefined);
// const [progress3, setProgress3] = useState(0);
// const [currentFiles3, setCurrentFiles3] = useState(undefined);
// const [imagePreview4, setImagePreview4] = useState([]);
// const [selectedFile4, setSelectedFile4] = useState(undefined);
// const [progress4, setProgress4] = useState(0);
// const [currentFiles4, setCurrentFiles4] = useState(undefined);
