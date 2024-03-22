import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
import Authorization from "./authorization/Authorization";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/userAuthorization";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect((e)=>{
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }       // eslint-disable-next-line
    },[])

  return (
      // <React.StrictMode>
          <BrowserRouter>
              <div className="app">
                  <Navbar/>
                  <div className="wrap">
                      {!isAuth ?
                          <Routes>
                              <Route path='/registration' element={<Registration/>}/>
                              <Route path='/login' element={<Authorization/>}/>
                              <Route
                                  path="*"
                                  element={<Navigate to="/login" replace />}
                              />
                          </Routes>
                          :
                          <Routes>
                              <Route path='/' element={<Disk/>}/>
                              <Route path='/profile' element={<Profile/>}/>
                              <Route
                                  path="*"
                                  element={<Navigate to="/" replace />}
                              />
                          </Routes>
                      }

                  </div>

              </div>
          </BrowserRouter>
      // </React.StrictMode>
  );
}

export default App;
