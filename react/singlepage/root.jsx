import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore.js';
import Dashboard from './components/Dashboard.jsx';

const store = configureStore();

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
  }
}

export default Root;
