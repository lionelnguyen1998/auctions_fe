import React, { Fragment, useState, useEffect } from 'react';
import contactApi from '../api/contactApi';
import './index.css';
import { useNavigate } from 'react-router-dom';
import UploadService from "../services/FileUploadService";

function Contacts() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [imagePreview, setImagePreview] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [typeReport, setType] = useState('');
    const [content, setContent] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageName, setMessageName] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleContact = (e) => {
        e.preventDefault();
        setMessageEmail("");
        setMessagePhone("");
        setMessageName("")
        setMessageContent("");
        setMessageType("")
        contactApi.contactUs(
          name,
          email,
          phone,
          content,
          file,
          typeReport
        ).then(
            () => {
                navigate("/");
                window.location.reload();
              },
              (error) => {
                const errors = error.response.data.errors
                setMessageName(errors.name);
                setMessageEmail(errors.email);
                setMessagePhone(errors.phone);
                setMessageContent(errors.content);
                setMessageType(errors.report_type)
              }
        );
    }

    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview.preview)
        }
    }, [imagePreview])

    const selectFile = (event) => {
        setSelectedFile(event.target.files);
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImagePreview(file)
      };

    const upload = () => {
        let currentFile = selectedFile[0];
        UploadService.upload(currentFile)
            .then((response) => {
                return setFile(response.data);
              })
        setSelectedFile(undefined);
      };

    return (
        <Fragment>
            <div className="footer__widget col-md-12">
                <form
                    method="POST"
                    target="_blank"
                    onSubmit={handleContact}>
                    <div className="mb-3 pt-0">
                        <select
                        name="report_type"
                        onChange={e => setType(e.target.value)}
                        >
                            <option value="">Chọn loại thông báo</option>
                            <option value="1">Lỗi hệ thống</option>
                            <option value="2">Cách sử dụng</option>
                            <option value="3">Khác</option>
                        </select>
                        {messageType && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messageType}
                            </label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 pt-0">
                        <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        onChange={e => setName(e.target.value)}
                        />
                        {messageName && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messageName}
                            </label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 pt-0">
                        <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        onChange={e => setEmail(e.target.value)}
                        />
                        {messageEmail && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messageEmail}
                            </label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 pt-0">
                        <input
                        type="text"
                        placeholder="phone"
                        name="phone"
                        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        onChange={e => setPhone(e.target.value)}
                        />
                        {messagePhone && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messagePhone}
                            </label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 pt-0">
                        <textarea
                        placeholder="Your message"
                        name="content"
                        className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        onChange={e => setContent(e.target.value)}
                        />
                        {messageContent && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messageContent}
                            </label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 pt-0">
                        <input
                            type="file"
                            placeholder="File"
                            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                            onChange={selectFile}
                        />
                        {
                            <input hidden name="file" value={file}/>
                        }
                        <button
                            className="site-btn button2"
                            disabled={!selectedFile}
                            onClick={upload}
                            >
                            Upload File
                        </button>
                        {
                            imagePreview && (
                                <img src={imagePreview.preview} alt="" width="80%"/>
                            )
                        }
                    </div>
                    <div className="mb-3 pt-0">
                        <button className="site-btn button1">
                            <span>Send</span>
                        </button>
                    </div>
                    
                </form>
                <div className="google-map-code">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14898.763660245146!2d105.83685507841687!3d21.00502340917457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5569f4fbf1%3A0x5bf30cadcd91e2c3!2zQ-G7lW5nIFRy4bqnbiDEkOG6oWkgTmdoxKlhIC0gxJDhuqFpIEjhu41jIELDoWNoIEtob2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1645605534507!5m2!1svi!2s" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                </div>
                
            </div>
        </Fragment>
    )
}

export default Contacts;