import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import './style.css'

export default class ScatterPlot extends Component{
    constructor(props){
        super(props)
        this.state = {
            sid: "",
            dataSource: []
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.value)
        fetch('/api/getOneFeature?feature=' + newProps.value, {
            method: 'get',
            headers: {
                    'Accept': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    
                    this.setState({
                        sid: newProps.value,
                        dataSource: newData
                    })
          });
    }

    getOption = () => {

    }

    render(){
        return(
            <div className="heatmap">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        )
    }
}