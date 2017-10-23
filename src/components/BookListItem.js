import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BookListItem = ({ book: { author, description, id, imageUrl, releaseDate, language, title, }, book, isCardView, handleItemClick }) => {
  return (
    <div className="bookContainer" onClick={() => handleItemClick(book)}>

      <div className="image">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="details">
        <div>{title}<span>{releaseDate}</span></div>
        <div>by {author}</div>
        <div className={classnames({ 'hide': isCardView })}>{language}</div>
        <div className={classnames({ 'hide': isCardView })}>{description}</div>
      </div>

    </div>
  )
}

BookListItem.defaultprops = {
  book: {},
};

BookListItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  releaseDate: PropTypes.string,
  language: PropTypes.string,
  description: PropTypes.string,
  isCardView: PropTypes.bool,
};

export default BookListItem;
