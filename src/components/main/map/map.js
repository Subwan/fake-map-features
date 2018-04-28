import React from 'react';
import { connect } from 'react-redux';
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
import Overlay from 'ol/overlay';

import './map.css';

class OpenLayersMap extends React.Component {
    constructor(props) {
        super(props);

        this.vector = new VectorLayer({
            source: new Vector(),
        });

        this.overlay = null;
        this.map = null;
        this.state = {
            featureId: null,
        }

        this.findFeatureById = this.findFeatureById.bind(this);
    }

    componentDidMount() {
        try {
            const mapOSM = new Tile({
                source: new OSM()
            });
            this.overlay = new Overlay({
                element: document.getElementById('popup'),
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            this.map = new Map({
                target: 'map',
                layers: [mapOSM, this.vector],
                overlays: [this.overlay],
                loadTilesWhileAnimating: true,
                view: new View({
                    center: [0, 0],
                    projection: 'EPSG:4326',
                    zoom: 4
                })
            });
            this.map.on('click', (e) => {
                let features = this.map.getFeaturesAtPixel(e.pixel);
                if (features) {
                    let coordinate = features[0].getGeometry().getCoordinates();
                    let id = features[0].getId();
                    this.setState({
                        featureId: id,
                    })
                    this.overlay.setPosition(coordinate);
                } else {
                    this.overlay.setPosition(undefined);
                    return false;
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(props) {
        let id = props.activeFeature;
        if (id) {
            this.setState({
                featureId: id
            })
            let coordinate = this.findFeatureById(id).geometry.coordinates;
            this.overlay.setPosition(coordinate);
            this.map.getView().animate({center: coordinate, zoom: 10});
        }

        props.features.forEach((item) => {
            let feature = new Feature({
                geometry: new Point(item.geometry.coordinates),
            })
            feature.setId(item.id);
            feature.setStyle(new Style({
                image: new Circle({
                    fill: new Fill({ color: item.properties.color }),
                    radius: 5,
                })
            }))
            this.vector.getSource().addFeature(feature);
        });
    }

    findFeatureById(id) {
        return this.props.features.find((item) => {
            return item.id === id;
        });
    }

    get popup() {
        let feature = this.findFeatureById(this.state.featureId)
        return (
            <div className="popup">
                <div className="popup__name">{feature.properties.userName}</div>
                <div className="popup__email">{feature.properties.email}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="map-container">
                <div id="map" className="map" />
                <div id="popup">
                    {this.state.featureId ? this.popup : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        features: state.featureReducer.features,
        activeFeature: state.featureReducer.activeFeature,
    }

}

export default connect(mapStateToProps)(OpenLayersMap);