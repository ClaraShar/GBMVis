import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as FeaturesActions } from '../reducers/features';
import TsneGraph from './TsneGraph/TsneGraphComponent'
import InfoTable from './InfoTable/InfoTableComponent'
import FeatureImportance from './FeatureImportance/FeatureImportanceComponent'
import ParallelCoordinates from './ParallelCoordinates/ParallelCoordinatesComponent'
import style from './style.css';

const { get_features_data } = FeaturesActions

class AppIndex extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            // 这部分还没改
            <div className={style.MaterialVis}>
                <div className='toolLip'></div>
                <div className={style.ControlPannelBox}>
                    <ControlPannelComponent/>
                </div>
                <div className={style.DataOverviewBox}>
                    <div className={style.GroupViewBox}>
                        <div className={style.ScatterPlot}>
                            <ScatterPlotComponent materialData={this.props.materialData}/>
                        </div>
                        <div className={style.ClusterComparePlot}>
                            <FeatureHeatmapComponentColumn materialData={this.props.materialData}/>
                        </div>
                        <div className={style.EgoNetworkPlot}>
                            <EgoNetworkPlotComponent materialData={this.props.materialData}/>
                        </div>
                    </div>
                    <div className={style.MaterialParaCooBox}>
                        <div className={style.MaterialParaCooPlot}>
                            <ParaCooPlotComponent materialData={this.props.materialData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.get_features_data()
    }
}

function mapStateToProps(state){
    return{
        featuresData: state.features.featuresData
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_features_data: bindActionCreators(get_features_data, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)