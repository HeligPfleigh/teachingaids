import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import InfoItem from './InfoItem';
import style from '../style';

const InfoForm = ({ data }) => (
  <div className={classNames('grid')}>
    <div className={classNames('row')}>
      <div className={classNames('col-md-12 col-sm-12 col-xs-12')}>
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
                src={data.profile.avatar || 'avatar-default.jpg'}
                size={120}
                style={style.avatar}
              />
            </div>
            <div className={classNames('col-md-10 col-sm-9 col-xs-12')}>
              <Paper style={style.info}>
                <InfoItem label="Tên tài khoản" text={data.username || ''} />
                <InfoItem label="Họ tên" text={data.profile.fullName || ''} />
                <InfoItem label="Email" text={data.email.address || ''} />
                <InfoItem label="Giới tính" text={data.profile.gender ? 'Nam' : 'Nữ'} />
                <InfoItem label="Số điện thoại" text={data.profile.phone || ''} />
                <InfoItem label="Địa chỉ" text={data.profile.address || ' '} />
              </Paper>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  </div>
  );

InfoForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default InfoForm;
