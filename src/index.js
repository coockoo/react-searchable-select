import React, { Component } from 'react';
import cn from 'classnames';

import s from './styles.less';

class SearchableSelect extends Component {
	constructor () {
		super();
		this.state = {
			search: '',
			isEditing: false,
		};
	}
	handleSearchChange (e) {
		const newSearch = e.target.value;
		this.setState({ search: newSearch });
		this.props.onSearchChange(newSearch);
	}
	handleOptionClick (option) {
		this.props.onChange(option.value);
		this.setState({
			search: option.value,
			isEditing: false,
		});
	}
	handleValueClick () {
		this.setState({
			search: this.props.value || '',
			isEditing: true,
		}, () => {
			this.searchInput.focus();
		});
	}
	render () {
		return (
			<div className={s.container}>
				<div
					className={cn(s.value, { [s.hidden]: this.state.isEditing })}
					onClick={() => this.handleValueClick()}
				>
					<span>{this.props.value}</span>
				</div>
				<div className={s.input}>
					<input
						ref={(input) => { this.searchInput = input; }}
						type="text"
						value={this.state.search}
						onChange={(e) => this.handleSearchChange(e)}
						className={cn({ [s.hidden]: !this.state.isEditing })}
					/>
				</div>
				<ul className={s.options}>
					{this.props.options.map(option => (
						<li
							key={option.value}
							onClick={() => this.handleOptionClick(option)}
						>
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
