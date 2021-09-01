import React from 'react';
import './index.css';

const BasicLayout = () => {

  return (
    <div className="basic_layout">
      <div className="left_menu">
        left_menu
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
        right_menu
      </div>
    </div>
  )
};

export default BasicLayout;