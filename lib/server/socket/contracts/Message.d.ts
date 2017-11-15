export declare type Message<T> = {
    [P in keyof T]: T[P];
};
