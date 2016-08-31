import React from 'react';
import ReactDOM from 'react-dom';
// import Counter from './Counter';
import '../stylesheets/main.scss';

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>Hello world</div>
    );
  }
}

class CrosswordSquare extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}

 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(CrosswordGrid),
    document.getElementById('mount')
  );
});