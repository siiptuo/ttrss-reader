import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectArticle } from 'actions/articles';
import Icon from 'components/Icon';
import elementStyles from 'css/common/elements';
import headerStyles from 'css/containers/header';


class HeaderTitle extends Component {
	static propTypes = {
		feed:     PropTypes.object,
		dispatch: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick() {
		this.props.dispatch( selectArticle( '' ) );
	}

	renderAppTitle() {
		return (
			<span className={ headerStyles.title }><Icon type="rss" />Tiny Tiny RSS Reader</span>
		);
	}

	renderFeedTitle() {
		const { feed } = this.props;
		const title = feed.is_cat ? feed.cat_title : feed.title;

		return (
			<a onClick={ this.handleClick } className={ headerStyles.title }>
				<Icon type="rss" />{ title }
			</a>
		);
	}

	render() {
		const title = this.props.feed ? this.renderFeedTitle() : this.renderAppTitle();

		return (
			<h2 className={ elementStyles.textTruncate }>{ title }</h2>
		);
	}
}

function mapStateToProps( state ) {
	return {
		feed: state.feeds.current && state.feeds.items[ state.feeds.current ]
	};
}

export default connect( mapStateToProps )( HeaderTitle );
