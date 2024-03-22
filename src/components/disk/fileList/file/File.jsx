import React from 'react';
import './file.css'
import fileLogo from '../../../../assets/img/file.svg'
import dirLogo from '../../../../assets/img/direc.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(event) {
        event.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(event) {
        event.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(fileView === 'plate') {
        return (
            <div onClick={()=> openDirHandler(file)} key={file.id} className='file-plate'>
                <img src={file.type === 'dir' ? dirLogo : fileLogo } alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)} className="file-plate__btn-download">download</button>}
                    <button onClick={(event)=> deleteClickHandler(event)} className="file-plate__btn-delete">delete</button>
                </div>
            </div>
        );
    }

    if(fileView === 'list') {
        return (
            <div onClick={()=> openDirHandler(file)} key={file.id} className='file'>
                <img src={file.type === 'dir' ? dirLogo : fileLogo } alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0,10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)} className="file__btn-download">download</button>}
                <button onClick={(event)=> deleteClickHandler(event)} className="file__btn-delete">delete</button>
            </div>
        );
    }


};

export default File;