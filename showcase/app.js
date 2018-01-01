import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import queryTimezones from './query-timezones';

import SearchableSelect from '../src';

class App extends Component {
	constructor () {
		super()
		this.state = {
			value: null,
			options: [],
			availableOptions: [],
			limit: 10,
		};
		this.state.availableOptions = this.state.options.slice(0, this.state.limit)
	}
	componentDidMount () {
		queryTimezones().then((timezones) => {
			const options = timezones.map(tz => Object.assign({ label: tz.name }, tz));
			this.setState({
				options,
				availableOptions: options.slice(0, this.state.limit)
			})
		})
	}
	handleSelectChange (value) {
		this.setState({ value })
	}
	handleSelectSearchChange (search) {
		this.setState({
			availableOptions: this.state.options.filter(o => {
				return o.label.toLowerCase().indexOf(search) >= 0
			}).slice(0, this.state.limit)
		})
	}
	render () {
		return (
			<div>
				{/* Close your eyes for the next line. Too lazy to add separate less file for one style */}
				<div style={{ maxWidth: '300px' }}>
					<SearchableSelect
						value={this.state.value}
						options={this.state.availableOptions}
						onSearchChange={(search) => this.handleSelectSearchChange(search)}
						onChange={(value) => this.handleSelectChange(value)}
					/>
				</div>
				<p>This is my text after the selector. Just random content.</p>
			</div>
		);
	};
}

export default hot(module)(App)
