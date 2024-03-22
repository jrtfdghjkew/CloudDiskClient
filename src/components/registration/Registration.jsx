import React, {useState} from 'react';
import './registration.css'
import {Link} from "react-router-dom";
import Input from "../../utils/input/Input";
import {registration} from "../../actions/userRegistration";
const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="registration">
            <div className="registration__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <Link to="/login">
                <button onClick={()=>registration(email, password)} className="registration__btn" >
                    Войти
                </button>
            </Link>
        </div>
    );
};

export default Registration;