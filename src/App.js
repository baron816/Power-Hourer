import React from 'react';
import './App.css';

export default function App(params) {
  const c = new React.Component(params);

  c.componentDidMount = function() {
    console.log(gapi);
  }

  c.render = function() {
    return (
      <div className="App">
      </div>
    );
  }

  return c;
}
