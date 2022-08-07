import s from './reg.module.scss';

import logo from "../../assets/atom.png";
import { isAuthSelector } from '../../redux/slices/auth';
import { fetchReg } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


const Reg = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const { 
    register, 
    handleSubmit, 
    formState: { errors, formState, isValid }, 
    setError ,
  } = useForm({
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        avatarURL: '',
      },
      mode: 'all',
    });
    console.log("auth", isValid);
  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchReg(values))
    console.log(data);

    if(!data.payload) {
      alert("Не удалось зарегистрироваться")
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
    <div className={s.regWrapper}>
      <div className={s.reg}>
        <img src={logo} alt="" />
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputBlock}>
            <p className={s.name}>Имя</p>
            <input 
              type="text"  
              placeholder='Имя' 
              {...register('fullName', {required: 'Укажите ваше полное имя'})}
            />
            <p>{errors.fullName?.message}</p>
          </div>
          <div className={s.inputBlock}>
            <p className={s.name}>Email</p>
            <input 
              type="email" 
              placeholder='Email' 
              {...register('email', {required: 'Укажите ваш Email'})}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={s.inputBlock}>
            <p className={s.name}>Пароль</p>
            <input 
              type="text" 
              placeholder='Пароль'
              minLength={10}
              {...register('password', {required: 'Придумайте пароль состоящий из 10 символов'})}  
            />
            <p>{errors.password?.message}</p>
          </div>
          <div className={s.inputBlock}>
            <p className={s.name}>Аватар(url)</p>
            <input 
              type='url' 
              placeholder='url' 
              {...register('avatarURL')}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className={s.buttonBlock}>
            <button disabled={!isValid} type='submit'>Создать аккаунт</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reg;