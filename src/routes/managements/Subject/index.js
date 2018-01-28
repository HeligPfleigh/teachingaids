import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { graphql, compose } from 'react-apollo';

import Table from '../../../components/Table';
import AddSubjectModal from './AddSubjectModal';
import { getSubjects } from './graphql';
import styles from './styles';

@compose(
  graphql(getSubjects, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
)
class Subject extends React.Component {

  state = {
    showModal: false,
  }

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    console.log(item);
    // history.push(`/districts/${item._id}`);
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    // loadMoreRows
    const { data: { loading, getSubjects: data } } = this.props;

    const { showModal } = this.state;

    const fields = [
      // Config columns
      { key: 'uniqueName', value: 'Kí hiệu', style: styles.columns.uniqueName, public: true, action: 'normal', event: this.eventHandler },
      { key: 'name', value: 'Tên môn học', style: styles.columns.name, public: true, action: 'normal', event: this.eventHandler },
      { key: 'btnRedirect', value: 'Hành động', style: styles.columns.btnRedirect, public: true, action: 'redirect', event: this.redirectPage },
    ];

    if (loading) {
      return <span style={{ textAlign: 'center' }}>Loading...</span>;
    }

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Danh sách môn học"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              iconStyle={styles.btnIcon}
              style={styles.btnWrapper}
              data-tip="Thêm mới môn học"
              onClick={this.openModal}
            >
              <ActionNoteAdd />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        { !loading && data && <Table items={data || []} fields={fields} /> }

        {
          showModal && <AddSubjectModal
            showModal={showModal}
            closeModal={this.closeModal}
          />
        }
      </Paper>
    );
  }
}

Subject.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }),
};

export default Subject;
