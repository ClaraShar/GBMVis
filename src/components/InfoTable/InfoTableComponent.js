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

    // componentWillReceiveProps(newProps) {// 点击之后第一行展示搜索数据
    //   console.log(newProps.value)
    //   this.handleSearch(['sid'], confirm, 'sid')
      // var newData = this.state.dataSource
      // fetch('/api/getOneFeature?sid=' + newProps.value, {
      //   method: 'get',
      //   headers: {
      //           'Accept': 'application/json',
      //       },
      //   }).then(res => res.json())
      //       .then(res => {
      //         newData.unshift(res.data.data)
      //         this.setState({
      //           dataSource: newData,
      //           sid: newProps.value
      //       })
      // });
    // }

    componentDidMount() {
      fetch('/api/features', {
        method: 'get',
        headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
              var newData = []
              res.data.data.map(((item) => {
                newData.push(Object.assign({}, item, {
                    key: item.sid,
                }))
            }))
            this.setState({
              dataSource: newData
            })
      });
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
  
      return <Table style={{width: 1200}} columns={newColumns} dataSource={this.state.dataSource} scroll={{ x: 1000, y: 300 }} bordered/>;
    }
}