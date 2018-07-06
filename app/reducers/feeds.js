import { keyBy } from 'lodash';
import {
	GET_FEEDS_SUCCESS,
	SELECTED_FEED
} from 'actions/feeds';
import { LOGOUT } from 'actions/session';


const initialState = {
	current: null,
	items:   {}
};

export default function feeds( state = initialState, action ) {
	switch ( action.type ) {
		case GET_FEEDS_SUCCESS: {
			const items = action.req.data.content.filter( item => !item.is_cat );
			return Object.assign({}, state, {
				items: Object.assign({}, state.items, keyBy( items, 'id' ) ),
			});
		}

		case SELECTED_FEED:
			return Object.assign({}, state, { current: action.id, });

		case LOGOUT:
			return Object.assign({}, initialState );

		default:
			return state;
	}
}
