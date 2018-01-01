import React, { Component } from 'react';

import s from './styles.less';

class SearchableSelect extends Component {
	constructor () {
		super();
		this.state = {
			search: ''
		};
	}
	componentDidMount () {
	}
	onSearchChange (e) {
		const newSearch = e.target.value
		this.setState({ search: newSearch })
		this.props.onSearchChange(newSearch)
	}
	render () {
		return (
			<div className={s.container}>
				<div className={s.input}>
					<input
						type="text"
						value={this.state.search}
						onChange={(e) => this.onSearchChange(e)}
					/>
				</div>
				<ul className={s.options}>
					{this.props.options.map(option => (
						<li key={option.value}>
							{option.label}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

SearchableSelect.defaultProps = {
	onSearchChange: () => {}
}

export default SearchableSelect
