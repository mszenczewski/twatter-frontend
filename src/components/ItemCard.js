import React, { Component } from 'react';
import Axios from 'axios';
import {SERVER_URL} from "../server_url";

export default class ItemCard extends Component {
  state = {
    response: ''
  }

  delete = e => {
    e.preventDefault();

    Axios
      .delete(`${SERVER_URL}/item/` + this.props.item.id)
      .then(res => {
        console.log('ITEMCARD RESPONSE: ' + JSON.stringify(res.data, null, 2));
        this.props.delete_done();
      })
      .catch(err => {
        console.log('ITEMCARD ERROR: ' + err);
        this.setState({response: err.response.data.error});
      });
  };

  setlike = (e, is_liked) => {
    e.preventDefault();
    this.send_post(is_liked).then();
  };

  send_post = async (is_liked) => {
    try {
      const res = await Axios.post(`${SERVER_URL}/item/${this.props.item.id}/like`, {like: is_liked});
      console.log('LIKE RESPONSE: ' + JSON.stringify(res.data, null, 2));
      const msg = `Successfully ${is_liked ? 'liked' : 'unliked'} tweet!`;
      if (res.data.status === 'OK') this.props.set_response(msg);
    } catch (err) {
      console.log('LIKE ERROR: ' + err);
      this.props.set_response(err.response.data.error);
    }
  };

  render() {
    return (
      <div className="content_card">  
        <h3>{this.props.item.content}</h3>
        <h4>{this.props.item.username}</h4>
        <div className="tweet_button_container">
          <button onClick={(e) => this.setlike(e, true)}>Like</button>
          <button onClick={(e) => this.setlike(e, false)}>Unlike</button>
          <button className="tweet_button" onClick={this.delete}>Delete</button>
        </div>
        <h3>{this.state.response}</h3>
      </div>
    );
  }
}
