import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import './authorization.css'
import {authorization} from "../../actions/userAuthorization";
import {useDispatch} from "react-redux";

const Authorization = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div className="authorization">
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
                <button onClick={()=>dispatch(authorization(email,password))} className="authorization__btn">Войти</button>
        </div>
    );
};

export default Authorization;