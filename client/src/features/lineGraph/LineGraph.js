import React, {useContext} from 'react';
//! UI Components
import {Card, CardContent, Typography} from '@material-ui/core';
//! Features
import MeterSearch from '../meterSearch/MeterSearch';
//! Context
import {MeterContext} from '../meterSearch';
import {Line} from 'react-chartjs-2';

const LineGraph = () => {
  //! Context
  const {state} = useContext(MeterContext);
  const {details, data} = state;

  return (
    <div className="App">
      <MeterSearch />
      {details && (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${details.serialNum}`}
            </Typography>
            <Line data={data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LineGraph;
