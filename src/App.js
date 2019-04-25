// @flow

import React, { Component } from 'react';
import { navigate, Link, Location, Router } from '@reach/router';

import { Example1 } from './examples/Example1';
import { Example2 } from './examples/Example2';
import { Example3 } from './examples/Example3';
import { Example4 } from './examples/Example4';
import { Example5 } from './examples/Example5';
import { Example6 } from './examples/Example6';
import { Example7 } from './examples/Example7';
import './App.css';

const shortDescriptionStyle = { padding: 0, margin: 0, marginLeft: 30, marginBottom: 15, marginTop: 5 };

const EXAMPLES = {
  Example1: {
    component: Example1,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>today indicator</li>
        <li>focusable days</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'en-us' calendar with Sunday as its first day of the week."}</li>
        <li>
          {"It's using the default heading component that's included with the library: 'DefaultCalendarHeading'."}
        </li>
        <li>{"It's using the 'localizedWeekdayNames' function to display a properly localized weekday heading."}</li>
        <li>{'The days are focusable, try clicking a day or hitting tab and tabbing through the days.'}</li>
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
        <li>custom heading</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{"This is an example of an 'fr-ca' calendar with Sunday as its first day of the week."}</li>
        <li>{'Uses a custom heading to render the paging buttons on the right.'}</li>
        <li>{"It's using the 'localizedWeekdayNames' to display a properly localized weekday heading."}</li>
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
        <li>no styling</li>
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
  Example6: {
    component: Example6,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>styled events</li>
      </ul>
    ),
    description: (
      <ul>
        <li>{'Google calendar style events in day cells.'}</li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example6.js">Source</a>
        </li>
      </ul>
    ),
  },
  Example7: {
    component: Example7,
    shortDescription: (
      <ul style={shortDescriptionStyle}>
        <li>{'animated paging'}</li>
        <li>{'react-spring'}</li>
      </ul>
    ),
    description: (
      <ul>
        <li>
          {'Animated paging between calendar months using '}
          <a href="https://www.react-spring.io/">react-spring</a>.
        </li>
        <li>
          {`See the `}
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Pager.js">Pager</a>
          {` code for how react-spring can be used to achieve this effect.`}
        </li>
        <li>{'Click the next or previous month button to see the animation!'}</li>
        <li>
          <a href="https://github.com/BrennanR/react-clean-calendar/blob/master/src/examples/Example7.js">Source</a>
        </li>
      </ul>
    ),
  },
};

declare var window: any;
declare var document: any;

type Props = {};
class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    if (window && !window.location.pathname.includes('Example')) {
      navigate(`${window.location.href}Example1`);
    }
  }

  renderExample(exampleComponent: any, path: string) {
    const ExampleComponent = exampleComponent;
    return <ExampleComponent key={path} path={path} />;
  }

  render() {
    return (
      <Location>
        {context => {
          const pathParts = context.location.pathname.split('/').filter(Boolean);
          const exampleKey = pathParts.pop();
          const routerBasePath = pathParts.join('/');
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
                <h4>Examples & Recipes</h4>
                <nav
                  role="navigation"
                  aria-label="Main navigation"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {Object.keys(EXAMPLES).map(key => (
                    <div style={{ display: 'flex', flexDirection: 'column' }} key={key}>
                      <Link to={`${routerBasePath}/${key}/`}>
                        {key === exampleKey && <span style={{ fontWeight: `bold` }}>{`>>> `}</span>}
                        <span>{`${key}`}</span>
                      </Link>
                      <div>{EXAMPLES[key].shortDescription}</div>
                    </div>
                  ))}
                </nav>
                <h6>
                  <a href="https://github.com/BrennanR/react-clean-calendar">Go To GitHub Project</a>
                </h6>
              </div>
              <div
                style={{ display: 'flex', flexDirection: `column`, flex: 1, height: '100%', justifyContent: 'center' }}
                className="App"
              >
                <div style={{ marginTop: 5, marginBottom: 5 }}>
                  <h1 style={{ fontWeight: `bold` }}>{exampleKey}</h1>
                  {EXAMPLES[exampleKey].description}
                </div>
                <div style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
                <Router
                  basepath={`${routerBasePath}/`}
                  style={{ display: `flex`, flexDirection: `row`, flex: 1, width: '100%' }}
                >
                  {Object.keys(EXAMPLES).map(key => this.renderExample(EXAMPLES[key].component, key))}
                </Router>
              </div>
            </div>
          );
        }}
      </Location>
    );
  }
}

export default App;
