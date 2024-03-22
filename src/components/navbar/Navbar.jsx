import React, {useState} from 'react';
import navbarLogo from "../../assets/img/navbarLogo.svg";
import './navbar.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/user-avatar.svg"
import {API_URL} from "../../config";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUserId = useSelector(state => state.user.currentUser._id)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function seacrhChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout(()=> {
                dispatch(searchFiles(e.target.value, currentUserId));
            },800))
        } else {
            dispatch(getFiles(currentDir))
        }


    }
    return (
        <div className="navbar">
            <div className="container">
                <Link className="toMainPage" to="/">
                    <img src={navbarLogo} alt="navbarLogo" className="navbar__logo"></img>
                    <div className="navbar__header">MERN CLOUD</div>
                </Link>
                {isAuth &&
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e)=> seacrhChangeHandler(e)}
                        className="navbar__search"
                        placeholder="Название файла..."/>
                }
                {!isAuth  &&
                    <div className="navbar__login">
                        <Link to="/login">Войти</Link>
                    </div>
                }
                {!isAuth  &&
                    <div className="navbar__registration">
                        <Link to="/registration">Регистрация</Link>
                    </div>
                }
                {isAuth  &&
                    <div onClick={()=>dispatch(logout())} className="navbar__registration">
                        Выход
                    </div>
                }
                {isAuth &&
                    <Link to='/profile'>
                        <img className="user-avatar" alt="user-avatart" src={avatar}  />
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;