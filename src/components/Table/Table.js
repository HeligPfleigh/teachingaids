import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table as TableUI, TableHeader } from 'material-ui/Table';

import RowHeader from './TableHeader/RowHeader';
import TableContent from './TableContent';

import s from './Table.scss';

class Table extends React.Component {
  render() {
    const { fields, items } = this.props;

    if (isEmpty(items)) {
      return (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <span style={{ color: 'red', fontSize: 18 }}>Không có dữ liệu hiển thị</span>
        </div>
      );
    }

    return (
      <TableUI>
        <TableHeader>
          <RowHeader fields={fields} />
        </TableHeader>
        <TableContent fields={fields} items={items} />
      </TableUI>
    );
  }
}

Table.propTypes = {
  fields: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

Table.defaultProps = {
  fields: [],
  items: [],
};

export default withStyles(s)(Table);
