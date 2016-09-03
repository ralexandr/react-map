import React from 'react';
import { render } from 'react-dom';
import Map from './index';

// const locations = [
// 	{ // Санкт-Петербург
// 		geoLocation: { // 59.941326, 30.222559
// 			lat: 59.941326,
// 			lng: 30.222559
// 		},
// 		icon: 'img/map-location-default-logo.png',
// 		title: `Центральное представительство ТД Криолагуна\nКлиника “БалтМед”`,
// 		//headerImage: `https://stv.maps.yandex.net/images/?v=3.18.0&oid=1254896211_626448895_23_1372335404&x=7&y=1&z=2&origin=maps-preview`,
// 		contacts: {
// 			phone: '+7 (812) 449-27-78',
// 			address: 'г. Санкт-Петербург, ул. Нахимова, 11'
// 		}
// 	}, { // Смоленск
// 		geoLocation: {
// 			lat: 54.775065,
// 			lng: 32.045928
// 		},
// 		title: `ТД "Криолагуна"`,
// 		icon: 'img/map-location-default-logo.png',
// 		contacts: {
// 			phone: '+7 (910) 116-33-38',
// 			address: 'г. Смоленск, проспект Гагарина, 10/2'
// 		}
// 	}, { // Москва 55.746814, 37.589703
// 		headerImage: 'img/locations/moskva.png',
// 		title: `ФГБУ «Поликлиника № 1» Управления делами Президента Российской Федерации`,
// 		icon: 'img/map-location-default-logo.png',
// 		geoLocation: {
// 			lat: 55.746814,
// 			lng: 37.589703
// 		},
// 		contacts: {
// 			phone: '+7 (495) 620-81-01',
// 			address: 'г. Москва, Сивцев Вражек переулок, 35'
// 		}
// 	}, { // Казань 55.829569, 49.056238
// 		title: `Официальный дистрибьютор ТД "Криолагуна".\n“Нур” Криогенная техника`,
// 		icon: 'img/map-location-default-logo.png',
// 		geoLocation: {
// 			lat: 55.829569,
// 			lng: 49.056238
// 		},
// 		center: true,
// 		contacts: {
// 			phone: '+7 (917) 266-12-51',
// 			address: ''
// 		}
// 	}, { // Чебоксары 56.137341, 47.168235
// 		title: 'Санаторий “Чувашиякурорт”',
// 		icon: 'img/map-location-default-logo.png',
// 		geoLocation: {
// 			lat: 56.137341,
// 			lng: 47.168235
// 		},
// 		contacts: {
// 			phone: '+7 (8352) 41-66-32',
// 			address: 'г. Чебоксары, ул. Мичмана Павлова, 29'
// 		}
// 	}, { // Йошкар-Ола 56.019303, 47.287284
// 		title: 'Физкультурно-оздоровительный комплекс “Политехник”',
// 		icon: 'img/map-location-default-logo.png',
// 		geoLocation: {
// 			lat: 56.019303,
// 			lng: 47.287284
// 		},
// 		contacts: {
// 			phone: '+7 (8362) 39-02-23',
// 			address: 'г. Йошкар-Ола, ул. Карла Маркса, 109'
// 		}
// 	}, { // Липецк 52.614478, 39.605673
// 		headerImage: 'img/locations/lipeck.png',
// 		title: `салон тайского массажа СИАМ`,
// 		icon: `img/map-location-default-logo.png`,
// 		geoLocation: {
// 			lat: 52.614478,
// 			lng: 39.605673
// 		},
// 		contacts: {
// 			phone: '+7 (474) 228-03-01',
// 			address: 'г. Липецк, ул. Интернациональная, 41'
// 		}
//
// 	}
// ];
const state = (document.getElementById('map-state')) ? JSON.parse(document.getElementById('map-state').innerHTML) : {};
if (typeof document !== 'undefined') {
	render(<Map { ...state } />, document.getElementById('map'));
}