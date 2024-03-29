import React, { Component } from 'react';
import Axios from 'axios';
import ItemCard from './ItemCard'

export default class ItemScreen extends Component {
  state = {
    id: '',
    response: '',
    card_show: false,
    card_item: '',
    card_response: ''
  };

  id_change = e => {this.setState({id: e.target.value});};

  show_card = () => {
    this.setState({card_show: true});
    this.setState({card_response: ''});
    this.setState({response: ''});
  }

  hide_card = () => {
    this.setState({card_show: false});
    this.setState({card_response: ''});
  }

  set_card_response = (res) => {
    this.setState({card_response: res});
  }

  delete_done = () => {
    this.hide_card();
    this.setState({response: 'Tweet successfully deleted!'});
  }

  submit = async e => {
    e.preventDefault();

    if (this.state.id === '') {
      this.setState({response: 'no item entered'});
      this.hide_card();
      return;
    }

    try {
      const res = await Axios.get('/item/' + this.state.id);
      console.log('ITEM RESPONSE: ' + JSON.stringify(res.data, null, 2));
      this.hide_card();
      if (res.data.status === 'OK') {
        this.setState({card_item: res.data.item});
        this.show_card();
      }
    } catch (err) {
      console.log('ITEM ERROR: ' + err);
      this.setState({response: err.response.data.error});
    }
  };

  render() {
    return (
      <div>
        <h2>Item</h2>
        <form onSubmit={this.submit}>
          <label htmlFor="idInput">ID:</label>
          <input
            id="id"
            onChange={this.id_change}
            type="text"
            value={this.state.id}
            />
          <button className="submit_button">Submit</button>
        </form>
        <h3>{this.state.response}</h3>
        {this.state.card_show ? 
          <ItemCard 
            item={this.state.card_item} 
            delete_done={this.delete_done} 
            set_response={this.set_card_response}
            />
          : null}
        <h3>{this.state.card_response}</h3>
      </div>
    );
  }
}