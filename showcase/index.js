import React from 'react'
import { render } from 'react-dom'
import App from './app'

if (process.env.NODE_ENV !== 'production') {
	const { whyDidYouUpdate } = require('why-did-you-update')
	whyDidYouUpdate(React)
}

render(<App />, document.getElementById('container'))
