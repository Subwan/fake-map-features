import React from 'react';
import { connect } from 'react-redux';
import { getFeatures } from 'actions/feature';

import PersonList from 'components/main/person-list/person-list';
import OpenLayersMap from 'components/main/map/map';

import './main.css';

class Main extends React.Component {

    componentDidMount() {
        this.props.getFeatures();
    }

    render() {
        return (
            <div className="main-container">
                <OpenLayersMap />
                <PersonList />
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