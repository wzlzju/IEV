import React from 'react';
import SearchTableWithStore from '@/containers/SearchTableWithStore';
import LeftMenu from '../LeftMenu';
import styles from './index.less';
import ForceGraph from '../ForceGraph';

const BasicLayout = () => {
  
  return (
    <div className={styles['basic_layout']}>
      <div className={styles['left_menu']}>
        <LeftMenu />
      </div>
      <div className={styles['main_content']}>
        <div className={styles['top']}>top</div>
        <div className={styles['middle']}>
          <div className={styles['item']}>item1</div>
          <div className={styles['item']}>item2</div>
        </div>
        <div className={styles['bottom']}>
          <ForceGraph width={300} height={300} />
        </div>
      </div>
      <div className={styles['right_menu']}>
        <SearchTableWithStore />
      </div>
    </div>
  )
};

export default BasicLayout;