import React from 'react';
import PropTypes from 'prop-types';
import { generate as idRandom } from 'shortid';
import {
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

const styles = {
  textHeader: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

const RowHeader = ({ fields }) => (
  <TableRow>
    {
      (fields || []).map(field => (
        <TableHeaderColumn key={idRandom()} style={field.style || {}}>
          <span style={styles.textHeader}>{field.value}</span>
        </TableHeaderColumn>
      ))
    }
  </TableRow>
);

RowHeader.propTypes = {
  fields: PropTypes.array.isRequired,
};

RowHeader.defaultProps = {
  fields: [],
};

export default RowHeader;
