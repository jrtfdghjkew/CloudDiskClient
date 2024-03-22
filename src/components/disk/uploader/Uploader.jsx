import React from 'react';
import './uploader.css'
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";
const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <div className="uploader__close" onClick={() => dispatch(hideUploader())}>X</div>
            </div>
            {files.map(file=>
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;