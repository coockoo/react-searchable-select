import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
	componentDidMount () {
		document.addEventListener('click', (e) => this.handleDocumentClick(e), false)
		document.addEventListener('touchend', (e) => this.handleDocumentClick(e), false)
	}
	componentWillUnmount () {
		document.removeEventListener('click', (e) => this.handleDocumentClick(e), false)
		document.removeEventListener('touchend', (e) => this.handleDocumentClick(e), false)
	}
	handleDocumentClick (event) {
		if (this.state.isEditing &&!ReactDOM.findDOMNode(this).contains(event.target)) {
			this.setState({
				isEditing: false,
				search: '',
			})
			this.props.onSearchChange('')
		}
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
		this.props.onSearchChange('')
	}
	handleClearClick () {
		this.setState({
			search: '',
			isEditing: true,
		}, () => {
			this.searchInput.focus();
		})
		this.props.onSearchChange('')
		this.props.onChange(null)
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
					<span
						className={s.times}
						title={'Clear'}
						onClick={() => this.handleClearClick()}
					>
						x
					</span>
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
