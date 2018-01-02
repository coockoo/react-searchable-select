import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import queryTimezones from './query-timezones';
import moment from 'moment-timezone';

import SearchableSelect from '../src';

import s from './styles.less';

class App extends Component {
	constructor () {
		super()
		const currentTimezone = moment.tz.guess()
		this.state = {
			value: { label: currentTimezone, value: currentTimezone },
			options: [],
			availableOptions: [],
			limit: 10,
			currentMoment: moment(),
			search: '',
		};
		this.state.availableOptions = this.state.options.slice(0, this.state.limit)
	}
	componentDidMount () {
		queryTimezones().then((timezones) => {
			const options = timezones.map(tz => Object.assign({ label: tz.name }, tz));
			const currentTimezone = moment.tz.guess()
			const value = options.filter(o => o.value === currentTimezone)[0]
			this.setState({
				value,
				options,
				availableOptions: options.slice(0, this.state.limit)
			})
			this.interval = setInterval(() => {
				this.setState({ currentMoment: moment() })
			}, 1000)
		})
	}
	componentWillUnmount () {
		this.interval && clearInterval(this.interval)
		this.interval = null
	}
	handleSelectChange (value) {
		this.setState({ value })
	}
	handleSelectSearchChange (search) {
		this.setState({
			search,
			availableOptions: this.state.options.filter(o => {
				return o.label.toLowerCase().indexOf(search.toLowerCase()) >= 0
			}).slice(0, this.state.limit)
		})
	}
	render () {
		return (
			<div className={s.container}>
				<div>
					<h3>Timezone:</h3>
					<SearchableSelect
						value={this.state.value}
						options={this.state.search ? this.state.availableOptions : this.state.options}
						onSearchChange={(search) => this.handleSelectSearchChange(search)}
						onChange={(value) => this.handleSelectChange(value)}
					/>
					{this.state.value && this.state.value.value ? (
						<div>
							<h3>Current time in selected timezone is:</h3>
							<p>{this.state.currentMoment.tz(this.state.value.value).format('YYYY-MM-DD HH:mm:ss')}</p>
						</div>
					) : null}
				</div>
			</div>
		);
	};
}

export default hot(module)(App)
