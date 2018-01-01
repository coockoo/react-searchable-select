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
					{ label: 'The best city in Europe', value: 'Europe/Kyiv' },
					{ label: 'Olymp', value: 'Europe/Athens' },
				]}
				onChange={(value) => this.handleSelectChange(value)}
			/>
		);
	};
}

export default hot(module)(App)
