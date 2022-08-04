import React, { useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from '../../axios'
import { useNavigate , Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


import s from './style.module.scss';
import Categories from '../../components/Category/Categories'


const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const inputRef = React.useRef(null)
  const categories = useSelector((state) => state.posts.categories)

  const isEditing = Boolean(id)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('')
  const [imageURL, setImageUrl] = React.useState('')
  const [categoryId, setCategoryId] = React.useState(0)
  const category = categories[categoryId]
  console.log(category);



  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file)
      const { data } = await axios.post("/uploads", formData)
      setImageUrl(data.url)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        imageURL,
        category,
      };
      console.log(category);
      const {data} = isEditing 
      ? await axios.patch(`/posts/${id}`, fields) 
      : await axios.post("/posts", fields);
    

      navigate("/")
    } catch (error) {
      alert("Ошибка при создании статьи")
    }
  }

  useEffect(() => {
    if(id) {
      axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageURL)
      })
    }
    
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  return (
    <div style={{ padding: 30 }}>
      <div className={s.head}>
        <div className={s.page}>
          <button onClick={() => inputRef.current.click()}>Загрузить превью</button>
          <input ref={inputRef} type="file" onChange={handleChangeFile} hidden/>
          {imageURL && <button onClick={onClickRemoveImage}>Удалить</button>}
        </div>
        <Categories 
          setCategoryId={(i) => setCategoryId(i)} 
          categories={categories} 
          category={category} />
      </div>
      {imageURL && (
        <>
          <img className={s.image} src={`${process.env.REACT_APP_API_URL}${imageURL}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <input
        className={s.inputTitle}
        placeholder="Заголовок статьи..."
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <SimpleMDE className={s.editor} value={text} onChange={onChange} options={options} />
      <div className={s.buttons}>
        <button className={s.button} onClick={onSubmit}>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </button>
        <a href="/">
          <button className={s.button_cancel}>Отмена</button>
        </a>
      </div>
    </div>
  );
};

export default CreatePost;