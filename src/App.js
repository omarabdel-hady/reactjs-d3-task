import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import LineChartCard from './components/LineChartCard';

class App extends Component {
  render() {    
    return  (
      <div className="App">
        <Nav />
        <LineChartCard />
      </div>
    );
  }
}
export default App;
