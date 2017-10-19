import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';
import TableOfContents from './TableOfContents';
import returnIcon from '../assets/images/return_icon.jpg'

import { bookContents } from '../sampleData/db.json';

export default class BookReader extends Component {
  constructor(props) {
    super(props);

    const { chapters, selectedChapter } = this.getChapters(props.book.id);

    this.state = {
      bookId: props.book.id,
      chapters,
      selectedChapter,
    }

    this.handleReturnToBookList = this.handleReturnToBookList.bind(this);
    this.handleSelectChapter = this.handleSelectChapter.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    const { bookId } = this.state;

    if (bookId !== nextProps.book.id) {
      const { chapters, selectedChapter } = this.getChapters(bookId);

      this.setState({ bookId, chapters, selectedChapter })
    }
  }

  getChapters(bookId) {
    const contents = bookContents.find(item => item.bookId === bookId);
    const chapters = contents && contents.chapters ? contents.chapters : [];
    const selectedChapter = chapters.length > 0 ? chapters[0] : null;

    return {
      chapters,
      selectedChapter,
    }
  }

  handleSelectChapter(id) {
    const selectedChapter = this.state.chapters.find(item => item.id === id);
    this.setState({ selectedChapter });
  }

  handleReturnToBookList(){
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
          <div>
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
          <h2>This book currently doesn't have any content.</h2>
        }
      </div>
    )
  }

  static propTypes = {
    book: PropTypes.shape(),
    chapters: PropTypes.shape()
  }
}
