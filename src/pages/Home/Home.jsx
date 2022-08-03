import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from  'react-loader-spinner'

import s from './home.module.scss';

import Post from '../../components/Post/Post';
import CategoriesBlock from '../../components/CategoriesBlock/CategoriesBlock'
import { fetchPosts } from '../../redux/slices/posts';


const Home = () => {
  const [category, setCategory] = React.useState('');
  const [newPosts, setNewPosts] = React.useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data)
  const { posts } = useSelector(state => state.posts);
  const sortedPosts = newPosts ? posts.items : posts.items?.slice().sort((posts, post) => post.viewsCount - posts.viewsCount);

  
  const filteredPosts = sortedPosts?.filter(post => {
      if(post.category.includes(category)) {
        return true;
      } else if(category == 'Популярное') {
        return sortedPosts;
      } if (category == 'Новое') {
        return post;
      }
      else {
        return false;
      }
      
    })
  
    const сhangeСategory = (e) => {
      setCategory(e.currentTarget.innerText);
    }

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const isPostsLoading = posts.status == 'loading';

  return (
    <div className={s.wrapper}>
      <CategoriesBlock setNewPosts={setNewPosts} сhangeСategory={(e) => сhangeСategory(e)} />
      <div className={s.posts}>
        {isPostsLoading ? 
        <TailSpin  color="#00BFFF" width={864} />
          : filteredPosts?.map((post, index) => (
            <Post 
              key={post._id}
              id={post._id} 
              title={post.title} 
              text={post.text} 
              user={post.user}
              tags={post.tags} 
              views={post.viewsCount}
              createdAt={post.createdAt}
              category={post.category}
              setCategory={setCategory}
              img={post.imageURL ? `${process.env.REACT_APP_API_URL}${post.imageURL}` : ''} 
              isEditable={userData && userData?._id == post.user._id}
            />
        ))
        }
      </div>
    </div>  
  )
}

export default Home;