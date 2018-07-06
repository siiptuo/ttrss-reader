import { PropTypes } from 'react';
import { filter, sortBy, keyBy } from 'lodash';
import { LOGOUT } from 'actions/session';
import {
	GET_CATEGORIES_REQUEST,
	GET_CATEGORIES_SUCCESS,
	GET_ALL_CATEGORIES_REQUEST,
	GET_ALL_CATEGORIES_SUCCESS
} from 'actions/categories';
import { GET_FEEDS_SUCCESS } from 'actions/feeds';


const initialState = {
	isFetching: true,
	items:      [],
	root:       []
};

export const categoriesShape = {
	isFetching: PropTypes.bool,
	items:      PropTypes.array,
	root:       PropTypes.array
};

export function categories( state = initialState, action ) {
	switch ( action.type ) {
		case GET_CATEGORIES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case GET_CATEGORIES_SUCCESS: {
			const items = action.req.data.content
				.map( c => Object.assign({}, c, { categories: [], feeds: [] }) )
				.sort( ( a, b ) => a.order_id - b.order_id );
			return Object.assign({}, state, {
				isFetching: false,
				items:      Object.assign({}, state.items, keyBy( items, 'id' ) ),
				root:       items.map( c => c.id )
			});
		}

		case GET_FEEDS_SUCCESS: {
			const cats = action.req.data.content
				.filter( item => item.is_cat )
				.map( c => Object.assign({}, c, { categories: [], feeds: [] }) )
				.sort( ( a, b ) => a.order_id - b.order_id );
			const feeds = action.req.data.content
				.filter( item => !item.is_cat )
				.sort( ( a, b ) => a.order_id - b.order_id );

			return Object.assign({}, state, {
				items: Object.assign({}, state.items, keyBy( cats, 'id' ), {
					[ action.category.id ]: Object.assign({}, state.items[ action.category.id ], {
						feeds:      feeds.map( f => f.id ),
						categories: cats.map( c => c.id ),
					})
				})
			});
		}

		case LOGOUT:
			return Object.assign({}, initialState );

		default:
			return state;
	}
}

export function allCategories( state = initialState, action ) {
	let feedCategories;

	switch ( action.type ) {
		case GET_ALL_CATEGORIES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case GET_ALL_CATEGORIES_SUCCESS:
			feedCategories = action.req.data.content;
			feedCategories = filter( feedCategories, ( item ) => -1 < item.id );
			feedCategories = sortBy( feedCategories, 'title' );

			return Object.assign({}, state, {
				isFetching: false,
				items:      feedCategories
			});

		default:
			return state;
	}
}
