export interface ISigningOptions {
    secret: string;
    algorithm: string;
    expirySeconds?: number;
}
