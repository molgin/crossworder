import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers';
import reducer from './reducers'
import '../stylesheets/main.scss';

const store = createStore(reducer);
 
document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('mount')
  )
});