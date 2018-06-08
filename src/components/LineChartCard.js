import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LineChart from './LineChart'

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

function LineChartCard(props) {
  const { classes } = props;
  var dataChart = [
    {   name: "USA",
        "values": [
        {
        "x": "2017",
        "y": 5
        },
        {
        "x": "2018",
        "y": 20
        },
        {
        "x": "2019",
        "y": 3
        },
        {
        "x": "2020",
        "y": -1
        }
        ]
        }
  ];
  return (
    <div className="card">
      <Card className={classes.card}>
        <CardContent>
         <LineChart dataChart={dataChart} /> 
        </CardContent>
      </Card>
    </div>
  );
}

LineChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineChartCard);