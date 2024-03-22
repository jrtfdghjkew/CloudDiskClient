import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getFiles, uploadFile} from "../../actions/file";
import './disk.css'
import FileList from "./fileList/FileList";
import {setCurrentDir, setFileView, setPopupDisplay} from "../../reducers/fileReducer";
import Popup from "./Popup";
import Uploader from "./uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const loader = useSelector(state => state.app.loader)

    useEffect(()=>{
        dispatch(getFiles(currentDir, sort))// eslint-disable-next-line
    },[currentDir, sort])

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }


    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    } else {

    }
    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <div className="disk__btns__left">
                    <button onClick={()=> backClickHandler()} className="disk__back">Назад</button>
                    <button onClick={()=> dispatch(setPopupDisplay('flex'))} className="disk__create">Создать папку</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input multiple={true} onChange={(event)=> fileUploadHandler(event)} id="disk__upload-input" type="file" className="disk__upload-input"/>
                    </div>
                </div>

                <div className="disk__btns__right">
                    <select
                        value={sort}
                        onChange={(e)=>setSort(e.target.value)}
                        className="disk__select">
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                    <button className="disk__plate" onClick={()=> dispatch(setFileView('plate'))}></button>
                    <button className="disk__list"  onClick={()=> dispatch(setFileView('list'))}></button>
                </div>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;