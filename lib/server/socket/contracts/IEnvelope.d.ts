import { Message } from './Message';
export interface IEnvelope<T> {
    [envelopeType: string]: Message<T>;
}
