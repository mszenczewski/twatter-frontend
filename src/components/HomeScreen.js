import React, { Component } from 'react';

export default class HomeScreen extends Component {
  render() {
    return (
      <div>
        <h2>Welcome!</h2>
        <div id="instructions">
          <h4>TODO</h4>
          <span className="num">1.</span><span className="instruction">Make better UI</span><br/>
          <span className="num">2.</span><span className="instruction">????</span><br/>
          <span className="num">3.</span><span className="instruction">Profit!</span><br/>
        </div>
      </div>
    );
  }
}
