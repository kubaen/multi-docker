import React, {Component} from 'react';

import axios from 'axios';

class Fib extends Component {

  state = {
    seenIndexes: [],
    values: {},
    value: ''
  };

  componentDidMount() {
    this.fetchIndexes();
    this.fetchValues();
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.value
    });

    this.setState({value: ''});
  };

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({values: values});
  }

  async fetchIndexes() {
    const indexes = await axios.get('/api/values/all');
    this.setState({seenIndexes: indexes.data.rows});
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values.data) {
      entries.push(
          <div key={key}>For index {key} I calculated {this.state.values.data[key]}</div>
      );
    }
    return entries;
  }


  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Enter your index:</label>
            <input
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
            />
            <button>Submit</button>
          </form>
          <h3>Indexes I have seen:</h3>
          {this.renderSeenIndexes()}

          <h3>Calculated values</h3>
          {this.renderValues()}
        </div>

    );
  }

}

export default Fib;

