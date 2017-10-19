import React, { Component } from 'react';
import './App.css';
import logo from './assets/images/logo.jpg';
import BookList from './components/BookList.js';

import { bookList } from './sampleData/db.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: bookList,
      filteredBooks: bookList,
    }
  }

  render() {
    const { filteredBooks } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Awesome Book Reader</h1>
        </header>
        <div>
          <BookList books={filteredBooks} />
        </div>
      </div>
    );
  }
}

export default App;
