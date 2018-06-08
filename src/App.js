import React, { Component } from 'react';
import './App.css';
import getApiData from './utils/api';
import LineChart from './components/LineChart';
import Nav from './components/Nav'
import LineChartCard from './components/LineChartCard';

class App extends Component {

  constructor(){
    super()
    this.state = { data: [] };

  }
  getApiData(){
    getApiData().then((data)=>{
      this.setState({ data });
    });
  }
  componentDidMount(){
    this.getApiData();
  }
  

  render() {    
    const {data} = this.state;
    const chartData = Object.values(data.values)

    return  (
      <div className="App">
        <Nav />
        <LineChartCard/>
      </div>
    );
  }
}

export default App;
