import s from './post.module.scss';

import {ReactComponent as Delete} from '../../assets/delete.svg'
import {ReactComponent as Pen} from '../../assets/pencil.svg'
import logo from "../../assets/atom.png";

import {ReactComponent as View} from "../../assets/view.svg";
import { fetchRemovePost } from '../../redux/slices/posts'

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const Post = ({ 
  id,
  title, 
  user, 
  views, 
  img, 
  isEditable, 
  createdAt,
  category,
  setCategory
}) => {
  const dispatch = useDispatch();


  const onClickRemove = () => {
    if(window.confirm('Вы действительно хотите удалить пост?')) {
      dispatch(fetchRemovePost(id))
    }
  }
  const changeCategory  = (e) => {
    setCategory(e.currentTarget.innerHTML)
  }

  const CreateTime = 
    createdAt.substr(8, 2) 
    + createdAt.substr(4, 4) 
    + createdAt.substr(0, 4);

  return (
      <div className={s.block}>
        <>
          {isEditable && 
            <div className={s.editable}>
            <Link to={`/post/${id}/edit`}><Pen /></Link>
            <Delete className={s.close} onClick={onClickRemove}/>
            </div>
          }
          <Link to={`/post/${id}`}>
            <img className={img ? s.img : ""} src={img} alt="" />
          </Link>
          <a onClick={(e) => changeCategory(e)} className={img ? s.category : s.withoutImg}>{category}</a>
        </>
          <div className={s.blockContent}>
            <Link to={`/post/${id}`} className={s.title}>{title}</Link>
            <div className={s.head}>
              <div className={s.author}>
                <img src={user.avatarURL ? user.avatarURL : logo} alt="" />
                <div className={s.info}>
                  <h2>{user.fullName}</h2>
                  <p>{CreateTime}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={s.other}>
            <div className={s.view}>
              <View />
              <p>{views}</p>
            </div>
          </div>
      </div>
  )
}

export default Post;