declare module 'ipaddr.js' {
	interface IPv4 {
		toString(): string;
	}
	
	export function process(ip: string): IPv4;
}
