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

const shortDescriptionStyle = { padding: 0, margin: 0, marginLeft: 30, marginBottom: 15, marginTop: 5 };

const EXAMPLES = {
  Example1: {
    component: Example1,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>paging</li>
        <li>weekday labels</li>
        <li>today indicator</li>
        <li>clickable</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'en-us' calendar with Sunday as its first day of the week."}</li>
        <li>
          {"It's using the default heading component that's included with the library in "}
          <i>defaults/DefaultHeading.js.</i>
        </li>
        <li>
          {"It's using the "} <i>localizedWeekdayNames</i> {' function from '} <i>util/localizeDate</i>
          {' to display a properly localized weekday heading.'}
        </li>
        <li>
          The calendar has a simple <i>onDayPress</i> implementation that highlights cells yellow.
        </li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example1.js">Source</a>
        </li>
      </ul>
    ),
  },
  Example2: {
    component: Example2,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>french (fr-ca)</li>
        <li>paging</li>
        <li>weekday labels</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'fr-ca' calendar with Sunday as its first day of the week."}</li>
        <li>
          {"It's using the default heading component that's included with the library in "}
          <i>defaults/DefaultHeading.js.</i>
        </li>
        <li>
          {"It's using the "} <i>localizedWeekdayNames</i> {' function from '} <i>util/localizeDate</i>
          {' to display a properly localized weekday heading.'}
        </li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example2.js">Source</a>
        </li>
      </ul>
    ),
  },
  Example3: {
    component: Example3,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>no paging</li>
        <li>no labels</li>
        <li>no borders</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'en-ca' calendar with Sunday as its first day of the week."}</li>
        <li>No day heading or calendar heading is used.</li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example3.js">Source</a>
        </li>
      </ul>
    ),
  },
  Example4: {
    component: Example4,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>two calendars</li>
      </ul>
    ),
    description: (
      <ul>
        <li>
          {"This is an example of two side-by-side 'en-ca' calendars with Sunday as their first day of the week."}
        </li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example4.js">Source</a>
        </li>
      </ul>
    ),
  },
  Example5: {
    component: Example5,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>starts Monday</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'en-ca' calendar."}</li>
        <li>Notably, the first day of the week on this calendar is Monday.</li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example5.js">Source</a>
        </li>
      </ul>
    ),
  },
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
            width: 200,
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
                    onChange={() => this.setState({ selectedExample: key })}
                  />
                  {key}
                </label>
                <div>{EXAMPLES[key].shortDescription}</div>
              </div>
            ))}
          </form>
        </div>
        <div
          style={{ display: 'flex', flexDirection: `column`, width: '100%', height: '100%', justifyContent: 'center' }}
          className="App"
        >
          <div style={{ marginTop: 10, marginBottom: 5 }}>{EXAMPLES[this.state.selectedExample].description}</div>
          <hr style={{ width: '100%' }} />
          {this.renderExample(EXAMPLES[this.state.selectedExample].component)}
        </div>
      </div>
    );
  }
}

export default App;
