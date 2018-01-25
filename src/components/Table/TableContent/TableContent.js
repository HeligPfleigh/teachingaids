import React from 'react';
import PropTypes from 'prop-types';
import { TableBody } from 'material-ui/Table';
import { generate as idRandom } from 'shortid';

import DataRow from './DataRow';

// field = { key: 'ID', value: 'Khoa chinh', style: {}, public: true, action: 'edit', event=func }
class TableContent extends React.Component {
  static muiName = 'TableBody';

  render() {
    const { fields, items, ...others } = this.props;
    return (
      <TableBody {...others}>
        { (items || []).map(item => (<DataRow key={idRandom()} fields={fields} item={item} />)) }
      </TableBody>
    );
  }
}

TableContent.propTypes = {
  fields: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

TableContent.defaultProps = {
  fields: [],
  items: [],
};

export default TableContent;
