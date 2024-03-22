import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/file";
import './profile.css'
const Profile = () => {
    const dispatch = useDispatch()
    function changeHandler (e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    return (
        <div className="profile">
            <button onClick={()=> dispatch(deleteAvatar())}  className="delete-avatar">Удалить аватар</button>
            <input accept="image/*" onChange={(e)=> changeHandler(e)} type="file" placeholder="Загрузить аватар" className="upload-avatar"/>
        </div>
    );
};

export default Profile;