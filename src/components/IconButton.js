import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const IconButton = ({ alt, handleClick, selected, src }) => {
  return (
    <button onClick={handleClick} className={classnames('btn icon', { 'selected': selected })}>
      <img src={src} alt={alt} />
    </button>
  )
}

IconButton.propTypes = {
  alt: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
}

export default IconButton;
