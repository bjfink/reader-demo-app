import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BookListItem from './BookListItem';
import BookReader from './BookReader';
import IconButton from './IconButton';
import SearchBar from './SearchBar';

import cardIcon from '../assets/images/card_icon.jpg';
import listIcon from '../assets/images/list_icon.jpg';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      displayCardView: false,
      displayListView: true,
      filteredBooks: [],
      selectedBook: null,
    }

    this.handleBookSelected = this.handleBookSelected.bind(this);
    this.handleSetFilter = this.handleSetFilter.bind(this);
    this.handleToggleCardViewDisplay = this.handleToggleCardViewDisplay.bind(this);
    this.handleToggleListViewDisplay = this.handleToggleListViewDisplay.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/booklist')
      .then(response => response.json())
      .then(books => this.setState({ books, filteredBooks: books }))
      .catch(function (ex) {
        console.log('error getting books', ex)
      });
  }

  handleBookSelected(selectedBook) {
    this.setState({ selectedBook });
  }

  handleSetFilter(term) {
    if (term) {
      const lowerTerm = term.toLowerCase();
      const filteredBooks = this.state.books.filter(book => {
        const title = book.title.toLowerCase();
        return title.indexOf(lowerTerm) !== -1;
      });
      this.setState({ filteredBooks });
    }
    else {
      this.setState({ filteredBooks: this.state.books });
    }
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
    const { displayCardView, displayListView, filteredBooks, selectedBook } = this.state;

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

            <SearchBar handleSetFilter={this.handleSetFilter} />

            <div className={classnames({ 'cardView': displayCardView, listView: displayListView })}>

              {filteredBooks.map(book => (
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