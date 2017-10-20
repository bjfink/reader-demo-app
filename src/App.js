import React from 'react';
import './App.css';
import logo from './assets/images/logo.jpg';
import BookList from './components/BookList.js';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">My Awesome Book Reader</h1>
    </header>
    <div>
      <BookList />
    </div>
  </div>
)

export default App
