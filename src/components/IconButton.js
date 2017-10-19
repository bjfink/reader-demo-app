import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const IconButton = ({ alt, handleClick, selected, src }) => {
  return (
    <div className={classnames('btn icon', { 'selected': selected })}>
      <button onClick={handleClick}>
        <img src={src} alt={alt} />
      </button>
    </div>
  )
}

IconButton.propTypes = {
  alt: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
}

export default IconButton;