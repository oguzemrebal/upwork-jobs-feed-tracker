import React from 'react';
import '@fontsource/inter';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
