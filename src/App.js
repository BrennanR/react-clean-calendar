// @flow

import React, { Component } from 'react';

import { Example1 } from './examples/Example1';
import { Example2 } from './examples/Example2';
import { Example3 } from './examples/Example3';
import { Example4 } from './examples/Example4';
import { Example5 } from './examples/Example5';
import './App.css';

type State = {
  selectedExample: string,
};

const EXAMPLES = {
  Example1,
  Example2,
  Example3,
  Example4,
  Example5,
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
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 0,
            borderRightWidth: 2,
            padding: 10,
            paddingRight: 20,
          }}
        >
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(EXAMPLES).map(key => (
              <div style={{ display: 'flex', flexDirection: 'column' }} key={key}>
                <label style={{ display: 'flex', flexDirection: 'row' }}>
                  <input
                    type="radio"
                    name={key}
                    value={key}
                    checked={key === this.state.selectedExample}
                    onClick={() => this.setState({ selectedExample: key })}
                  />
                  {key}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center' }} className="App">
          {this.renderExample(EXAMPLES[this.state.selectedExample])}
        </div>
      </div>
    );
  }
}

export default App;
