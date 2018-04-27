import React from 'react';
import { connect } from 'react-redux';

import { Feature } from 'components/main/person-list/feature';
import './person-list.css';

class PersonList extends React.Component {

    get personList() {

        return this.props.features.map((item) => {
            return <Feature key={item.id} item={item.properties} />
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

export default connect(mapStateToProps)(PersonList);