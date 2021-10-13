import React, { Component } from 'react'
import './style.css'
import {Card, Table, Input, Button, Space} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";//引入样式
import columns from './columns'

export default class InfoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
          // sid: "2906007032",
          dataSource : [],
          searchText: '',
          searchedColumn: '',
        }
    }
  
    componentDidMount() {
       console.log("DidMount")
      //  console.log(this.props.featuresData.data)      
       // 从console顺序得知，先加载组件（执行componentDidMount），再异步获取数据，所以在这里打印this.props.featuresData为空

      // 现在的问题是，render中可以直接用this.props.featuresData.data读取数据，但是该在哪里加key呢？或者说如果想在render中用state，该怎么做呢？
      // let getData = this.props.featuresData.data
      // var newData = []
      // getData.map(((item) => {
      // newData.push(Object.assign({}, item, {
      //     key: item.sid,
      //   }))
      // }))
      // this.setState({
      //   dataSource: newData
      // })
    }

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
  
    render() {
      var newColumns = []
      columns.map((item, index) => {
          newColumns.push(Object.assign({}, item, {
              ...this.getColumnSearchProps(item.key)
          }))
      })
      return <Table style={{width: 1200}} columns={newColumns} dataSource={this.props.featuresData.data} scroll={{ x: 1000, y: 300 }} bordered/>;
    }
}