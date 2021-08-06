import React, { Component } from "react";
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import InfoTable from '../InfoTable/InfoTableComponent'
import FeatureImportance from '../FeatureImportance/FeatureImportanceComponent'
import ParallelCoordinates from '../ParallelCoordinates/ParallelCoordinatesComponent'

export default class Hi extends Component{
    render() {
        return(
            <div className="hi">
                {/* <TsneGraph />
                <InfoTable />
                <FeatureImportance /> */}
                <ParallelCoordinates />
            </div>
        )
    }
}