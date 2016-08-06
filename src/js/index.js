import React, { Component } from "react";
import {
	GoogleMapLoader,
	GoogleMap,
	Marker
} from 'react-google-maps';

export default class Map extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			activeLocation: {},
			locationDescriptionStatus: false
		};
		this._handleMarkerRightClick = this._handleMarkerRightClick.bind(this);
		this._handleMarkerClick = this._handleMarkerClick.bind(this);
		this._handleMapClick = this._handleMapClick.bind(this);
		this._handleWindowResize = this._handleWindowResize.bind(this);
		this._closeLocationDescription = this._closeLocationDescription.bind(this);
	}
	componentDidMount() {}
	componentWillUnmount() {}

	_handleWindowResize() {}
	_handleMapClick() {}
	_handleMarkerClick(marker) {
		this.setState({
			activeLocation: this.props.locations[marker.key],
			locationDescriptionStatus: true
		});
	}
	_handleMarkerRightClick() {}
	_closeLocationDescription() {
		this.setState({
			activeLocation: {},
			locationDescriptionStatus: false
		});
	}
	_getHTML(__html) {
		return { __html };
	}
	render() {
		const {
			locations = [],
			options = {}
		} = this.props;
		const {
			activeLocation,
			locationDescriptionStatus
		} = this.state;
		const defaultOptions = {
			// disableDefaultUI: true,
			// panControl:true,
			// zoomControl:true,
			scrollwheel: false,
			mapTypeControl: false,
			// scaleControl:true,
			// streetViewControl:true,
			// overviewMapControl:true,
			// rotateControl:true,
			styles: [
				{
					featureType: "all",
					stylers: [
						{ saturation: -80 }
					]
				},{
					featureType: "road.arterial",
					elementType: "geometry",
					stylers: [
						{ hue: "#00ffee" },
						{ saturation: 50 }
					]
				},{
					featureType: "poi.business",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			]
		};
		const mapCenterDefined = locations.some(marker => { return marker.center });
		const mapCenter = (mapCenterDefined) ? locations.filter(marker => { return marker.center })[0].geoLocation : (locations.length > 0) ? locations[0].geoLocation : undefined;
		let markers = locations.map((loc, locationIndex) => {
			return {
				position: {
					lat: parseFloat(loc.geoLocation.lat) || 0,
					lng: parseFloat(loc.geoLocation.lng) || 0
				},
				key: locationIndex,
				defaultAnimation: 2,
				icon: {
					url: loc.icon,
					size: (typeof google !== 'undefined') ? new google.maps.Size(2362, 1181) : undefined,
					origin: (typeof google !== 'undefined') ? new google.maps.Point(0, 0) : undefined,
					anchor: (typeof google !== 'undefined') ? new google.maps.Point(17, 34) : undefined,
					scaledSize: (typeof google !== 'undefined') ? new google.maps.Size(100, 50) : undefined
				}
			};
		});
		let mapContainerClasses = 'map-container';
		if (!locationDescriptionStatus) {
			mapContainerClasses += ' location-closed'
		}
		return <section className={ mapContainerClasses }>
			<GoogleMapLoader
				containerElement={ <div { ...this.props.containerElementProps } className='map' /> }
				googleMapElement={
					<GoogleMap
						options={ { ...defaultOptions, ...options } }
						ref={ (map) => console.log(map) }
						defaultZoom={ 5 }
						defaultCenter={ mapCenter }
						onClick={ this._handleMapClick } >
						{ markers.map((marker, index) => {
							return (
								<Marker { ...marker }
								        onClick={ this._handleMarkerClick.bind(null, marker) }
								        onRightclick={ this._handleMarkerRightClick.bind(null, index) } ></Marker>
							);
						}) }
					</GoogleMap>
				}
			/>
			<div className="location-description">
				<div onClick={ this._closeLocationDescription }
				     className="close-button" />
				<h4 className="title" dangerouslySetInnerHTML={ this._getHTML(activeLocation.title) } />
				{ activeLocation.headerImage ? (
					<div className="header-img" style={ {
						backgroundImage: `url(${activeLocation.headerImage})`
					} } />
				) : '' }
				<div className="content">
					<p className="text" dangerouslySetInnerHTML={ this._getHTML(activeLocation.description) } />
					{ activeLocation.contacts ? (
						<div className="contacts">
							{ activeLocation.contacts.phone ? (
								<p className="phone" dangerouslySetInnerHTML={ this._getHTML(activeLocation.contacts.phone) } />
							) : '' }
							{ activeLocation.contacts.phone ? (
								<p className="email" dangerouslySetInnerHTML={ this._getHTML(activeLocation.contacts.email) } />
							) : '' }
							{ activeLocation.contacts.phone ? (
								<p className="address" dangerouslySetInnerHTML={ this._getHTML(activeLocation.contacts.address) } />
							) : '' }
						</div>
					) : '' }
				</div>
			</div>
			<div onClick={ this._closeLocationDescription }
			     className="location-overlay" />
		</section>;
	}
}

