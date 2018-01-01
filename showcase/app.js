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
			<div>
				{/* Close your eyes for the next line. Too lazy to add separate less file for one style */}
				<div style={{ maxWidth: '300px' }}>
					<SearchableSelect
						value={this.state.value}
						options={[
							{ label: 'The best city in Europe', value: 'Europe/Kyiv' },
							{ label: 'Olymp', value: 'Europe/Athens' },
							{ label: 'Just a random option to check long strings in labels in case we got ones', value: 'Europe/Andorra' },
						]}
						onChange={(value) => this.handleSelectChange(value)}
					/>
				</div>
				<p>This is my text after the selector. Just random content.</p>
			</div>
		);
	};
}

export default hot(module)(App)
