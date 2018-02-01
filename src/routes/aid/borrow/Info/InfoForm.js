import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import ItemForm from './InfoItem';
import style from '../style';

const InfoForm = ({ data }) => (
  <div className={classNames('grid')}>
    <div className={classNames('row')}>
      <div className={classNames('col-md-12 col-sm-12 col-xs-12')}>
        <MuiThemeProvider>
          <Paper>
            <Toolbar style={style.subheader}>
              <ToolbarGroup>
                <ToolbarTitle
                  style={style.textWhiteColor}
                  text="Thông tin người mượn"
                />
              </ToolbarGroup>
            </Toolbar>
            <div className={classNames('row')}>
              <div className={classNames('col-md-2 col-sm-3 col-xs-12')}>
                <Avatar
                  src={data.profile.avatar}
                  size={120}
                  style={style.avatar}
                />
              </div>
              <div className={classNames('col-md-10 col-sm-9 col-xs-12')}>
                <Paper style={style.info}>
                  <ItemForm label="Tên tài khoản" text={data.username || ''} />
                  <ItemForm label="Họ tên" text={data.profile.fullName || ''} />
                  <ItemForm label="Email" text={data.email.address || ''} />
                  <ItemForm label="Giới tính" text={data.profile.gender ? 'Nam' : 'Nữ'} />
                  <ItemForm label="Số điện thoại" text={data.profile.phone || ''} />
                  <ItemForm label="Địa chỉ" text={data.profile.address || ' '} />
                </Paper>
              </div>
            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    </div>
  </div>
  );

InfoForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default InfoForm;
