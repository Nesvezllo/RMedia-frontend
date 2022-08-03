import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import ReactMarkDown from 'react-markdown';

import s from './fullpost.module.scss';
import logo from "../../assets/atom.png";
import Loader from '../../components/Loader/isLoadingFullPost';


const FullPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState()

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      setIsLoading(false);
      console.log(res.data);
    }).catch(err => {
      alert("При получении статьи произошла ошибка")
    })
  }, [])

  const CreateTime = 
    data?.createdAt.substr(8, 2) 
    + data?.createdAt.substr(4, 4) 
    + data?.createdAt.substr(0, 4);

  return (
    <>
    {isLoading ? <Loader /> 
    :
    <div className={s.postWrapper}>
      <div className={s.post}>
        <div className={s.postOther}>
          <div className={s.author}>
            <img src={data.user.avatarURL ? data.user.avatarURL : logo} alt="" />
            <div className={s.info}>
              <h2>{data.user.fullName}</h2>
              <p>{CreateTime}</p>
            </div>
          </div>
          <h2>{data.title}</h2>
        </div>
      </div>
        <img className={data.imageURL ? s.img : ""} src={`${process.env.REACT_APP_API_URL}${data.imageURL}`} alt="" />
      <div className={s.text}>
          <ReactMarkDown children={data.text}></ReactMarkDown>
      </div>
    </div>  
  }
  </>
  )
};

export default FullPage;