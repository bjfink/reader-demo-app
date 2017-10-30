import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

export default ({  alt, className, exact, icon, src, text, to }) => {

  return (
    <Link to={to} exact={exact} className={classnames('btn', { 'icon': icon })} >
      <img src={src} alt={alt} />
      {text}
    </Link>
  )
}
