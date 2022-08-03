import s from './style.module.scss';

import {ReactComponent as Chevron} from '../../assets/chevron.svg';
import {ReactComponent as Fire} from '../../assets/fire.svg';
import {ReactComponent as Clock} from '../../assets/clock.svg';
import {ReactComponent as Person} from '../../assets/person.svg';
import {ReactComponent as Game} from '../../assets/game.svg';
import {ReactComponent as Ball} from '../../assets/ball.svg';
import {ReactComponent as Car} from '../../assets/car.svg';
import {ReactComponent as Laptop} from '../../assets/laptop.svg';

const CategoriesBlock = ({ setNewPosts, сhangeСategory }) => {
  return (
    <div className={s.categories}>
      <ul>
        <li onClick={(e) => сhangeСategory(e) & setNewPosts(true)}>
          <Clock />
          <p>Новое</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Fire />
          <p>Популярное</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Person />
          <p>Личный блог</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Ball />
          <p>Спорт</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Laptop />
          <p>IT</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Car />
          <p>Авто</p>
          <Chevron className={s.chevron} />
        </li>
        <li onClick={(e) =>  сhangeСategory(e) & setNewPosts(false)}>
          <Game />
          <p>Видеоигры</p>
          <Chevron className={s.chevron} />
        </li>
    </ul>
  </div>
  )
}

export default CategoriesBlock;