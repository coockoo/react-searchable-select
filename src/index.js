import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import chevronDownSrc from './chevron-down.svg';
import s from './styles.less';

class SearchableSelect extends Component {
	constructor () {
		super();
		this.state = {
			search: '',
			isEditing: false,
			selectedIndex: -1,
		};
	}
	componentDidMount () {
		document.addEventListener('click', (e) => this.handleDocumentClick(e), false)
		document.addEventListener('touchend', (e) => this.handleDocumentClick(e), false)
		document.addEventListener('keydown', (e) => this.handleKeydown(e), false)
	}
	componentWillUnmount () {
		document.removeEventListener('click', (e) => this.handleDocumentClick(e), false)
		document.removeEventListener('touchend', (e) => this.handleDocumentClick(e), false)
		document.removeEventListener('keydown', (e) => this.handleKeydown(e), false)
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
	handleKeydown (e) {
		if (this.state.isEditing) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
				e.preventDefault()
			}
			if (e.key === 'ArrowDown') {
				this.setState({
					selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.options.length - 1)
				})
			} else if (e.key === 'ArrowUp') {
				this.setState({
					selectedIndex: Math.max(this.state.selectedIndex - 1, 0)
				})
			} else if (e.key === 'Enter') {
				if (this.state.selectedIndex >= 0 && this.state.selectedIndex < this.props.options.length) {
					this.props.onChange(this.props.options[this.state.selectedIndex])
					this.setState({ selectedIndex: -1, isEditing: false, search: '' })
				}
			}
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
		this.props.onSearchChange(option.label)
	}
	handleValueClick () {
		this.setState({
			search: '',
			isEditing: true,
			selectedIndex: -1,
		}, () => {
			this.searchInput.focus();
		});
		this.props.onSearchChange('')
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
					<div className={s.chevron}>
						<img src={chevronDownSrc} />
					</div>
				</div>
				<ul className={cn(s.options, { [s.hidden]: !this.state.isEditing })}>
					{this.props.options.map((option, index) => (
						<li
							key={`${option.value}-${index}`}
							onClick={() => this.handleOptionClick(option)}
							title={option.label}
							className={cn({ [s.selected]: this.state.selectedIndex === index })}
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
