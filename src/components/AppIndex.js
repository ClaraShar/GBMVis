import React, { Component } from 'react'
import {connect} from 'react-redux'
import General from '../containers/General'

export class AppIndex extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="index">
                <General className="general" />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

function mapDispatchToProps(disptach) {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppIndex)