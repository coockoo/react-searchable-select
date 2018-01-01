import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import SearchableSelect from '../src'

class App extends Component {
	constructor () {
		super()
		this.state = {
			value: null
		};
	}
	handleSelectChange (value) {
		this.setState({ value })
	}
	render () {
		return (
			<SearchableSelect
				value={this.state.value}
				options={[
					{ label: 'Europe/Kyiv', value: 'Europe/Kyiv' },
					{ label: 'Europe/Athens', value: 'Europe/Athens' },
				]}
				onChange={(value) => this.handleSelectChange(value)}
			/>
		);
	};
}

export default hot(module)(App)
