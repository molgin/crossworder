import React from 'react';
import ReactDOM from 'react-dom';
import { CrosswordGrid } from './components';
import '../stylesheets/main.scss';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <CrosswordGrid/>,
    document.getElementById('mount')
  );
});