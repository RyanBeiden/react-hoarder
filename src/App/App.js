import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>React Hoarder</h2>
        <button className="btn btn-info"><i className="fas fa-people-carry"></i> I am a Button</button>
      </div>
    );
  }
}

export default App;
