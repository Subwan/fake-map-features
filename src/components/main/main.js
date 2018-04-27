import React from 'react';
import { connect } from 'react-redux';
import { getFeatures } from 'actions/feature';

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getFeatures();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFeatures: () => {
            dispatch(getFeatures());
        }
    }
}

export default connect(null, mapDispatchToProps)(Main);