import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 0, value: 1 },
      { id: 1, value: 1 },
      { id: 2, value: 1 },
      { id: 3, value: 1 },
    ],
  };
  add = (id) => {
    const new_counters = [...this.state.counters];
    new_counters.forEach((info) => {
      if (info.id === id) info.value++;
    });
    this.setState({ counters: new_counters });
  };
  delete = (id) => {
    const new_counters = this.state.counters.filter((info) => info.id !== id);
    this.setState({ counters: new_counters });
  };
  reset = () => {
    const new_counters = [...this.state.counters];
    new_counters.forEach((info) => {
      info.value = 0;
    });
    this.setState({ counters: new_counters });
  };
  sum = () => {
    return this.state.counters.reduce((a, b) => a + b.value, 0);
  };
  render() {
    return (
      <React.Fragment>
        <span className="badge m-1 bg-secondary">{this.sum()}</span>
        <button className="btn btn-danger m-1" onClick={this.reset}>
          reset
        </button>
        {this.state.counters.map((info) => (
          <Counter
            key={info.id}
            onDelete={this.delete}
            onAdd={this.add}
            info={info}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
