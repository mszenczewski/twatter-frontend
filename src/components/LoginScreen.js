import React, { Component } from 'react';
import Axios from 'axios';

export default class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    response: ''
  };

  username_change = e => {this.setState({username: e.target.value});};
  password_change = e => {this.setState({password: e.target.value});};

  submit = async e => {
    e.preventDefault();

    const json = {username: this.state.username, password: this.state.password};

    try {
      const res = await Axios.post('/login', json);
      console.log('LOGIN RESPONSE: ' + JSON.stringify(res.data, null, 2));
      if (res.data.status === 'OK') this.setState({response: 'Successfully logged in!'});
    } catch (err) {
      console.log('LOGIN ERROR: ' + err);
      this.setState({response: err.response.data.error});
    }
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.submit}>
          <div>
            <label htmlFor="usernameInput">Username: </label>
            <input
              id="usernameInput"
              onChange={this.username_change}
              type="text"
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor="passwordInput">Password: </label>
            <input
              id="passwordInput"
              onChange={this.password_change}
              type="password"
              value={this.state.password}
            />
          </div>
          <button className="submit_button">Login</button>
        </form>
        <h3>{this.state.response}</h3>
      </div>
    );
  }
}
