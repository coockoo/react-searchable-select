import React, { Component } from 'react';

import s from './styles.less';

class TimezoneSelector extends Component {
	componentDidMount () {
	}
	render () {
		return (
			<div className={s.container}>
				<div className={s.input}>
					<input type="text" />
				</div>
				<ul className={s.options}>
					{this.props.options.map(option => (
						<li key={option.value}>
							{option.label}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default TimezoneSelector
