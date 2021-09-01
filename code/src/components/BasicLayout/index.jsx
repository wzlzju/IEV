import React from 'react';
import SearchTableWithStore from '../../containers/SearchTableWithStore';
import LeftMenu from '../LeftMenu';
import './index.css';

const BasicLayout = () => {

  return (
    <div className="basic_layout">
      <div className="left_menu">
        <LeftMenu />
      </div>
      <div className="main_content">
        <div className="top">top</div>
        <div className="middle">
          <div className="item">item1</div>
          <div className="item">item2</div>
        </div>
        <div className="bottom">bottom</div>
      </div>
      <div className="right_menu">
        <SearchTableWithStore />
      </div>
    </div>
  )
};

export default BasicLayout;