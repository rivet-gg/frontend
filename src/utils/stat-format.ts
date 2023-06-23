import * as api from '../utils/api';
import numbro from 'numbro';

const formatting = {
	// richFormatValue(stat: api.identity.GameStat | api.identity.GameExpandedStat): string {
	richFormatValue(stat: api.identity.GameStat | any): string {
		let string = formatting.formatValue(stat.overallValue, stat.config.format);

		// Add prefix and suffix; use singular if
		if (stat.overallValue == 1) {
			if (stat.config.prefixSingular != undefined) {
				string = stat.config.prefixSingular + string;
			}
			if (stat.config.postfixSingular != undefined) {
				string += stat.config.postfixSingular;
			}
		} else {
			if (stat.config.prefixPlural != undefined) {
				string = stat.config.prefixPlural + string;
			}
			if (stat.config.postfixPlural != undefined) {
				string += stat.config.postfixPlural;
			}
		}

		return string;
	},

	formatValue(value: number, formatMethod: api.identity.GameStatFormatMethod): string {
		// Numbers
		if (formatMethod == api.identity.GameStatFormatMethod.INTEGER) return numbro(value).format('0,0');
		else if (formatMethod == api.identity.GameStatFormatMethod.FLOAT_1)
			return numbro(value).format('0,0.0');
		else if (formatMethod == api.identity.GameStatFormatMethod.FLOAT_2)
			return numbro(value).format('0,0.00');
		else if (formatMethod == api.identity.GameStatFormatMethod.FLOAT_3)
			return numbro(value).format('0,0.000');
		// Durations
		else if (formatMethod == api.identity.GameStatFormatMethod.DURATION_MINUTE)
			return formatting.formatDuration(value, false, 0);
		else if (formatMethod == api.identity.GameStatFormatMethod.DURACTION_SECOND)
			return formatting.formatDuration(value, true, 0);
		else if (formatMethod == api.identity.GameStatFormatMethod.DURATION_HUNDREDTH_SECOND)
			return formatting.formatDuration(value, true, 2);

		return '';
	},

	formatDuration(value: number, showSeconds: boolean, precision: number): string {
		// Make time absolute
		let is_negative = value < 0;

		// Break down to components
		let seconds = Math.abs(value);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		// Format date
		let string = '';
		// Negative
		if (is_negative) {
			string += '-';
		}
		// Days
		if (days > 0) {
			string += `${days}d `;
		}
		// Hours
		if (hours > 0) {
			string += `${hours % 24}h `;
		}
		// Minutes (always show if no seconds)
		if (!showSeconds || minutes > 0) {
			string += `${minutes % 60}m`;
		}
		if (showSeconds) {
			// Spacing if showing minutes
			if (minutes > 0) {
				string += ` `;
			}

			// Seconds
			string += `${(seconds % 60).toFixed(precision)}s`;
		}

		return string.trim();
	}
};

export default formatting;
