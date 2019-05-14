import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quote from './Quote.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Quote></Quote>
        </p>
      </header>
    </div>
  );
}

export default App;
