import React, { Component } from "react";
import RedarGraph from "../RedarGraph/RedarGraphComponent";
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import InfoTable from '../InfoTable/InfoTableComponent'
import FeatureImportance from '../FeatureImportance/FeatureImportanceComponent'

export default class Hi extends Component{
    render() {
        return(
            <div className="hi">
                <TsneGraph />
                <InfoTable />
                <FeatureImportance />
            </div>
        )
    }
}