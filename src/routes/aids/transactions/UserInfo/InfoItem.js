import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from '../style';


const ItemForm = ({ label, text }) => (
  <div style={style.formItem}>
    <div className={classNames('row')}>
      <div className={classNames('col-md-4 col-sm-4 col-xs-12')}>
        {label}
      </div>
      <div className={classNames('col-md-8 col-sm-8 col-xs-12')}>
        {text}
      </div>
    </div>
  </div>
    );
ItemForm.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default ItemForm;
