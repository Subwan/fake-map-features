import React from 'react';
import { connect } from 'react-redux';

import { Feature } from 'components/main/person-list/feature';
import { setActiveFeature } from 'actions/feature';
import './person-list.css';

class PersonList extends React.Component {

    onClick(id) {
        if (id) this.props.setActiveFeature(id);
    }

    get personList() {
        return this.props.features.map((item) => {
            return <Feature key={item.id} item={item.properties} onClick={(id) => this.onClick(id)} />
        });
    }

    render() {
        return (
            <div className="person-list">
                <ul className="person-list__list">
                    {this.props.features.length ? this.personList : ''}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        features: state.featureReducer.features,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveFeature: (id) => {
            dispatch(setActiveFeature(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);