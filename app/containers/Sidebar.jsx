import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CategoryList from 'containers/CategoryList';
import SidebarActions from 'components/SidebarActions';

import { getCategories } from 'actions/categories';
import { getConfig } from 'actions/config';

import styles from 'css/containers/sidebar';
const cx = classNames.bind( styles );

class Sidebar extends Component {
	static propTypes = {
		isVisible: PropTypes.bool.isRequired,
		rootCategories: PropTypes.arrayOf( PropTypes.number ).isRequired,
		dispatch:   PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.dispatch( getCategories() );
		this.props.dispatch( getConfig() );
	}

	render() {
		const { isVisible, rootCategories } = this.props;
		const sidebarClass = cx({
			sidebar:      true,
			'is-visible': isVisible
		});

		return (
			<div className={ sidebarClass }>
				<SidebarActions />
				<div className={ styles.inside }>
					<CategoryList categories={rootCategories} />
				</div>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		isVisible: state.ui.isSidebarVisible,
		rootCategories: state.categories.root
	};
}

export default connect( mapStateToProps )( Sidebar );
