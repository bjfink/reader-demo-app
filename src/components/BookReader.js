import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';
import TableOfContents from './TableOfContents';
import returnIcon from '../assets/images/back.svg';
import sorryNoContent from '../assets/images/sorry-no-content.jpg';

export default class BookReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookId: props.book.id,
      chapters: [],
      selectedChapter: {},
    }

    this.handleReturnToBookList = this.handleReturnToBookList.bind(this);
    this.handleSelectChapter = this.handleSelectChapter.bind(this);
  }

  componentDidMount() {
    const { book: { id } } = this.props;

    fetch(`http://localhost:3001/bookContents/${id}`)
      .then(response => response.json())
      .then(bookContents => {
        const chapters = bookContents && bookContents.chapters ? bookContents.chapters : [];
        const selectedChapter = chapters.length > 0 ? chapters[0] : null;

        this.setState({ chapters, selectedChapter })
      })
      .catch(function (ex) {
        console.log('error getting books', ex)
      });
  }

  componentWillReceiveProps = (nextProps) => {
    const { bookId } = this.state;

    if (bookId !== nextProps.book.id) {
      const { chapters, selectedChapter } = this.getChapters(bookId);

      this.setState({ bookId, chapters, selectedChapter })
    }
  }

  handleSelectChapter(id) {
    const selectedChapter = this.state.chapters.find(item => item.id === id);
    this.setState({ selectedChapter });
  }

  handleReturnToBookList() {
    this.props.handleBookSelected(null);
  }

  render() {
    const { chapters, selectedChapter } = this.state;
    const { book: { title } } = this.props;
    return (
      <div>
        <h2>{title}</h2>

        <IconButton
          src={returnIcon}
          alt="return to book list"
          handleClick={this.handleReturnToBookList} />

        {!!chapters.length &&
          <div className="readerContainer">
            <TableOfContents
              chapters={chapters}
              handleSelectChapter={this.handleSelectChapter}
              selectedChapterId={selectedChapter.id}
            />
            <div className="chapterContent">
              <h3>{selectedChapter.title}</h3>
              <div className="text" dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
            </div>
          </div>
        }
        {!chapters.length &&
          <div>
            <h2>Sorry this book currently doesn't have any content.</h2>
            <img src={sorryNoContent} alt="Hugs" />
          </div>
        }
      </div>
    )
  }

  static propTypes = {
    book: PropTypes.shape(),
    chapters: PropTypes.shape()
  }
}
