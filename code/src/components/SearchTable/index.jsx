import React from 'react';
import './index.css';
import { Select, Button } from 'antd';
import dataSource from './data.json';
import SearchItem from './SearchItem';

const { Option } = Select;

const SearchTable = () => {

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="search_table">
      <div className="search_top">
        <Select
          defaultValue="lucy"
          onChange={handleChange}
          style={{ width: '80%' }}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Button type="primary" style={{ width: '80%', marginTop: 15 }}>
          Primary
        </Button>
      </div>
      <div className="search_list">
        <div className="search_container">
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
          <SearchItem
            year="2004"
            exportCountry="中国"
            importCountry="美国"
            type="农业"
            amount="1200"
            valueType="rect"
          />
        </div>
      </div>
    </div>
  )
};

export default SearchTable;