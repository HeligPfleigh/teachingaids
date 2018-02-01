import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
// import ActionSearch from 'material-ui/svg-icons/action/search';


class SearchBar extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleRequest: PropTypes.func.isRequired,
    hintText: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }
  onNewRequest(chosenRequest, index) {
    this.props.handleRequest(chosenRequest, index);

    setTimeout(() => {
      this.refs.autocomplete.setState({ searchText: '' });
      this.refs.autocomplete.focus();
    }, 700);
  }
  render() {
    const { dataSource, text, value, hintText } = this.props;
    return (
      <div>
        <AutoComplete
          name="color"
          // searchText={this.state.color.name}
          filter={(searchText, key) => searchText !== '' && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          }
          ref={'autocomplete'}
          dataSource={dataSource}
          dataSourceConfig={{ text, value }}
          onNewRequest={this.onNewRequest.bind(this)}
          fullWidth
          hintText={hintText}
        />
      </div>
    );
  }
}

export default SearchBar;
