import os from 'os';
import { pad } from './pad';

const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})\d{3}.+$/;

let incr = 0;

function reducer(prev: string, curr: string): any {
	return +prev + curr.charCodeAt(0);
}

let fingerprint = (function nodePrint() {
	let padding = 2;
	let pid = pad((process.pid).toString(36), padding);
	let hostname = os.hostname().toUpperCase();
	let { length } = hostname;
	let hostId = pad(hostname.split('').reduce(reducer, +length + 36).toString(36), padding);

	return pid + hostId;
})();

export function generateID(time?: Date) {
	if (!time)
		time = new Date();

	let year = time.getFullYear();
	let month = pad(time.getMonth() + 1);
	let day = pad(time.getDate());
	let hour = pad(time.getHours());
	let min = pad(time.getMinutes());
	let sec = pad(time.getSeconds());
	let millisec = pad(time.getMilliseconds(), 3);
	let counter = pad(incr, 3);

	let id = `${ year }${ month }${ day }${ hour }${ min }${ sec }${ millisec }${ counter }${ fingerprint }`;

	incr++;

	if (incr > 999)
		incr = 0;

	return id;
}

export function parseID(id: string): Date {
	let match = id.match(regex);

	if (match !== null) {
		let [, yyyy, MM, dd, HH, mm, ss, zzz] = match;
		return new Date(`${ yyyy }-${ MM }-${ dd }T${ HH }:${ mm }:${ ss }.${ zzz }Z`);
	}

	throw new Error('Invalid ID');
}
