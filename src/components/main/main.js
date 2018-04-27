import React from 'react';
import { connect } from 'react-redux';
import { getFeatures } from 'actions/feature';

import PersonList from 'components/main/person-list/person-list';

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getFeatures();
    }

    render() {
        return (
            <PersonList />
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