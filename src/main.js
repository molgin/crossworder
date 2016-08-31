import React from 'react';
import ReactDOM from 'react-dom';
// import Counter from './Counter';
import { CrosswordGrid } from './components';
import '../stylesheets/main.scss';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(CrosswordGrid),
    document.getElementById('mount')
  );
});