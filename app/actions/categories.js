import { polyfill } from 'es6-promise';
import axios from 'axios';

// import { fetchFeeds } from './feeds';


polyfill();

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_REQUEST = 'GET_ALL_CATEGORIES_REQUEST';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAILURE = 'GET_ALL_CATEGORIES_FAILURE';


export function getCategories() {
	return ( dispatch, getState ) => {
		const { session, settings } = getState();

		const promise = axios.post( session.url, {
			op:            'getCategories',
			sid:           session.sid,
			unread_only:   0 < settings.unreadOnly,
			enable_nested: true
		});

		dispatch({
			type: GET_CATEGORIES,
			promise,
		});

		// Fetch subcategories in the background.
		// promise.then( response => {
		// 	response.data.content.forEach( item => {
		// 		dispatch( fetchFeeds( item.id ) );
		// 	});
		// });
	};
}

export function getAllCategories() {
	return ( dispatch, getState ) => {
		const { url, sid } = getState().session;

		dispatch({
			type:    GET_ALL_CATEGORIES,
			promise: axios.post( url, {
				op:            'getCategories',
				include_empty: true,
				sid
			})
		});
	};
}
