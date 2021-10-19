import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as FeaturesActions } from '../reducers/features';
import { actions as TsneActions } from '../reducers/tsne'
import TsneGraph from './TsneGraph/TsneGraphComponent'
import InfoTable from './InfoTable/InfoTableComponent'
import FeatureImportance from './FeatureImportance/FeatureImportanceComponent'
import ParallelCoordinates from './ParallelCoordinates/ParallelCoordinatesComponent'
import './style.css'

const { get_features_data } = FeaturesActions
const { get_tsne_data } = TsneActions

class AppIndex extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='GBMVis'>
                <div className="flex-wrap">
                    <TsneGraph tsneData={this.props.tsneData}/>
                    {/* <FeatureImportance /> */}
                </div>
                <div className="info-table">
                    <InfoTable featuresData={this.props.featuresData}/>
                </div>
                {/* <div className="parallel">
                    <ParallelCoordinates />
                </div> */}
            </div>
            
            // <div className='GBMVis'>
            //     <div className={style.ControlPannelBox}>
            //         <ControlPannelComponent/>
            //     </div>
            //     <div className={style.DataOverviewBox}>
            //         <div className={style.GroupViewBox}>
            //             <div className={style.ScatterPlot}>
            //                 <ScatterPlotComponent materialData={this.props.materialData}/>
            //             </div>
            //             <div className={style.ClusterComparePlot}>
            //                 <FeatureHeatmapComponentColumn materialData={this.props.materialData}/>
            //             </div>
            //             <div className={style.EgoNetworkPlot}>
            //                 <EgoNetworkPlotComponent materialData={this.props.materialData}/>
            //             </div>
            //         </div>
            //         <div className={style.MaterialParaCooBox}>
            //             <div className={style.MaterialParaCooPlot}>
            //                 <ParaCooPlotComponent materialData={this.props.materialData}/>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }

    componentDidMount(){
        this.props.get_features_data()
        this.props.get_tsne_data()
    }
}

function mapStateToProps(state){
    return{
        featuresData: state.features.featuresData,
        tsneData: state.tsne.tsneData
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_features_data: bindActionCreators(get_features_data, dispatch),
        get_tsne_data: bindActionCreators(get_tsne_data, dispatch)

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)