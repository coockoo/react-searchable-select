import React from 'react'
import { hot } from 'react-hot-loader'

import TimezoneSelector from '../src'

function App () {
	return (
		<TimezoneSelector
			options={[
				{ label: 'Europe/Kyiv', value: 'Europe/Kyiv' },
				{ label: 'Europe/Athens', value: 'Europe/Athens' },
			]}
		/>
	)
}

export default hot(module)(App)
