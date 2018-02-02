import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white, blue500, grey300 } from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
  searchBox: {
    position: 'relative',
    width: '100%',
  },
  textField: {
    color: white,
    backgroundColor: blue500,
    borderRadius: 2,
  },
  inputStyle: {
    color: white,
    paddingLeft: '13px',
  },
  hintStyle: {
    color: grey300,
    paddingLeft: '13px',
  },
};

class SearchBar extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleRequest: PropTypes.func.isRequired,
    hintText: PropTypes.string,
  }

  onNewRequest = (chosenRequest, index) => {
    this.props.handleRequest(chosenRequest, index);
    setTimeout(() => {
      this.refs.autocomplete.setState({ searchText: '' });
    }, 700);
  }

  render() {
    const { dataSource, text, value, hintText } = this.props;
    return (
      <div style={styles.searchBox}>
        <AutoComplete
          fullWidth
          openOnFocus
          name="search"
          ref={'autocomplete'}
          dataSource={dataSource || []}
          dataSourceConfig={{ text, value }}
          onNewRequest={this.onNewRequest}
          filter={AutoComplete.fuzzyFilter}
          hintText={hintText}
          underlineShow={false}
          style={styles.textField}
          inputStyle={styles.inputStyle}
          hintStyle={styles.hintStyle}
          maxSearchResults={5}
        />
      </div>
    );
  }
}

export default SearchBar;
