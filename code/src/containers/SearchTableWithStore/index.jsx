import React from 'react';
import { connect } from 'react-redux';
import SearchTable from '../../components/SearchTable';
import './index.css';

const SearchTableWithStore = (props) => {
  const { valueType } = props;
  return (
    <SearchTable valueType={valueType} />
  )
};

const mapStateToProps = (state) => {
  const { valueType } = state;
  return {
    valueType
  }
};

export default connect(mapStateToProps)(SearchTableWithStore);