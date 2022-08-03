import s from './style.module.scss';

import React from 'react'

const Categories = ({ setCategoryId, categories, category }) => {
  const [open, setOpen] = React.useState(false)
  const onClickOpen = () => {
    setOpen(!open)
  }
  return (
    <div className={s.categories}>
          <ul onClick={onClickOpen}>
            <h3>Выбор категории:</h3>
            <li>{category}</li>
            {open && 
            categories && categories.map((name, i) => (
              <li key={i} onClick={() => setCategoryId(i)}>{name}</li>
            ))}
          </ul>
    </div>
  )
}

export default Categories;