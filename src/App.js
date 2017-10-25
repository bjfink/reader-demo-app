import React, { Component } from 'react';
import logo from './assets/images/logo.jpg';
import './App.css';

import BookList from './components/BookList';
import BookReader from './components/BookReader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBook: undefined,
    }

    this.handleBookSelected = this.handleBookSelected.bind(this);
  }

  handleBookSelected(selectedBook) {
    this.setState({ selectedBook });
  }

  render() {
    const { selectedBook } = this.state;

    return (
      <div className="App">
        <div className="headerContainer">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My Awesome Book Reader</h1>
          </header>
        </div>
        <div className="pageContainer">
          <div className="bookList">

            {!selectedBook &&
              <BookList handleBookSelected={this.handleBookSelected} />
            }

            {selectedBook &&
              <BookReader
                book={selectedBook}
                handleBookSelected={this.handleBookSelected} />
            }

          </div>
        </div>
      </div>
    );
  }
}

export default App;
