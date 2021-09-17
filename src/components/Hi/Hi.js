import React, { Component } from "react";
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import InfoTable from '../InfoTable/InfoTableComponent'
import FeatureImportance from '../FeatureImportance/FeatureImportanceComponent'
import ParallelCoordinates from '../ParallelCoordinates/ParallelCoordinatesComponent'
import './style.css'

export default class Hi extends Component{
    render() {
        return(
            <div className="hi">
                <div className="flex-wrap">
                    <TsneGraph />
                    <FeatureImportance />
                </div>
                <div className="info-table">
                    <InfoTable />
                </div>
                <div className="parallel">
                    <ParallelCoordinates />
                </div>
            </div>
        )
    }
}