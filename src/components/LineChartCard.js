import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import LineChart from './LineChart'
import getApiData from '../utils/api';


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class LineChartCard extends Component{
  constructor(){
    super()
    this.state = { 
      data: [],
      isLoading : true 
  };
  }
  getApiData(){
    getApiData().then((data)=>{
      this.setState({ data });
    });
  }
  componentDidMount(){
    getApiData().then((data)=>{
      this.setState({ 
        data, 
        isLoading:false 
      });
    });
    // this.isLoading = false;
  }
    render(){
      const {data} = this.state;
      const isLoading = this.state.isLoading;
      return (
        <div className="card">
          <Card>
            <CardContent>
            {!isLoading && <LineChart dataChart={[data]} /> }
            <div className="chart"></div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
 
LineChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineChartCard);