import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FeedItem from 'components/FeedItem';
import CategoryList from 'containers/CategoryList';
import Icon from 'components/Icon';
import { getCount } from 'helpers';
import styles from 'css/containers/category-list';
import { fetchFeeds } from 'actions/feeds';


class CategoryItem extends Component {
	static propTypes = {
		category:   PropTypes.object.isRequired,
		categories: PropTypes.arrayOf( PropTypes.object ).isRequired,
		feeds:      PropTypes.arrayOf( PropTypes.object ).isRequired,
		dispatch:   PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );
		this.state = { isOpen: false };
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick() {
		this.setState({ isOpen: ! this.state.isOpen });
		this.props.dispatch( fetchFeeds( this.props.category ) );
	}

	renderCount() {
		const { category } = this.props;
		let count;

		if ( 0 < category.unread ) {
			count = (
				<span className={ styles.count }>{ getCount( category.unread ) }</span>
			);
		}

		return count;
	}

	render() {
		const { isOpen } = this.state;
		const { category } = this.props;
		const clsItem = isOpen ? 'isOpen' : '';
		let iconType;

		if ( 0 < category.unread && ! isOpen ) {
			iconType = 'folder';
		} else if ( 0 < category.unread && isOpen ) {
			iconType = 'folder-open';
		} else if ( 0 === category.unread && ! isOpen ) {
			iconType = 'folder-empty';
		} else if ( 0 === category.unread && isOpen ) {
			iconType = 'folder-open-empty';
		}

		return (
			<li className={ clsItem } key={ category.id }>
				<a onClick={ this.handleClick }>
					<span className={ styles.icon }>
						<Icon type={ iconType } />
					</span>
					<span className={ styles.name }>{ category.title }</span>
					{ this.renderCount() }
				</a>
				{ isOpen && (
					<ul>
						{ category.categories.map( c => <ConnectedCategoryItem key={ `f${c}` } category={ c } /> ) }
						{ category.feeds.map( f => <FeedItem key={ `f${f}` } feed={ f } /> ) }
					</ul>
				) }
			</li>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		category: state.categories.items[ ownProps.category ]
	};
}

const ConnectedCategoryItem = connect( mapStateToProps )( CategoryItem );

export default ConnectedCategoryItem;
