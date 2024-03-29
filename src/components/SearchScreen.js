import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import SearchResults from './SearchResults';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    let t = Math.floor(d.getTime() / 1000); 

    this.state = {
      current_timestamp: t,
      timestamp: '',
      limit: '',
      following: false,
      username: '',
      response: '',
      results: [],
      results_show: false
    }
  }

  tick() {
    this.setState(prevState => ({
      current_timestamp: prevState.current_timestamp + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  show_results = () => {this.setState({results_show: true});}
  hide_results = () => {this.setState({results_show: false});}

  timestamp_change = e => {this.setState({timestamp: e.target.value});};
  limit_change = e => {this.setState({limit: e.target.value});};
  query_change = e => {this.setState({query: e.target.value});};
  following_change = e => {this.setState({following: e.target.checked});};
  username_change = e => {this.setState({username: e.target.value});};

  submit = e => {
    e.preventDefault();

    this.hide_results();

    const json = {};

    if (this.state.timestamp !== '') json.timestamp = this.state.timestamp;
    if (this.state.limit !== '') json.limit = this.state.limit;
    if (this.state.query !== '') json.q = this.state.query;
    if (this.state.following !== '') json.following = this.state.following;
    if (this.state.username !== '') json.username = this.state.username;
    
    axios
      .post('/search', json)
      .then(res => {
        console.log('SEARCH RESPONSE: ' + JSON.stringify(res.data, null, 2));

        if (res.data.status === 'OK') {
          this.setState({response: ''});
          this.setState({results: res.data});
          this.show_results();   
        } else {
          this.setState({response: res.data.error});
          this.setState({results: []}); 
        }
      })
      .catch(err => {
        console.log('SEARCH ERROR: ' + err);
      });
  };

  render() {
    return (
      <div>
        <h2>Search</h2>
        <div id="timestamp_box">        
          <h3 id="timestamp">Current Timestamp: {this.state.current_timestamp}</h3>
          <CopyToClipboard text={this.state.current_timestamp}>
              <button>Copy</button>
          </CopyToClipboard>
        </div>
        <form onSubmit={this.submit}>
            <label htmlFor="timestampInput">Timestamp: </label>
            <input
              id="timestampInput"
              onChange={this.timestamp_change}
              type="text"
              value={this.state.timestamp}
            />
            <label htmlFor="limitInput">Limit: </label>
            <input
              id="limitInput"
              onChange={this.limit_change}
              type="text"
              value={this.state.limit}
            />
            <label htmlFor="usernameInput">Username: </label>
            <input
              id="usernameInput"
              onChange={this.username_change}
              type="text"
              value={this.state.username}
            />
            <label htmlFor="queryInput">Query: </label>
            <input
              id="queryInput"
              onChange={this.query_change}
              type="text"
              value={this.state.query}
            />
            <label htmlFor="followingInput">Following: </label>
            <input 
              id="followingInput"
              onChange={this.following_change}
              type="checkbox"
              value={this.state.query}
            />
          <button className="submit_button">Submit</button>
        </form>
        <h3>{this.state.response}</h3>
        {this.state.results_show ? <SearchResults items={this.state.results.items}/> : null}
      </div>
    );
  }
}
