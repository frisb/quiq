import { IGateway, ISession } from '../contracts';
import { AbstractConnection } from './connection';

export abstract class AbstractGateway<TSession extends ISession>
extends AbstractConnection<TSession>
implements IGateway {}
