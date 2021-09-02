import React from 'react';
import SearchTableWithStore from '../../containers/SearchTableWithStore';
import ImagesDisplay from '../ImagesDisplay';
import LeftMenu from '../LeftMenu';
import styles from './index.less';
import { Nations, icons } from '../../assets/images'

const BasicLayout = () => {

  return (
    <div className={styles['basic_layout']}>
      <div className={styles['left_menu']}>
        <LeftMenu />
      </div>
      <div className={styles['main_content']}>
        <div className={styles['top']}>top</div>
        <div className={styles['middle']}>
          <div className={styles['item']}>
            <ImagesDisplay
              imageList = {Nations}
              column = {5}
            />
          </div>
          <div className={styles['item']}>
            <ImagesDisplay
              imageList = {icons}
              column = {5}
              size = {30}
            />
          </div>
        </div>
        <div className={styles['bottom']}>bottom</div>
      </div>
      <div className={styles['right_menu']}>
        <SearchTableWithStore />
      </div>
    </div>
  )
};

export default BasicLayout;