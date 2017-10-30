import React, { Component } from 'react';
import logo from './assets/images/logo.jpg';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BookList from './components/BookList';
import BookReader from './components/BookReader';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <div className="headerContainer">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">My Awesome Book Reader</h1>
            </header>
          </div>

          <div className="pageContainer">
            <div className="bookList">

              <Route path='/' component={BookList} exact={true} />
              <Route path='/reader/:bookId' component={BookReader} exact={true}  />
              <Route path={'/reader/:bookId/:chapterId'} component={BookReader} exact={true} />

            </div>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
