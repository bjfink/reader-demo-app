import React, { Component } from 'react'
import PropTypes from 'prop-types';
import searchIcon from '../assets/images/search.svg';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    }

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange(e) {
    const term = e.target.value;
    this.setState({ term });
    this.props.handleSetFilter(term);
  }

  render() {
    return (
      <div className="search">
        <img src={searchIcon} alt="Search"/>
        <input onChange={this.handleSearchTermChange} value={this.state.term} placeholder="Search..." />
      </div>
    )
  }
}

SearchBar.protoTypes = {
  handleSetFilter: PropTypes.func,
}
