import { polyfill } from 'es6-promise';
import axios from 'axios';
import { clearArticles } from 'actions/articles';


polyfill();

export const GET_FEEDS = 'GET_FEEDS';
export const GET_FEEDS_REQUEST = 'GET_FEEDS_REQUEST';
export const GET_FEEDS_SUCCESS = 'GET_FEEDS_SUCCESS';
export const GET_FEEDS_FAILURE = 'GET_FEEDS_FAILURE';
export const SELECTED_FEED = 'SELECTED_FEED';


export function fetchFeeds( cat ) {
	return ( dispatch, getState ) => {
		const { session, settings, categories } = getState();
		let category;

		if ( 'number' === typeof cat ) {
			category = categories.items[ cat ];
		} else {
			category = cat;
		}

		const promise = axios.post( session.url, {
			op:             'getFeeds',
			sid:            session.sid,
			cat_id:         category.id,
			unread_only:    0 < settings.unreadOnly,
			include_nested: true
		});

		dispatch({
			type: GET_FEEDS,
			promise,
			category
		});

		// Fetch subcategories in the background.
		promise.then( response => {
			response.data.content.forEach( item => {
				if ( item.is_cat ) {
					dispatch( fetchFeeds( item.id ) );
				}
			});
		});
	};
}

export function selectFeed( id ) {
	return ( dispatch ) => {
		dispatch({
			type: SELECTED_FEED,
			id
		});

		dispatch( clearArticles( id ) );
	};
}

