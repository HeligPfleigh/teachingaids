import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { graphql, compose } from 'react-apollo';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';

import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import AddStatus from './AddStatus';
import EditStatus from './EditStatus';
import { getEquipmentStatus, deleteEquipmentStatus } from './graphql';
import styles from './styles';

@compose(
  graphql(getEquipmentStatus, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(deleteEquipmentStatus, { name: 'deleteEquipmentStatus' }),
)
class Subject extends React.Component {

  state = {
    showModal: false,
    editModal: false,
    confirmModal: false,
    initialValues: null,
  }

  onDeleteStatus = async () => {
    this.showHideModal({ confirmModal: false });
    const { initialValues: { _id } } = this.state;
    if (!isEmpty(_id)) {
      const { data } = this.props;
      const {
        data: { deleteSubject: result },
      } = await this.props.deleteEquipmentStatus({ variables: { _id } });

      if (result) {
        alert('Thao tác xoá thành công!');
      } else {
        alert('Thao tác xoá thất bại...');
      }

      data.refetch();
      this.showHideModal({ initialValues: null });
    }
  }

  eventHandler = () => {};

  editStatusFunc = (initialValues) => {
    this.setState(preState => ({
      ...preState,
      initialValues,
    }), () => {
      this.showHideModal({ editModal: true });
    });
  };

  confirmDelete = (initialValues) => {
    this.setState(preState => ({
      ...preState,
      initialValues,
    }), () => {
      this.showHideModal({ confirmModal: true });
    });
  };

  showHideModal = (modal) => {
    this.setState(modal);
  };

  render() {
    // loadMoreRows
    const { data: { loading, refetch, getEquipmentStatus: data } } = this.props;

    const { confirmModal, showModal, editModal, initialValues } = this.state;

    const fields = [
      // Config columns
      { key: 'uniqueName', value: 'Kí hiệu', style: styles.columns.uniqueName, public: true, action: 'normal', event: this.eventHandler },
      { key: 'name', value: 'Tên trạng thái', style: styles.columns.name, public: true, action: 'normal', event: this.eventHandler },
      // Config button group
      { key: 'buttonGroup',
        value: 'Hành động',
        style: styles.columns.buttonGroup,
        public: true,
        action: 'group',
        event: this.eventHandler,
        children: [
          { key: 'btnEdit', value: 'Sửa', style: styles.columns.edit, public: true, action: 'edit', event: this.editStatusFunc },
          { key: 'btnDelete', value: 'Xóa', style: styles.columns.edit, public: true, action: 'delete', event: this.confirmDelete },
        ],
      },
    ];

    if (loading) {
      return <span style={{ textAlign: 'center' }}>Loading...</span>;
    }

    const actions = [
      <FlatButton
        secondary
        label="Hủy"
        keyboardFocused
        onTouchTap={
          () => this.showHideModal({
            confirmModal: false,
            initialValues: null,
          })
        }
      />,
      <FlatButton
        primary
        label="Xoá trạng thái"
        onTouchTap={this.onDeleteStatus}
      />,
    ];

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Danh sách trạng thái thiết bị"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              iconStyle={styles.btnIcon}
              style={styles.btnWrapper}
              data-tip="Thêm mới trạng thái"
              onClick={() => this.showHideModal({ showModal: true })}
            >
              <ActionNoteAdd />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        { !loading && data && <Table items={data || []} fields={fields} /> }

        {
          showModal && <AddStatus
            refetch={refetch}
            showModal={showModal}
            closeModal={this.showHideModal}
          />
        }

        {
          editModal && <EditStatus
            refetch={refetch}
            showModal={editModal}
            closeModal={this.showHideModal}
            initialValues={{
              ...initialValues,
              oldName: initialValues.name,
            }}
          />
        }

        {
          confirmModal && <Modal
            isOpen={confirmModal}
            title="Xác nhận xoá thông tin trạng thái!"
            actions={actions}
          >
            <div style={{ textAlign: 'center', padding: 20 }}>
              <span style={{ color: 'red', fontSize: 18 }}>
                { 'Bạn có muốn tiếp tục thao tác xoá thông tin trạng thái?' }
              </span>
            </div>
          </Modal>
        }
      </Paper>
    );
  }
}

Subject.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func,
  }),
  deleteEquipmentStatus: PropTypes.func,
};

export default Subject;
