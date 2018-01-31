import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionPrinter from 'material-ui/svg-icons/action/print';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { grey500, grey200 } from 'material-ui/styles/colors';
import { TableRowColumn } from 'material-ui/Table';
import { generate as idRandom } from 'shortid';
import get from 'lodash/get';

const styles = {
  editButton: {
    fill: grey500,
  },
  btnStyle: {
    marginRight: 10,
  },
};

const GenButton = ({ event, children }) => (
  <FloatingActionButton
    zDepth={0}
    mini
    backgroundColor={grey200}
    iconStyle={styles.editButton}
    onTouchTap={event}
    style={styles.btnStyle}
  >
    { children }
  </FloatingActionButton>
);

GenButton.propTypes = {
  event: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const BTN_TYPE = ['add', 'edit', 'delete', 'active', 'config', 'print'];

const btnCollection = {
  [BTN_TYPE[0]]: (field, event) => (
    // Cot khoi tao button add
    <GenButton event={event}><ActionNoteAdd /></GenButton>
  ),
  [BTN_TYPE[1]]: (field, event) => (
    // Cot khoi tao button edit
    <GenButton event={event}><ContentCreate /></GenButton>
  ),
  [BTN_TYPE[2]]: (field, event) => (
    // Cot khoi tao button delete
    <GenButton event={event}><ActionDelete /></GenButton>
  ),
  [BTN_TYPE[3]]: (field, event) => (
    // Cot khoi tao button set active
    <GenButton event={event}><ContentCreate /></GenButton>
  ),
  [BTN_TYPE[4]]: (field, event) => (
    // Cot khoi tao button config
    <GenButton event={event}><ActionSettings /></GenButton>
  ),
  [BTN_TYPE[5]]: (field, event) => (
    // Cot khoi tao button print
    <GenButton event={event}><ActionPrinter /></GenButton>
  ),
};

const GenNestedColumn = ({ item, field }) => {
  const eventHandler = () => {
    field.event(item);
  };
  return btnCollection[field.action](field, eventHandler);
};

GenNestedColumn.propTypes = {
  field: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

const GenColumn = ({ field, event, item, children }) => {
  if (field.children && field.children.length > 0) {
    return (
      <TableRowColumn style={field.style}>
        { (field.children || []).map(child => (
          <GenNestedColumn key={`${field.key}-${idRandom()}`} item={item} field={child} />
        ))}
      </TableRowColumn>
    );
  }
  return (
    <TableRowColumn style={field.style}>
      <GenButton event={event}>{ children }</GenButton>
    </TableRowColumn>
  );
};

GenColumn.propTypes = {
  field: PropTypes.object.isRequired,
  event: PropTypes.func.isRequired,
  children: PropTypes.node,
  item: PropTypes.object,
};

// field = { key: 'ID', value: 'Khoa chinh', style: {}, public: true, action: 'edit', event=func }
const COL_TYPE = ['normal', 'add', 'edit', 'delete', 'active', 'redirect', 'print', 'group'];

const columnResults = {
  [COL_TYPE[0]]: (field, empty = null, item) => {
    let itemValue = get(item, field.key);
    if (field.formatData && (typeof field.formatData === 'function')) {
      itemValue = field.formatData(itemValue);
    }
    // Cot hien thi du lieu
    return <TableRowColumn style={field.style}>{ field.init || itemValue || 'xxx'}</TableRowColumn>;
  },
  [COL_TYPE[1]]: (field, event) => (
    // Cot khoi tao button add
    <GenColumn field={field} event={event}><ActionNoteAdd /></GenColumn>
  ),
  [COL_TYPE[2]]: (field, event) => (
    // Cot khoi tao button edit
    <GenColumn field={field} event={event}><ContentCreate /></GenColumn>
  ),
  [COL_TYPE[3]]: (field, event) => (
    // Cot khoi tao button delete
    <GenColumn field={field} event={event}><ActionDelete /></GenColumn>
  ),
  [COL_TYPE[4]]: (field, event) => (
    // Cot khoi tao button set active
    <GenColumn field={field} event={event}><ContentCreate /></GenColumn>
  ),
  [COL_TYPE[5]]: (field, event) => (
    // Cot khoi tao button set active
    <GenColumn field={field} event={event}><HardwareKeyboardArrowRight /></GenColumn>
  ),
  [COL_TYPE[6]]: (field, event) => (
    // Cot khoi tao button set print
    <GenColumn field={field} event={event}><ActionPrinter /></GenColumn>
  ),
  [COL_TYPE[7]]: (field, event, item) => (
    // Cot khoi tao group button
    <GenColumn field={field} item={item} event={event} />
  ),
};

const DataColumn = ({ field, item }) => {
  const eventHandler = () => {
    field.event(item);
  };

  return columnResults[field.action](field, eventHandler, item);
};

DataColumn.propTypes = {
  field: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

DataColumn.defaultProps = {
  field: {},
  item: {},
};

export default DataColumn;
