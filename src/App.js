import React, { useEffect } from 'react';
import s from './App.module.scss';
import { Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home'
import FullPost from './pages/FullPost/FullPost'
import Login from './pages/Login/Login';
import Reg from './pages/Reg/Reg'
import CreatePost from './pages/createPost/CreatePost';
import { fetchAuthMe, isAuthSelector } from './redux/slices/auth'

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)
  
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <div className={s.App}>
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id/edit" element={<CreatePost />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
