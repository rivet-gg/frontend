import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import utils from '../../utils/utils';

function unitify(value: number, unit: string) {
	if (value == 1) {
		return `${value} ${unit} ago`;
	} else {
		return `${value} ${unit}s ago`;
	}
}

@customElement('date-display')
export default class DateSummary extends LitElement {
	@property({ type: Number })
	timestamp: number;

	@property({ type: Boolean })
	showSeconds = false;

	@property({ type: Boolean, attribute: 'short' })
	short = false;

	useWeekDay(): boolean {
		// Create the interval if recent enough
		let seconds = Math.floor((Date.now() - this.timestamp) / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		return days < 7;
	}

	getDateString(): string {
		if (isNaN(this.timestamp)) return '<invalid date>';

		// Parse the date
		let date = new Date(this.timestamp);
		let now = new Date();

		// Get components
		let day = date.getDate();
		let monthIndex = date.getMonth();

		// Build date value
		let dateValue: string;
		if (
			date.getDate() == now.getDate() &&
			date.getMonth() == now.getMonth() &&
			date.getFullYear() == now.getFullYear()
		) {
			// Use today
			dateValue = 'Today';
		} else if (this.useWeekDay()) {
			// Use weekday
			dateValue = utils.weekdayNames[date.getDay()];
		} else {
			// Get date ordinal suffix
			let dayMod10 = day % 10;
			let dayMod100 = day % 100;
			let ordinalDay: string;
			if (dayMod10 == 1 && dayMod100 != 11) {
				ordinalDay = day + 'st';
			} else if (dayMod10 == 2 && dayMod100 != 12) {
				ordinalDay = day + 'nd';
			} else if (dayMod10 == 3 && dayMod100 != 13) {
				ordinalDay = day + 'rd';
			} else {
				ordinalDay = day + 'th';
			}

			// Get month
			let monthName = utils.monthNames[monthIndex];

			// Build date value with or without year
			if (now.getFullYear() == date.getFullYear()) {
				dateValue = `${monthName} ${ordinalDay}`;
			} else {
				dateValue = `${monthName} ${ordinalDay}, ${date.getFullYear()}`;
			}
		}

		// Get time value
		let hours = date.getHours();
		let isAM = hours < 12;
		let timeValue: string;
		if (this.showSeconds) {
			timeValue = `${hours > 12 ? hours - 12 : hours || 12}:${('00' + date.getMinutes()).slice(-2)}:${(
				'00' + date.getSeconds()
			).slice(-2)} ${isAM ? 'AM' : 'PM'}`;
		} else {
			timeValue = `${hours > 12 ? hours - 12 : hours || 12}:${('00' + date.getMinutes()).slice(-2)} ${
				isAM ? 'AM' : 'PM'
			}`;
		}

		return this.short ? timeValue : `${dateValue} at ${timeValue}`;
	}

	render() {
		// TODO: Update this every day at midnight (with timeout, not interval)
		return html`${this.getDateString()}`;
	}
}
