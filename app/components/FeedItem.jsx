import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectFeed } from 'actions/feeds';
import { hideSidebar } from 'actions/ui';
import { getCount } from 'helpers';
import Icon from 'components/Icon';
import styles from 'css/containers/category-list';


class FeedItem extends React.Component {
	static propTypes = {
		feed:     PropTypes.object.isRequired,
		current:  PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick() {
		const { feed, dispatch } = this.props;

		dispatch( selectFeed( feed.id ) );

		dispatch( hideSidebar() );
	}

	renderCount() {
		const { feed } = this.props;
		let element;

		if ( 0 < feed.unread ) {
			element = (
				<span className={ styles.count }>{ getCount( feed.unread ) }</span>
			);
		}

		return element;
	}

	render() {
		const { feed, current } = this.props;
		const clsLink = current ? styles.current : '';

		return (
			<li>
				<a onClick={ this.handleClick } className={ clsLink }>
					<span className={styles.icon}>
						{feed.has_icon ?
							<img src={this.props.iconBaseUrl + feed.id + '.ico'} style={{height: '16px'}} /> :
							<Icon type="rss-squared" />}
					</span>
					<span className={ styles.name }>{ feed.title }</span>
					{ this.renderCount() }
				</a>
			</li>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		feed:        state.feeds.items[ ownProps.feed ],
		current:     ownProps.feed === state.feeds.current,
		iconBaseUrl: localStorage.getItem('ttrssBaseUrl') + '/' + state.config.icons_url + '/'
	};
}

export default connect( mapStateToProps )( FeedItem );
