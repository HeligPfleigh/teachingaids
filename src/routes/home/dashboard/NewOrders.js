import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { white, purple600, purple500 } from 'material-ui/styles/colors';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { typography } from 'material-ui/styles';

const NewOrders = (props) => {
  const styles = {
    paper: {
      backgroundColor: purple500,
      height: 150,
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px',
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: purple600,
      padding: 10,
    },
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>Thống kê mượn trả trong 7 ngày gần nhất</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="v" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

NewOrders.propTypes = {
  data: PropTypes.array,
};

export default NewOrders;
