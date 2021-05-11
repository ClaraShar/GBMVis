import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions/general'
import { bindActionCreators } from 'redux'
import TsneGraph from '../components/TsneGraph/TsneGraphComponent'

const get_tsne_list = actions.get_tsne_list

class General extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        const list = this.state
        this.props.get_tsne_list(list)
    }

    render() {
        return(
            <div className="general-container">
                <div className="tsne">
                    <TsneGraph />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        general_tsne: state.general_tsne
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_tsne_list: bindActionCreators(get_tsne_list, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(General)