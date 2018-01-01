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
		this.props.onChange(option);
		this.setState({
			search: option.label,
			isEditing: false,
		});
	}
	handleValueClick () {
		const search = this.props.value && this.props.value.label
		this.setState({
			search: search || '',
			isEditing: true,
		}, () => {
			this.searchInput.focus();
		});
	}
	render () {
		return (
			<div className={s.container}>
				<div className={s.input}>
					<div
						className={cn(s.value, { [s.hidden]: this.state.isEditing })}
						onClick={() => this.handleValueClick()}
					>
						<span>{this.props.value && this.props.value.label}</span>
					</div>
					<input
						ref={(input) => { this.searchInput = input; }}
						type="text"
						value={this.state.search}
						onChange={(e) => this.handleSearchChange(e)}
						className={cn({ [s.hidden]: !this.state.isEditing })}
					/>
				</div>
				<ul className={cn(s.options, { [s.hidden]: !this.state.isEditing })}>
					{this.props.options.map(option => (
						<li
							key={option.value}
							onClick={() => this.handleOptionClick(option)}
							title={option.label}
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
