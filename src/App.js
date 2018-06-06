import React, { Component } from 'react';
import './App.css';
import getApiData from './utils/api';
import {LineChart} from 'react-easy-chart';

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

    // console.log(chartData[0])
    chartData.map(function(value,index){
      
    })
    return  (
      <div className="App">
        <LineChart axes dataPoints
        xType={'text'} width={600} height={400}
        data={[chartData]}

        />
      </div>
    );
  }
}

export default App;
