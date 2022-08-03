import s from './login.module.scss';

import logo from "../../assets/atom.png";
import { fetchLogin, isAuthSelector } from '../../redux/slices/auth';

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)
  const { 
    register, 
    handleSubmit, 
    formState: { errors, formState }, 
    setError ,
  } = useForm({
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'all',
    });
    console.log("auth", isAuth);
  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values))
    console.log(data);

    if(!data.payload) {
      alert("Не удалось войти в аккаунт")
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не удалось авторизоваться')
    }
  };

  if(isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.loginWrapper}>
      <div className={s.login}>
        <img src={logo} alt="" />
        <h1>Войти</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputBlock}>
            <p>Email</p>
            <input 
              type="email" 
              placeholder='Email'
              {...register('email', {required: 'Укажите почту'})} 
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={s.inputBlock}>
            <p>Пароль</p>
            <input 
              type="text" 
              placeholder='Пароль' 
              {...register('password', {required: 'Укажите пароль'})}
            />
            <p>{errors.password?.message}</p>
          </div>
          <div className={s.buttonBlock}>
            <button type='submit'>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;