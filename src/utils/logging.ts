const logging = {
	debug(...data: any[]) {
		console.debug(...data);
	},

	data(title: string, ...data: any[]) {
		console.log(`%c${title}`, 'font-weight: bold; color: #39cec5;', ...data);
	},

	event(title: string, ...data: any[]) {
		console.log(`%c${title}`, 'font-weight: bold; color: #e64670;', ...data);
	},

	net(context: string, ...data: any[]) {
		console.log(`%c${context}`, 'font-weight: bold; color: #737373;', ...data);
	},

	warn(title: string, ...data: any[]) {
		console.warn(`%c${title}`, 'font-weight: bold; color: dark-orange;', ...data);
	},

	errorCb: null as ((title: string, ...data: any[]) => void) | null,
	error(title: string, ...data: any[]) {
		console.error(`%c${title}`, 'font-weight: bold;', ...data);
		this.errorCb(title, data);
	}
};

export default logging;
