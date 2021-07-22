import React, { Component } from 'react'
import './style.css'
import {Card, Table, Input, Button, Space} from 'antd';
import "antd/dist/antd.css";//引入样式
import columns from './columns'

export default class InfoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
          sid: "2906007032",
          dataSource : [],
          searchText: '',
          searchedColumn: '',
        }
    }

    // componentWillReceiveProps(newProps) {// 点击之后第一行展示搜索数据
    //     console.log(newProps.value)
    //     var newData = this.state.dataSource
    //     newData.unshift(res.data.data)
    //     this.setState({
    //         dataSource: [],
    //         sid: newProps.value
    //     })
    // }

    componentDidMount() {
      var data = [];
      fetch('/api/features', {
        method: 'get',
        headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
              data = res.data.data;
              this.setState({
                dataSource: data
              })
      });
    }

    render() {
      //定义表头，一般放在render()中
      return(
        <div>
          <Card title={"Info"}>
            {/*columns:指定表头
            dataSource:指定数据源
            borderd:加边框*/}
            <Table style={{width: 1500}} columns={columns} dataSource={this.state.dataSource} scroll={{ x: 1000, y: 300 }} bordered>
            </Table>
          </Card>
        </div>
        )
    }
}