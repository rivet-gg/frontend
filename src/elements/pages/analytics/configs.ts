import { ChartOptions } from 'chart.js/auto';
import utils from '../../../utils/utils';

export const LINE_CHART_OPTIONS: ChartOptions<'line'> = {
	parsing: false,
	responsive: true,
	maintainAspectRatio: false,
	resizeDelay: 100,
	interaction: {
		intersect: false,
		mode: 'index'
	},
	indexAxis: 'x',
	layout: {
		padding: {
			left: 10,
			right: 15,
			top: 3,
			bottom: 3
		}
	},
	elements: {
		line: {
			cubicInterpolationMode: 'monotone',
			borderWidth: 2,
			fill: true
		},
		point: {
			radius: 0,
			hoverRadius: 4
		}
	},
	scales: {
		x: {
			type: 'time',
			ticks: {
				source: 'data',
				maxTicksLimit: 10,
				color: '#ecececec'
			},
			time: {
				displayFormats: {
					millisecond: 'MMMM Do',
					hour: 'M/D hA'
				}
			},
			grid: {
				color: '#ffffff09'
			}
		},
		y: {
			beginAtZero: true,
			ticks: { color: '#ecececec' },
			grid: {
				color: '#ffffff09'
			}
		}
	},
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				usePointStyle: true,
				boxWidth: 6,
				boxHeight: 6,
				font: {
					family: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					weight: 'bold'
				},
				color: '#ececec'
			}
		},
		decimation: { enabled: true, algorithm: 'lttb' }
	}
};
export const DURATION_LINE_CHART_OPTIONS: ChartOptions<'line'> = {
	parsing: false,
	responsive: true,
	maintainAspectRatio: false,
	resizeDelay: 100,
	interaction: {
		intersect: false,
		mode: 'index'
	},
	indexAxis: 'x',
	layout: {
		padding: {
			left: 10,
			right: 15,
			top: 3,
			bottom: 3
		}
	},
	elements: {
		line: {
			cubicInterpolationMode: 'monotone',
			borderWidth: 2,
			fill: true
		},
		point: {
			radius: 0,
			hoverRadius: 4
		}
	},
	scales: {
		x: {
			type: 'time',
			ticks: {
				source: 'data',
				maxTicksLimit: 10,
				color: '#ecececec'
			},
			time: {
				displayFormats: {
					millisecond: 'MMMM Do',
					hour: 'M/D hA'
				}
			},
			grid: {
				color: '#ffffff09'
			}
		},
		y: {
			ticks: {
				callback: y => {
					return utils.formatDuration(y as number, { shorten: true, show0Min: true });
				},
				color: '#ecececec'
			},
			grid: {
				color: '#ffffff09'
			}
		}
	},
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				usePointStyle: true,
				boxWidth: 6,
				boxHeight: 6,
				font: {
					family: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					weight: 'bold'
				},
				color: '#ececec'
			}
		},
		decimation: { enabled: true, algorithm: 'lttb' },
		tooltip: {
			callbacks: {
				label: context => {
					return utils.formatDuration(context.parsed.y, {
						showSeconds: true,
						showMilliseconds: true,
						shorten: true
					});
				}
			}
		}
	}
};
export const BAR_CHART_OPTIONS: ChartOptions<'bar'> = {
	parsing: false,
	responsive: true,
	maintainAspectRatio: false,
	resizeDelay: 100,
	interaction: {
		intersect: false,
		mode: 'index'
	},
	indexAxis: 'x',
	layout: {
		padding: {
			left: 10,
			right: 15,
			top: 3,
			bottom: 3
		}
	},
	elements: {
		line: {
			cubicInterpolationMode: 'monotone',
			borderWidth: 2
		},
		point: {
			radius: 0,
			hoverRadius: 4
		}
	},
	scales: {
		x: {
			type: 'time',
			stacked: true,
			ticks: {
				source: 'data',
				maxTicksLimit: 10,
				color: '#ecececec'
			},
			time: {
				displayFormats: {
					millisecond: 'MMMM Do',
					hour: 'M/D hA'
				}
			},
			grid: {
				color: '#ffffff09'
			}
		},
		y: {
			stacked: true,
			ticks: { color: '#ecececec' },
			grid: {
				color: '#ffffff09'
			}
		}
	},
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				usePointStyle: true,
				boxWidth: 6,
				boxHeight: 6,
				font: {
					family: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					weight: 'bold'
				},
				color: '#ececec'
			}
		},
		decimation: { enabled: true, algorithm: 'lttb' }
	}
};
