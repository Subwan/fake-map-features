import React from 'react';
import { connect } from 'react-redux';
import ol from 'ol';
// import ol from 'ol';
// import Tile from 'ol/layer/tile';
// import OSM from 'ol/source/osm';
// import view from 'ol';
// import Map from 'ol/map';
// import Vector from 'ol/layer/vector';
// import Vector as SourceVector from 'ol/source/vector'
// import Style from 'ol/style/style'
// import Icon from 'ol/style/icon'
// import View from 'ol/view';

class OpenLayersMap extends React.Component {

    componentDidMount() {
        console.log('2');
        try {
            const mapOSM = new ol.layer.Tile({
                source: new ol.source.OSM()
            });
            let vector = new ol.layer.Vector({
                source: new ol.source.Vector(),
                // style: new Style({
                //     image: new Icon({
                //         anchor: [0.5, 46],
                //         anchorXUnits: 'fraction',
                //         anchorYUnits: 'pixels',
                //         opacity: 0.95,
                //         src: 'https://openlayers.org/en/v4.4.2/examples/data/icon.png'
                //})
            })
            const map = new ol.Map({
                target: 'map',
                layers: [mapOSM, vector],
                loadTilesWhileAnimating: true,
                view: new ol.View({
                    center: [949282, 6002552],
                    zoom: 4
                })
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log('1');
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