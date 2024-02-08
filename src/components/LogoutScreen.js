import React, { Component } from 'react';
import axios from 'axios';

export default class LogoutScreen extends Component {
  state = {
    response: ''
  };

  submit = e => {
    e.preventDefault();

    axios
      .post('/logout')
      .then(res => {
        console.log('LOGOUT RESPONSE: ' + JSON.stringify(res.data, null, 2));

        if (res.data.status === 'OK') {
          this.props.history.push('/twatter/');          
        } else {
          this.setState({response: res.data.error}); 
        }
      })
      .catch(err => {
        console.log('LOGOUT ERROR: ' + err);
      });
  };

  render() {
    return (
      <div>
        <h2>Logout</h2>
        <form onSubmit={this.submit}>
          <button className="submit_button">Confirm</button>
        </form>
        <h3>{this.state.response}</h3>
      </div>
    );
  }
}
