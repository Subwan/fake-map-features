import React from 'react';
import { connect } from 'react-redux';
import ol from 'ol';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/vector';
import Vector from 'ol/source/vector';
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import View from 'ol/view';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Circle from 'ol/style/circle';

import './map.css';

class OpenLayersMap extends React.Component {
    constructor(props) {
        super(props);

        this.vector = new VectorLayer({
            source: new Vector(),
        })
    }

    componentDidMount() {
        try {
            const mapOSM = new Tile({
                source: new OSM()
            });
            const map = new Map({
                target: 'map',
                layers: [mapOSM, this.vector],
                loadTilesWhileAnimating: true,
                view: new View({
                    center: [0, 0],
                    projection: 'EPSG:4326',
                    zoom: 4
                })
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(props) {
        props.features.forEach((item) => {
            let feature = new Feature({
                geometry: new Point(item.geometry.coordinates),
            })
            feature.setId(item.id);
            feature.setStyle(new Style({
                image: new Circle({
                    fill: new Fill({color: item.properties.color}),
                    radius: 5,
                })
            }))
            this.vector.getSource().addFeature(feature);
        });
    }

    render() {
        return (
            <div id="map" className="map" />
        );
    }
}

function mapStateToProps(state) {
    return {
        features: state.featureReducer.features,
    }

}

export default connect(mapStateToProps)(OpenLayersMap);