export type Message<T> = {
	[P in keyof T]: T[P];
}
