import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LinkButton from './LinkButton';
import TableOfContents from './TableOfContents';
import returnIcon from '../assets/images/back.svg';
import loading from '../assets/images/loading.gif';
import sorryNoContent from '../assets/images/sorry-no-content.jpg';

export default class BookReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      initialized: false,
      chapters: [],
      selectedChapter: {},
    }

    this.handleReturnToBookList = this.handleReturnToBookList.bind(this);
    this.handleSelectChapter = this.handleSelectChapter.bind(this);
  }

  componentDidMount() {
    const { bookId, chapterId } = this.props.match.params;

    fetch(`http://localhost:3006/bookList/${bookId}`)
      .then(response => response.json())
      .then(book => {
        this.setState({ book: book || {} })
      })
      .catch(function (ex) {
        console.log('error getting book', ex)
      });

    fetch(`http://localhost:3006/bookContents/${bookId}`)
      .then(response => response.json())
      .then(bookContents => {
        const chapters = bookContents && bookContents.chapters ? bookContents.chapters : [];
        let selectedChapter = chapters.length > 0 ? chapters[0] : {};

        if (chapters && chapterId) {
          selectedChapter =  chapters[chapterId] || selectedChapter;
        }

        this.setState({ chapters, initialized: true, selectedChapter })
      })
      .catch(function (ex) {
        console.log('error getting book contents', ex)
      });
  }


  componentWillReceiveProps(nextProps) {
    const selectedChapterId = this.state.selectedChapter.id;
    const nextSelectedChaopterId = parseInt(nextProps.match.params.chapterId);

    if (selectedChapterId != nextSelectedChaopterId) {
      this.handleSelectChapter(nextSelectedChaopterId);
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
    const { book: { title }, chapters, initialized, selectedChapter } = this.state;
    const { match } = this.props;

    return (
      <div>
        {!initialized &&
          <div className="loadingContainer">
            <img src={loading} alt="loading" />
          </div>
        }
        {initialized &&
          <div>
            <h2>{title}</h2>

            <LinkButton
              src={returnIcon}
              alt="return to book list"
              to={'/'}
              icon
            />

            {!!chapters.length &&
              <div className="readerContainer">
                <TableOfContents
                  baseUrl={match.url}
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
        }
      </div>
    )
  }

  static propTypes = {
    book: PropTypes.shape(),
    chapters: PropTypes.shape()
  }
}
