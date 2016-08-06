'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGoogleMaps = require('react-google-maps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_Component) {
	_inherits(Map, _Component);

	function Map(props, context) {
		_classCallCheck(this, Map);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props, context));

		_this.state = {
			activeLocation: {}
		};
		return _this;
	}

	_createClass(Map, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: '_handleWindowResize',
		value: function _handleWindowResize() {}
	}, {
		key: '_handleMapClick',
		value: function _handleMapClick() {}
	}, {
		key: '_handleMarkerClick',
		value: function _handleMarkerClick(marker) {
			this.setState({
				activeLocation: this.props.locations[marker.key]
			});
		}
	}, {
		key: '_handleMarkerRightclick',
		value: function _handleMarkerRightclick() {
			console.log('handleMarkerRightclick', arguments);
		}
	}, {
		key: '_closeLocationDescription',
		value: function _closeLocationDescription() {
			this.setState({
				activeLocation: undefined
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props$locations = this.props.locations;
			var locations = _props$locations === undefined ? [] : _props$locations;
			var activeLocation = this.state.activeLocation;

			var mapCenter = {};
			var options = {
				disableDefaultUI: true
			};
			var markers = locations.map(function (loc, locationIndex) {
				if (loc.geo_location.indexOf(',') > -1) {
					var coords = loc.geo_location.split(',');
					return {
						position: {
							lat: parseFloat(coords[0]) || 0,
							lng: parseFloat(coords[1]) || 0
						},
						key: locationIndex,
						defaultAnimation: 2
					};
				} else {
					return false;
				}
			}).filter(function (l) {
				return l;
			});
			return _react2.default.createElement(_reactGoogleMaps.GoogleMapLoader, {
				containerElement: _react2.default.createElement('div', _extends({}, this.props, { className: 'map' })),
				googleMapElement: _react2.default.createElement(
					_reactGoogleMaps.GoogleMap,
					{
						options: options,
						ref: function ref(map) {
							return console.log(map);
						},
						defaultZoom: 15,
						defaultCenter: mapCenter,
						onClick: this._handleMapClick },
					markers.map(function (marker, index) {
						return _react2.default.createElement(_reactGoogleMaps.Marker, _extends({}, marker, {
							onClick: _this2._handleMarkerClick.bind(_this2, marker),
							onRightclick: _this2._handleMarkerRightclick.bind(_this2, index) }));
					})
				)
			});
		}
	}]);

	return Map;
}(_react.Component);

exports.default = Map;