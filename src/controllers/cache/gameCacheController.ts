import { ReactiveControllerHost } from 'lit';
import { v2 } from '../../data/cache';
import { CacheController } from './cacheController';

export class GameCacheController extends CacheController<v2.Game> {
	constructor(name: string, host: ReactiveControllerHost) {
		super(name, host, v2.Game);
	}
}
