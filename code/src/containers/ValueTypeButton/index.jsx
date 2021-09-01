import React from 'react';
import { Button } from 'antd';
import { updateValueType } from '../../actions/valueType';
import { connect } from 'react-redux';

const ValueTypeButton = (props) => {
  const { handleUpdateValueType } = props;
  return (
    <Button type="primary" onClick={handleUpdateValueType}>修改ValueType</Button>
  )
};

const mapStateToProps = (state) => {
  const { valueType } = state;
  return {
    valueType
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateValueType: () => {
      dispatch(updateValueType());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueTypeButton);