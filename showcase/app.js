import React from 'react'
import { hot } from 'react-hot-loader'

import SearchableSelect from '../src'

function App () {
	return (
		<SearchableSelect
			value={'Europe/Kyiv'}
			options={[
				{ label: 'Europe/Kyiv', value: 'Europe/Kyiv' },
				{ label: 'Europe/Athens', value: 'Europe/Athens' },
			]}
		/>
	)
}

export default hot(module)(App)
