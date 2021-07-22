import React, { Component } from "react";
import RedarGraph from "../RedarGraph/RedarGraphComponent";
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import InfoTable from '../InfoTable/InfoTableComponent'

export default class Hi extends Component{
    render() {
        return(
            <div className="hi">
                <TsneGraph />
                Hi
            </div>
        )
    }
}