import React from 'react';

import './person-list.css';

export class Feature extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <li className="feature" onClick={() => this.props.onClick(item.id)}>
                <img className="feature__avatar" src={item.avatar} alt='avatar' />
                <div className="feature__info">
                    <div className="feature__info-name">{item.userName}</div>
                    <div className="feature__info-email">{item.email}</div>
                </div>
            </li>
        );
    }
}