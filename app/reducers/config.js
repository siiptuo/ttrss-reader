import { find, groupBy, reject } from 'lodash';
import { GET_CONFIG_SUCCESS } from 'actions/config';
import { LOGOUT } from 'actions/session';


const initialState = {};

export default function config( state = initialState, action ) {
	switch ( action.type ) {
		case GET_CONFIG_SUCCESS:
			return action.req.data.content;

		case LOGOUT:
			return Object.assign({}, initialState );

		default:
			return state;
	}
}
