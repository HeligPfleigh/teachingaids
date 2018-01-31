import React from 'react';
import { grey500 } from 'material-ui/styles/colors';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import s from './Chart.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Doughnut } from 'react-chartjs';
import FiberManualRecord from 'material-ui/svg-icons/action/perm-identity';

class ChartDoughnut extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chart">
        <div className="chart-doughnut">
          <Doughnut data={this.props.dataChart} options={this.props.options} width="300" height="300" />
          <div className="name">
            {this.props.name}
          </div>
        </div>
        <div className="abc">
          <div>
            {this.props.dataChart.map((data, idx) => <div key={idx}><FiberManualRecord color={data.color} />{data.label}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ChartDoughnut);
