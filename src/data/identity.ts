export function padAccountNumber(n: number | string): string {
	return ('0000' + n).slice(-4);
}
