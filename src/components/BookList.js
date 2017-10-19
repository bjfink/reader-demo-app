import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BookListItem from './BookListItem';
import BookReader from './BookReader';
import IconButton from './IconButton';

import cardIcon from '../assets/images/card_icon.jpg';
import listIcon from '../assets/images/list_icon.jpg';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCardView: false,
      displayListView: true,
      selectedBook: null,
    }

    this.handleBookSelected = this.handleBookSelected.bind(this);
    this.handleToggleCardViewDisplay = this.handleToggleCardViewDisplay.bind(this);
    this.handleToggleListViewDisplay = this.handleToggleListViewDisplay.bind(this);
  }

  handleBookSelected(selectedBook) {
    this.setState({ selectedBook });
  }

  handleToggleCardViewDisplay(view) {
    this.setState({
      displayCardView: true,
      displayListView: false,
    })
  }

  handleToggleListViewDisplay(view) {
    this.setState({
      displayCardView: false,
      displayListView: true,
    })
  }

  render() {
    const { displayCardView, displayListView, selectedBook } = this.state;
    const { books } = this.props;

    return (
      <div className="bookList">

        {!selectedBook &&
          <div>
            <div className="icons">

              <IconButton
                src={cardIcon}
                alt="card"
                selected={displayCardView}
                handleClick={this.handleToggleCardViewDisplay} />

              <IconButton
                src={listIcon}
                alt="list"
                selected={displayListView}
                handleClick={this.handleToggleListViewDisplay} />

            </div>

            <div className={classnames({ 'cardView': displayCardView, listView: displayListView })}>

              {books.map(book => (
                <BookListItem
                  isCardView={displayCardView}
                  key={book.id}
                  book={book}
                  handleItemClick={this.handleBookSelected} />
              ))
              }

            </div>
          </div>
        }

        {selectedBook &&
          <BookReader
            book={selectedBook}
            handleBookSelected={this.handleBookSelected} />
        }

      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      imageUrl: PropTypes.string,
      releaseDate: PropTypes.string,
      language: PropTypes.string,
      description: PropTypes.string,

    }))
}

export default BookList;