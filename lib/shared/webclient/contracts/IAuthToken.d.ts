import { IWrappedToken } from './IWrappedToken';
export interface IAuthToken {
    access: string;
    expires: Date;
    isValid: boolean;
    refresh: (wrappedToken: IWrappedToken) => void;
}
