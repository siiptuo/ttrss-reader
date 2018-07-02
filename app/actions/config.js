import { polyfill } from 'es6-promise';
import axios from 'axios';


polyfill();

export const GET_CONFIG = 'GET_CONFIG';
export const GET_CONFIG_REQUEST = 'GET_CONFIG_REQUEST';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';
export const GET_CONFIG_FAILURE = 'GET_CONFIG_FAILURE';


export function getConfig( ) {
	return ( dispatch, getState ) => {
		const { session } = getState();

		dispatch({
			type:    GET_CONFIG,
			promise: axios.post( session.url, {
				op:  'getConfig',
				sid: session.sid
			})
		});
	};
}
