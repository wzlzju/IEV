import React from 'react';
import './index.css';

// TODO: 把'text'抽成常量
const SearchItem = (props) => {

  const {
    year,
    exportCountry,
    importCountry,
    type,
    amount,
    valueType = 'text'
  } = props;

  const getAmount = () => {
    if(valueType === 'text') {
      return amount;
    }

    return (
      <div className="rect" style={{ width: '50%' }}></div>
    );
  };

  return (
    <div className="search_item">
      <div className="common">{year}</div>
      <div className="common">{exportCountry}</div>
      <div className="common">{importCountry}</div>
      <div className="common">{type}</div>
      <div className="common">
        {getAmount()}
      </div>
    </div>
  )
};

export default SearchItem;