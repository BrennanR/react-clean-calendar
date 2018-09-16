// @flow

import React, { Component } from 'react';

import { Example1 } from "./examples/Example1";
import { Example2 } from "./examples/Example2";
import './App.css';

type State = {
  selectedExample: string,
}

const EXAMPLES = {
  Example1,
  Example2,
};

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedExample: Object.keys(EXAMPLES)[0] };
  }

  renderExample(exampleComponent: any) {
    const ExampleComponent = exampleComponent;
    return <ExampleComponent />;
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", }}>
        <div
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 0,
            borderRightWidth: 2,
            padding: 10,
            paddingRight: 20,
          }}
        >
        <form style={{ display: "flex", flexDirection: "column" }}>
          {
            Object.keys(EXAMPLES).map(key => (
              <div style={{ display: "flex", flexDirection: "row" }} key={key}>
                <input
                  type="radio"
                  name={key}
                  value={key}
                  checked={key === this.state.selectedExample}
                  onClick={() => this.setState({ selectedExample: key })}
                />
                <label>{key}</label>
              </div>
            ))
          }
        </form>
        </div>
        <div style={{ display: "flex", width: "100%", height: "100%", }} className="App">
          {
            this.renderExample(EXAMPLES[this.state.selectedExample])
          }
        </div>
      </div>
    );
  }
}

export default App;
