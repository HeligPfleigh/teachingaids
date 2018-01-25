import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from 'material-ui/Table';
import { generate as idRandom } from 'shortid';
import DataColumn from './DataColumn';

const DataRow = ({ fields, item }) => (
  <TableRow>
    { item && (fields || []).map(field => (
        (field.public) && <DataColumn key={idRandom()} field={field} item={item} />
      ),
    )}
  </TableRow>
);

DataRow.propTypes = {
  fields: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
};

DataRow.defaultProps = {
  fields: [],
  item: {},
};

export default DataRow;
